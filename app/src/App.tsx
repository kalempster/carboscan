import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import {
    NativeStackScreenProps,
    createNativeStackNavigator
} from "@react-navigation/native-stack";
import CameraScreen from "./screens/CameraScreen";
import { useEffect } from "react";
import { GetStartedScreen1 } from "./screens/GetStartedScreens/GetStartedScreen1";
import { GetStartedScreen2 } from "./screens/GetStartedScreens/GetStartedScreen2";
import { GetStartedScreen3 } from "./screens/GetStartedScreens/GetStartedScreen3";

export type RootStackParamList = {
    Home: undefined;
    CameraScreen: undefined;
    GetStartedScreen1: undefined;
    GetStartedScreen2: undefined;
    GetStartedScreen3: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Home = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
    return (
        <SafeAreaView className="flex h-full items-center justify-center bg-white">
            <Text className="font-outfit text-5xl font-bold text-black">
                carboscan
            </Text>
            <Button
                title="Another page"
                onPress={() => navigation.navigate("GetStartedScreen1")}
            />
        </SafeAreaView>
    );
};

const App = () => {
    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right"
                }}>
                <RootStack.Screen
                    options={{
                        animation: "fade_from_bottom"
                    }}
                    name="Home"
                    component={Home}
                />
                <RootStack.Screen
                    name="CameraScreen"
                    component={CameraScreen}
                />
                <RootStack.Screen
                    options={{
                        animation: "fade_from_bottom"
                    }}
                    name="GetStartedScreen1"
                    component={GetStartedScreen1}
                />
                <RootStack.Screen
                    name="GetStartedScreen2"
                    component={GetStartedScreen2}
                />
                <RootStack.Screen
                    name="GetStartedScreen3"
                    component={GetStartedScreen3}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
export default App;
