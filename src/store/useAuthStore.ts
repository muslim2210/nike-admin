"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserAuth } from "@/types/model";

interface AuthState {
  user: UserAuth | null;
  token: string | null;
  login: (userData: UserAuth) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (userData: UserAuth) =>
        set({
          user: userData,
          token: userData.token, // pastikan object User ada field token
        }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "nike-admin", // disimpan di localStorage
    }
  )
);
