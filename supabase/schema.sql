-- ============================================
-- 미션놀이터 DB 스키마 (그룹 기반 신규 모델)
-- Supabase SQL Editor → New query 에 붙여넣고 Run
-- 빈 프로젝트 기준. 기존 데이터가 있는 프로젝트에는 그대로 실행하지 말 것.
-- ============================================


-- ============================================
-- 1. 사용자 프로필 (auth.users 1:1)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  profile_img TEXT,
  border_color TEXT DEFAULT '#00da62',
  coins INTEGER DEFAULT 0,
  group_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google 로그인 시 profiles row 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '사용자')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================
-- 2. 그룹
-- ============================================
CREATE TABLE groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- profiles.group_id의 FK 연결 (groups 생성 후)
ALTER TABLE profiles
  ADD CONSTRAINT profiles_group_id_fkey
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL;


-- ============================================
-- 3. 그룹 멤버십 (M:N)
-- ============================================
CREATE TABLE group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE INDEX idx_group_members_user ON group_members(user_id);
CREATE INDEX idx_group_members_group ON group_members(group_id);


-- ============================================
-- 4. 초대코드
-- ============================================
CREATE TABLE invite_codes (
  code TEXT PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  used_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 5. 미션 (그룹에 공개되는 "미션 템플릿". 참여/상태는 mission_participants 로 분리)
-- ============================================
CREATE TABLE missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  proposer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  reward INTEGER DEFAULT 1 CHECK (reward >= 0 AND reward <= 99),
  frequency TEXT NOT NULL DEFAULT '1회'
    CHECK (frequency IN ('1회', '매일', '매주', '매월')),
  due_date DATE,
  icon_src TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_missions_proposer ON missions(proposer_id);
CREATE INDEX idx_missions_group ON missions(group_id);


-- ============================================
-- 5-1. 미션 참여 (1 미션 : N 참여자. 반복 미션은 일자별 row)
--   * instance_date: 반복 미션은 해당 일자(DATE), 1회성 미션은 NULL
--   * status: 참여자 개인의 수행 상태 (미션 전체 상태 아님)
-- ============================================
CREATE TABLE mission_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  instance_date DATE,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'completed', 'gave_up')),
  note TEXT,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (mission_id, user_id, instance_date)
);

-- Postgres UNIQUE 제약은 NULL을 서로 다른 값으로 취급하므로
-- 1회성 미션(instance_date=NULL)의 중복 방지를 위한 부분 인덱스
CREATE UNIQUE INDEX idx_mp_unique_onetime
  ON mission_participants (mission_id, user_id)
  WHERE instance_date IS NULL;

CREATE INDEX idx_mp_mission_date ON mission_participants (mission_id, instance_date);
CREATE INDEX idx_mp_user ON mission_participants (user_id);


-- ============================================
-- 6. 교환상점 상품
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  coin_price INTEGER NOT NULL CHECK (coin_price >= 0 AND coin_price <= 99),
  icon_src TEXT,
  status TEXT NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'soldout', 'shipping', 'delivered')),
  delivery_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_group ON products(group_id);


-- ============================================
-- updated_at 자동 갱신 트리거
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER missions_updated_at
  BEFORE UPDATE ON missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER mission_participants_updated_at
  BEFORE UPDATE ON mission_participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================
-- RLS 보조 함수: 사용자가 특정 그룹의 멤버인지 확인
-- (group_members 정책에서 자기 자신을 참조하면 무한재귀가 발생하므로
--  SECURITY DEFINER로 RLS를 우회해서 안전하게 조회)
-- ============================================
CREATE OR REPLACE FUNCTION public.is_group_member(target_group_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.group_members
    WHERE user_id = auth.uid()
      AND group_id = target_group_id
  );
$$;


-- ============================================
-- Row Level Security (RLS) 정책
-- ============================================

-- profiles: 인증된 모든 사용자가 조회 가능 (랭킹 표시 등), 본인만 수정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- groups: 멤버만 조회. 인증된 사용자는 새 그룹 생성 가능 (created_by = self)
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their groups"
  ON groups FOR SELECT
  TO authenticated
  USING (public.is_group_member(id));

CREATE POLICY "Authenticated can create groups"
  ON groups FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Creator can update group"
  ON groups FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

-- group_members: 같은 그룹 멤버끼리만 보임. 본인 가입은 직접 INSERT 가능
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view group memberships"
  ON group_members FOR SELECT
  TO authenticated
  USING (public.is_group_member(group_id));

CREATE POLICY "Users can join a group"
  ON group_members FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave a group"
  ON group_members FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- invite_codes: 미사용 코드는 인증된 누구나 조회(검증 목적), 본인 생성 코드도 조회
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View unused or own invite codes"
  ON invite_codes FOR SELECT
  TO authenticated
  USING (used_by IS NULL OR creator_id = auth.uid());

CREATE POLICY "Authenticated can create invite codes"
  ON invite_codes FOR INSERT
  TO authenticated
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Anyone authenticated can use unused code"
  ON invite_codes FOR UPDATE
  TO authenticated
  USING (used_by IS NULL);

-- missions: 같은 그룹 멤버 또는 직접 관여한 사용자(제안자/수락자)만 접근
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View missions in own group"
  ON missions FOR SELECT
  TO authenticated
  USING (
    proposer_id = auth.uid()
    OR (group_id IS NOT NULL AND public.is_group_member(group_id))
  );

CREATE POLICY "Create own missions"
  ON missions FOR INSERT
  TO authenticated
  WITH CHECK (proposer_id = auth.uid());

CREATE POLICY "Update own missions"
  ON missions FOR UPDATE
  TO authenticated
  USING (proposer_id = auth.uid());

CREATE POLICY "Delete own missions"
  ON missions FOR DELETE
  TO authenticated
  USING (proposer_id = auth.uid());

-- mission_participants: 같은 그룹 미션의 참여자끼리 서로 조회 가능.
-- 본인 row만 생성/수정/삭제 가능.
ALTER TABLE mission_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View participants in accessible missions"
  ON mission_participants FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR mission_id IN (
      SELECT id FROM missions
      WHERE proposer_id = auth.uid()
        OR (group_id IS NOT NULL AND public.is_group_member(group_id))
    )
  );

CREATE POLICY "Join mission as self"
  ON mission_participants FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND mission_id IN (
      SELECT id FROM missions
      WHERE proposer_id = auth.uid()
        OR (group_id IS NOT NULL AND public.is_group_member(group_id))
    )
  );

CREATE POLICY "Update own participation"
  ON mission_participants FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Delete own participation"
  ON mission_participants FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- products: 같은 그룹 멤버끼리 보임
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View products in own group"
  ON products FOR SELECT
  TO authenticated
  USING (
    seller_id = auth.uid()
    OR buyer_id = auth.uid()
    OR (group_id IS NOT NULL AND public.is_group_member(group_id))
  );

CREATE POLICY "Create own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Update group products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    seller_id = auth.uid()
    OR (group_id IS NOT NULL AND public.is_group_member(group_id))
  );

CREATE POLICY "Delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (seller_id = auth.uid());


-- ============================================
-- 랭킹 뷰 (mission_participants.status = 'completed' 카운트)
-- 반복 미션은 일자별로 완료 row가 생기므로 자연스럽게 누적 카운트됨
-- ============================================
CREATE OR REPLACE VIEW ranking_view AS
SELECT
  p.id,
  p.name,
  p.profile_img,
  p.border_color,
  COUNT(mp.id) AS completed_count
FROM profiles p
LEFT JOIN mission_participants mp
  ON mp.user_id = p.id AND mp.status = 'completed'
GROUP BY p.id, p.name, p.profile_img, p.border_color
ORDER BY completed_count DESC;


-- ============================================
-- RPC: 그룹 생성 (groups INSERT + group_members INSERT + profiles.group_id UPDATE 를
-- 한 트랜잭션에서 수행). SECURITY DEFINER 로 RLS 우회해 멀티테이블 원자성 확보.
-- ============================================
CREATE OR REPLACE FUNCTION public.create_group_with_owner(p_name TEXT)
RETURNS public.groups
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_group public.groups;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.groups (name, created_by)
    VALUES (p_name, v_user_id)
    RETURNING * INTO v_group;

  INSERT INTO public.group_members (group_id, user_id)
    VALUES (v_group.id, v_user_id);

  UPDATE public.profiles SET group_id = v_group.id WHERE id = v_user_id;

  RETURN v_group;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_group_with_owner(TEXT) TO authenticated;


-- ============================================
-- Grants (role 레벨 권한)
-- RLS 가 활성화된 테이블도 역할별 GRANT 가 별도로 필요함.
-- `DROP SCHEMA public CASCADE` 후 스키마 재생성 시 default privileges 가 초기화되므로
-- schema.sql 에 명시적으로 부여해 둠.
-- ============================================
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 신규 테이블에도 자동 적용 (후속 마이그레이션 대비)
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO authenticated;


-- ============================================
-- Realtime 활성화
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE missions;
ALTER PUBLICATION supabase_realtime ADD TABLE mission_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE products;


-- ============================================
-- 기존 auth 사용자 profile 백필
-- `handle_new_user` 트리거는 신규 auth.users INSERT 에만 발동하므로
-- 스키마 리셋 후 이미 로그인되어 있던 사용자의 profiles row 가 유실됨.
-- 멱등 쿼리 (ON CONFLICT DO NOTHING) 로 항상 끝에 실행.
-- ============================================
INSERT INTO profiles (id, name)
SELECT u.id, COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '사용자')
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
