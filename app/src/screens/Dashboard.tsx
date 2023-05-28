import { Text, TouchableOpacity, View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets
} from "react-native-safe-area-context";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import dsch from "../svgs/dashboard.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import dsch2 from "../svgs/dashboard2.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import barcode from "../svgs/barcode.svg";
import { SvgXml } from "react-native-svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Header } from "../components/Header";
import { useRecentItemsStore } from "../stores/useRecentItemsStore";
import { Product } from "../components/Product";
import { useEffect } from "react";
import { hide } from "react-native-bootsplash";
export const Dashboard = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "Dashboard">) => {
    const insets = useSafeAreaInsets();

    const recentItemsStore = useRecentItemsStore();

    useEffect(() => {
        hide({ fade: true });
    }, []);

    return (
        <>
            <View
                className="absolute bottom-0 flex h-16 w-full items-center "
                style={{ marginBottom: insets.bottom + 64 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CameraScreen")}
                    activeOpacity={0.68}
                    className="relative flex h-16 w-16 items-center justify-center rounded-[20px] bg-primary">
                    <SvgXml xml={barcode} />
                </TouchableOpacity>
            </View>
            <SafeAreaView>
                <Header />
                <View className="flex w-full items-center justify-center p-10">
                    <SvgXml xml={dsch} />
                    <View className="flex w-full gap-y-8">
                        <View className="flex gap-y-2">
                            <Text className="text-left font-outfit text-xl text-textPrimary">
                                Recent products
                            </Text>
                            {/* eslint-disable indent */}
                            {recentItemsStore._hasHydrated &&
                                recentItemsStore.products.length == 0 && (
                                    <>
                                        <Text className="px-2 text-center font-outfit text-base text-textSecondary">
                                            Recent products will appear here,
                                            use the button below to scan your
                                            products
                                        </Text>

                                        <SvgXml
                                            xml={dsch2}
                                            className="self-center"
                                        />
                                    </>
                                )}

                            {recentItemsStore._hasHydrated &&
                                recentItemsStore.products.length > 0 && (
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    <View className="flex" style={{ gap: 12 }}>
                                        {recentItemsStore.products.map(
                                            (p, index) => (
                                                <Product
                                                    key={index}
                                                    title={p.name}
                                                    description={p.description}
                                                    imageUrl={p.imageUrl}
                                                />
                                            )
                                        )}
                                    </View>
                                )}
                            {/* eslint-enable indent */}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};
