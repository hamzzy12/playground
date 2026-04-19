import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";
import { authService } from "@/app/services";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  signInWithGoogle: async () => {
    await authService.signInWithGoogle();
  },
  signOut: async () => {
    await authService.signOut();
    set({ user: null, session: null });
  },
}));

/**
 * 앱 진입 시 1회 호출. 세션 복원 + 인증 상태 변경 구독을 설정.
 * 반환값은 cleanup 함수.
 */
export function initAuth(): () => void {
  authService.getSession().then((session) => {
    useAuthStore.setState({
      session,
      user: session?.user ?? null,
      loading: false,
    });
  });

  return authService.onAuthStateChange((_event, session) => {
    useAuthStore.setState({
      session,
      user: session?.user ?? null,
      loading: false,
    });
  });
}
