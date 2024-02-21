import { create } from "zustand";
import {
  StateStorage,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

interface LinkState {
  links: Array<string>;
  addLinks: (link: string) => void;
  removeLinks: () => void;
}

export const storage = new MMKV({
  id: "links-storage",
});

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    console.log({ value });

    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export const useLinkStore = create<LinkState>()(
  persist(
    (set) => ({
      links: [],
      addLinks: (link) => set((state) => ({ links: [...state.links, link] })),
      removeLinks: () => set({ links: [] }),
    }),
    {
      name: "links-storage",
      onRehydrateStorage: (state) => {
        console.log("onRehydrateStorage");
      },
      storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
