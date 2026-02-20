-- ============================================
-- 미션놀이터 DB 스키마
-- Supabase SQL Editor에서 실행하세요
-- ============================================

-- 1. 사용자 프로필
-- auth.users 테이블과 1:1 연결
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('parent', 'child', 'solo')) NOT NULL DEFAULT 'solo',
  profile_img TEXT,
  border_color TEXT DEFAULT '#00da62',
  coins INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 회원가입 시 자동으로 프로필 생성하는 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '사용자'),
    'solo'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. 가족 관계 (부모-자녀 연결)
CREATE TABLE families (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);

-- 3. 초대코드
CREATE TABLE invite_codes (
  code TEXT PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  used_by UUID REFERENCES profiles(id),
  role_for TEXT CHECK (role_for IN ('parent', 'child')) NOT NULL,
  family_id UUID REFERENCES families(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 미션
CREATE TABLE missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assignee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  reward INTEGER DEFAULT 1 CHECK (reward >= 0 AND reward <= 99),
  status TEXT CHECK (status IN ('active', 'in_progress', 'gave_up', 'challenge_success', 'completed')) DEFAULT 'active',
  frequency TEXT CHECK (frequency IN ('1회', '매일', '매주', '매월')) DEFAULT '1회',
  due_date DATE,
  icon_src TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 교환상점 상품
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  coin_price INTEGER NOT NULL CHECK (coin_price >= 0 AND coin_price <= 99),
  icon_src TEXT,
  status TEXT CHECK (status IN ('available', 'soldout', 'shipping', 'delivered')) DEFAULT 'available',
  delivery_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 응원 메시지
CREATE TABLE cheer_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- updated_at 자동 갱신 트리거
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER missions_updated_at
  BEFORE UPDATE ON missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security (RLS) 정책
-- ============================================

-- profiles: 모든 사용자가 조회 가능, 본인만 수정 가능
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- families: 본인이 속한 가족만 조회 가능
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Family members can view"
  ON families FOR SELECT
  USING (parent_id = auth.uid() OR child_id = auth.uid());

CREATE POLICY "Parents can create family"
  ON families FOR INSERT
  WITH CHECK (parent_id = auth.uid());

-- invite_codes: 본인이 만든 코드 또는 모든 미사용 코드 조회 가능
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View own or unused codes"
  ON invite_codes FOR SELECT
  USING (creator_id = auth.uid() OR used_by IS NULL);

CREATE POLICY "Authenticated users can create codes"
  ON invite_codes FOR INSERT
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Anyone can use a code"
  ON invite_codes FOR UPDATE
  USING (used_by IS NULL);

-- missions: 본인이 만들었거나 할당받은 미션만 접근 가능
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View own missions"
  ON missions FOR SELECT
  USING (
    creator_id = auth.uid()
    OR assignee_id = auth.uid()
    OR family_id IN (
      SELECT id FROM families WHERE parent_id = auth.uid() OR child_id = auth.uid()
    )
  );

CREATE POLICY "Create own missions"
  ON missions FOR INSERT
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Update related missions"
  ON missions FOR UPDATE
  USING (
    creator_id = auth.uid()
    OR assignee_id = auth.uid()
  );

CREATE POLICY "Delete own missions"
  ON missions FOR DELETE
  USING (creator_id = auth.uid());

-- products: 같은 가족 내에서만 접근 가능
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View family products"
  ON products FOR SELECT
  USING (
    creator_id = auth.uid()
    OR family_id IN (
      SELECT id FROM families WHERE parent_id = auth.uid() OR child_id = auth.uid()
    )
  );

CREATE POLICY "Create own products"
  ON products FOR INSERT
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Update family products"
  ON products FOR UPDATE
  USING (
    creator_id = auth.uid()
    OR family_id IN (
      SELECT id FROM families WHERE parent_id = auth.uid() OR child_id = auth.uid()
    )
  );

CREATE POLICY "Delete own products"
  ON products FOR DELETE
  USING (creator_id = auth.uid());

-- cheer_messages: 같은 가족 내에서만 접근 가능
ALTER TABLE cheer_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View family cheer messages"
  ON cheer_messages FOR SELECT
  USING (
    family_id IN (
      SELECT id FROM families WHERE parent_id = auth.uid() OR child_id = auth.uid()
    )
  );

CREATE POLICY "Send cheer messages"
  ON cheer_messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- ============================================
-- Realtime 활성화 (실시간 동기화용)
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE missions;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE cheer_messages;

-- ============================================
-- 랭킹용 뷰 (미션 완료 수 기반)
-- ============================================
CREATE OR REPLACE VIEW ranking_view AS
SELECT
  p.id,
  p.name,
  p.profile_img,
  p.border_color,
  COUNT(m.id) AS completed_count
FROM profiles p
LEFT JOIN missions m ON (m.assignee_id = p.id OR (m.assignee_id IS NULL AND m.creator_id = p.id))
  AND m.status = 'completed'
GROUP BY p.id, p.name, p.profile_img, p.border_color
ORDER BY completed_count DESC;
