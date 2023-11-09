import {create} from 'zustand';

type tokenState = {
  token: string | null;
  setToken: (token: string) => void;
  resetToken: any;
};

const useUserStore = create<tokenState>(set => ({
  token: null,
  setToken: token => set(() => ({token})),

  resetToken: () => {
    set({
      token: null,
    });
  },
}));

export default useUserStore;
