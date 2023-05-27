import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TutorialStore = {
    tutorial: boolean;
    setTutorial(tutorial: boolean): void;
    setHasHydrated(hasHydrated: boolean): void;
    _hasHydrated: boolean;
};

export const useTutorialStore = create<TutorialStore>()(
    persist(
        (set) => {
            return {
                tutorial: false,
                setTutorial(tutorial) {
                    set({ tutorial });
                },
                _hasHydrated: false,
                setHasHydrated(hydrated) {
                    set({ _hasHydrated: hydrated });
                }
            };
        },
        {
            name: "tutorial-storage",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
);
