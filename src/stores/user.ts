import { create } from "zustand";

interface UserStore {
  userId: number | null;
  username: string | null;
  token: string | null;
  actions: {
    setUserName(name: string): void;
    setUserId(id: number): void;
    setUserToken(token: string): void;
    getUserToken(): string | null;

  };
}

export const useUserStore = create<UserStore>((set, get) => ({
  userId: Number(localStorage.getItem("userId")),
  username: localStorage.getItem("user"),
  token: localStorage.getItem("token"),


  actions: {
    getUserToken: () => get().token,
    setUserName(username: string) {
      set({ username });
    },
    setUserToken(token: string | null) {
      set({ token });
    },
    setUserId(id:number|null){
      set({userId:id})
    }


  },
}));

export const {
  setUserName,
  setUserToken,
  getUserToken,
  setUserId
} = useUserStore.getState().actions;
