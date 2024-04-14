import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState {
  isLoggedIn: boolean;
  user: User;
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    user: {} as User,
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setUser: (user) => set({ user })
  }))
);
