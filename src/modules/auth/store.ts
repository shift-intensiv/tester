import { create } from 'zustand';

interface AuthViewStore {
  phone?: string;
  status: 'otp' | 'phone';
  submittedPhones: {
    [key: string]: number;
  };
  setPhone: (phone: string) => void;
  setStatus: (status: 'otp' | 'phone') => void;
  setSubmittedPhones: (phone: string, retryDelay: number) => void;
}

export const useAuthViewStore = create<AuthViewStore>((set) => ({
  phone: undefined,
  status: 'phone',
  submittedPhones: {},
  setPhone: (phone) => set({ phone }),
  setStatus: (status) => set({ status }),
  setSubmittedPhones: (phone: any, retryDelay: any) =>
    set((state) => ({ submittedPhones: { ...state.submittedPhones, [phone]: retryDelay } }))
}));
