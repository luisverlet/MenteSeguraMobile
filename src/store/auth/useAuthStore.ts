import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthStatus = "checking" | "authenticated" | "guest";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  studentCode?: string;
  faculty?: string;
  program?: string;
  semester?: number;
  avatarUrl?: string;
}

interface AuthState {
  status: AuthStatus;
  token: string | null;
  user: UserProfile | null;

  // Actions
  login: (token: string, user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  updateProfile: (partial: Partial<UserProfile>) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>((set) => ({
  status: "checking",
  token: null,
  user: null,

  // ── Login ──────────────────────────────────────────────────────────────────
  login: async (token, user) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ status: "authenticated", token, user });
  },

  // ── Logout ─────────────────────────────────────────────────────────────────
  logout: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    set({ status: "guest", token: null, user: null });
  },

  // ── Restore session on app boot ────────────────────────────────────────────
  restoreSession: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userJson = await AsyncStorage.getItem(USER_KEY);

      if (token && userJson) {
        const user: UserProfile = JSON.parse(userJson);
        set({ status: "authenticated", token, user });
      } else {
        set({ status: "guest" });
      }
    } catch {
      set({ status: "guest" });
    }
  },

  // ── Update profile locally (after PATCH to backend) ───────────────────────
  updateProfile: (partial) => {
    set((state) => {
      if (!state.user) return {};
      const updated = { ...state.user, ...partial };
      AsyncStorage.setItem(USER_KEY, JSON.stringify(updated)).catch(() => {});
      return { user: updated };
    });
  },
}));
