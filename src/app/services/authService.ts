import { supabase } from "@/lib/supabase";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

export const authService = {
  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  async signInWithGoogle(): Promise<void> {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  /**
   * 인증 상태 변경 구독. 반환값은 unsubscribe 함수.
   */
  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  },
};
