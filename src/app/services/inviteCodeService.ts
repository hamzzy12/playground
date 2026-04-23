import { supabase } from "@/lib/supabase";

export interface InviteCode {
  code: string;
  creator_id: string;
  group_id: string;
  used_by: string | null;
  created_at: string;
}

/** 혼동이 적은 8자 짧은 코드 (대문자 + 숫자, 0/O/1/I 제외) */
function generateCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export const inviteCodeService = {
  /**
   * 코드 유효성 검증.
   * - 로그인 전(LoginScreen) 에서도 호출되므로 anon role 로 invite_codes 테이블에 직접
   *   접근하면 42501 이 난다. SECURITY DEFINER RPC `validate_invite_code` 를 경유해
   *   code / group_id 만 노출한다.
   * - 초대코드는 다회용이므로 used_by 는 체크하지 않는다.
   */
  async validate(
    code: string,
  ): Promise<{ code: string; group_id: string } | null> {
    const { data, error } = await supabase.rpc("validate_invite_code", {
      p_code: code.trim(),
    });
    if (error) {
      console.error("[inviteCodeService] validate:", error);
      return null;
    }
    if (!Array.isArray(data) || data.length === 0) return null;
    return data[0] as { code: string; group_id: string };
  },

  /**
   * 초대 preview. 수신자는 아직 그룹 멤버가 아니라 groups / group_members 의 RLS 가
   * 차단하므로 SECURITY DEFINER RPC 로 최소 필드(이름, 멤버 수)만 노출.
   */
  async preview(
    code: string,
  ): Promise<{ groupId: string; groupName: string; memberCount: number } | null> {
    const { data, error } = await supabase.rpc("preview_invite", {
      p_code: code.trim(),
    });
    if (error) {
      console.error("[inviteCodeService] preview:", error);
      return null;
    }
    if (!Array.isArray(data) || data.length === 0) return null;
    const row = data[0] as { group_id: string; group_name: string; member_count: number };
    return {
      groupId: row.group_id,
      groupName: row.group_name,
      memberCount: Number(row.member_count),
    };
  },

  /** 그룹의 초대 코드 하나를 조회 (여러 개면 최신). 다회용이라 used_by 무관. */
  async getActiveForGroup(groupId: string): Promise<InviteCode | null> {
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error("[inviteCodeService] getActiveForGroup:", error);
      return null;
    }
    return (data as InviteCode | null) ?? null;
  },

  /**
   * 신규 코드 발급. 동일 코드 충돌 시 재시도 (최대 5회).
   * 그룹당 활성 1개 정책이지만 DB 제약이 없으므로 호출자가 먼저 getActiveForGroup 로 확인 권장.
   */
  async create(groupId: string, creatorId: string): Promise<InviteCode | null> {
    for (let i = 0; i < 5; i++) {
      const code = generateCode();
      const { data, error } = await supabase
        .from("invite_codes")
        .insert({ code, creator_id: creatorId, group_id: groupId })
        .select("*")
        .single();
      if (!error && data) return data as InviteCode;
      if (error && error.code !== "23505") {
        console.error("[inviteCodeService] create:", error);
        return null;
      }
    }
    console.error("[inviteCodeService] create: too many collisions");
    return null;
  },

  /** 활성 코드 있으면 반환, 없으면 발급 */
  async getOrCreate(
    groupId: string,
    creatorId: string,
  ): Promise<InviteCode | null> {
    const existing = await this.getActiveForGroup(groupId);
    if (existing) return existing;
    return this.create(groupId, creatorId);
  },
};
