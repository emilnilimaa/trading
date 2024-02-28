import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "../util/createSelectors";

type User = {
  username: string;
};

interface AuthState {
  user: User | null;
  //token: string | null;
  authenticated: boolean;
  setUser(user: User): void;
  //setToken(token: string): void;
  setAuthenticated: (authenticated: boolean) => void;
}

const useAuthStoreBase = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authenticated: false,
      setUser: (user: User) => set((state) => ({ user })),
      setAuthenticated: (authenticated: boolean) =>
        set((state) => ({ authenticated })),
    }),
    {
      name: "auth-storage", // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export const useAuthStore = createSelectors(useAuthStoreBase);
