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
  /** 미사용 상태의 코드 조회 (초대 플로우에서 유효성 검증용) */
  async validate(code: string): Promise<InviteCode | null> {
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", code.trim())
      .is("used_by", null)
      .single();
    if (error || !data) return null;
    return data as InviteCode;
  },

  async markUsed(code: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("invite_codes")
      .update({ used_by: userId })
      .eq("code", code);
    if (error) console.error("[inviteCodeService] markUsed:", error);
  },

  /** 그룹의 활성(미사용) 코드 하나를 조회. 여러 개면 최신 1건 */
  async getActiveForGroup(groupId: string): Promise<InviteCode | null> {
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("group_id", groupId)
      .is("used_by", null)
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
