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

export type RootStackParamList = {
    Home: undefined;
    CameraScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Home = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
    return (
        <SafeAreaView className="flex h-full items-center justify-center bg-white">
            <Text>Hello, world!</Text>
            <Button
                title="Another page"
                onPress={() => navigation.navigate("CameraScreen")}
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
                    animation: "fade_from_bottom"
                }}>
                <RootStack.Screen name="Home" component={Home} />
                <RootStack.Screen
                    name="CameraScreen"
                    component={CameraScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
export default App;
