import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import Nie from "../../svgs/niewiem.svg";
import { SvgXml } from "react-native-svg";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTutorialStore } from "../../stores/useTutorialStore";

export const GetStartedScreen3 = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "GetStartedScreen3">) => {
    const tutorialStore = useTutorialStore();
    return (
        <SafeAreaView className="h-full">
            <Header />
            <View className="flex h-full w-full items-center justify-around py-14">
                <View className="w-full items-center justify-center gap-y-20">
                    <SvgXml height={200} xml={Nie} />
                    <View className="w-full items-center justify-center gap-y-3">
                        <Text className="font-outfit text-4xl text-black">
                            Help the planet
                        </Text>
                        <Text className="px-16 text-center font-outfit text-xl text-textSecondary">
                            Contribute to a greener planet by scanning barcodes
                            and using our app&apos;s insights.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Dashboard" }]
                        });
                        tutorialStore.setTutorial(true);
                    }}
                    activeOpacity={0.68}
                    className="flex rounded-full bg-primary">
                    <Text className="px-10 py-2 font-outfit text-xl text-white">
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
