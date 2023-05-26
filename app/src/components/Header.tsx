import { Text, View } from "react-native";

export const Header = () => {
    return (
        <View className="flex w-full flex-row items-center justify-center">
            <Text className="font-outfit text-3xl font-bold text-logoBlack">
                carbo
            </Text>
            <Text className="font-outfit text-3xl font-bold text-logoGreen">
                scan
            </Text>
        </View>
    );
};
