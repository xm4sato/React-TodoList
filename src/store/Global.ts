import type { GlobalStoreType } from "@/Types/Global";
import { create } from "zustand";

export const useGlobalStore = create<GlobalStoreType>((set, get) => ({
  Modal: {
    isOpen: false,
    content: null,
    title: "",
  },

  handleModal: (isOpened: boolean, content: any) =>
    set({
      Modal: { ...get().Modal, isOpen: isOpened, content: content || null },
    }),
}));
