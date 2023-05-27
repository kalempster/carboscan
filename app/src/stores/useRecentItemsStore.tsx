import { create } from "zustand";
import type { ProductSchemaType } from "../../../backend/zod/productSchema";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductStoreType = {
    products: ProductSchemaType[];
    setProducts: (products: ProductSchemaType[]) => void;
    addProduct: (product: ProductSchemaType) => void;
    setHasHydrated(hasHydrated: boolean): void;
    _hasHydrated: boolean;
};

export const useRecentItemsStore = create<ProductStoreType>()(
    persist(
        (set) => {
            return {
                products: [],
                setProducts(products) {
                    set({ products });
                },
                addProduct(product) {
                    set((state) => {
                        console.log(state.products);
                        if (state.products.length + 1 > 3) state.products.pop();

                        state.products.unshift(product);

                        return {
                            products: state.products
                        };
                    });
                },
                _hasHydrated: false,
                setHasHydrated(hydrated) {
                    set({ _hasHydrated: hydrated });
                }
            };
        },
        {
            name: "product-storage",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
);
