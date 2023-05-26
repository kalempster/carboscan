import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    NativeStackScreenProps,
    createNativeStackNavigator
} from "@react-navigation/native-stack";

type RootStackParamList = {
    Home: undefined;
    Page: undefined;
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
                onPress={() => navigation.navigate("Page")}
            />
        </SafeAreaView>
    );
};

const Page = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "Page">) => {
    return (
        <SafeAreaView className="flex h-full items-center justify-center bg-white">
            <Text>Another page</Text>
            <Button
                title="Home page"
                onPress={() => navigation.navigate("Home")}
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
                <RootStack.Screen name="Page" component={Page} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
export default App;
