import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import Tak from "../../svgs/tak.svg";
import { SvgXml } from "react-native-svg";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

export const GetStartedScreen1 = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "GetStartedScreen1">) => {
    return (
        <SafeAreaView className="h-full">
            <Header />
            <View className="flex h-full w-full items-center justify-around py-14">
                <View className="w-full items-center justify-center gap-y-20">
                    <SvgXml width={200} height={200} xml={Tak} />
                    <View className="w-full items-center justify-center gap-y-3">
                        <Text className="font-outfit text-4xl text-black">
                            Scan barcodes
                        </Text>
                        <Text className="px-16 text-center font-outfit text-xl text-textSecondary">
                            Scan products using the scan button, find the
                            barcode and face it to the camera
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("GetStartedScreen2")}
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
