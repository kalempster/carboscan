import "react-native-reanimated";
import "react-native-gesture-handler";
import { hide } from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import {
    NativeStackScreenProps,
    createNativeStackNavigator
} from "@react-navigation/native-stack";
import CameraScreen from "./screens/CameraScreen";
import { useEffect, useState } from "react";
import { GetStartedScreen1 } from "./screens/GetStartedScreens/GetStartedScreen1";
import { GetStartedScreen2 } from "./screens/GetStartedScreens/GetStartedScreen2";
import { GetStartedScreen3 } from "./screens/GetStartedScreens/GetStartedScreen3";
import { Dashboard } from "./screens/Dashboard";
import { QueryClient } from "@tanstack/query-core";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTutorialStore } from "./stores/useTutorialStore";

export type RootStackParamList = {
    Home: undefined;
    CameraScreen: undefined;
    GetStartedScreen1: undefined;
    GetStartedScreen2: undefined;
    GetStartedScreen3: undefined;
    Dashboard: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Home = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
    const tutorialStore = useTutorialStore();
    const tutorialHasHydrated = useTutorialStore((state) => state._hasHydrated);
    useEffect(() => {
        (() => {
            if (!tutorialHasHydrated) return;
            console.log(tutorialHasHydrated);
            console.log(tutorialStore.tutorial);

            if (!tutorialStore.tutorial) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "GetStartedScreen1" }]
                });

                return hide({ fade: true });
            }
            navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }]
            });
        })();
    }, [tutorialHasHydrated]);

    return <></>;
};

const App = () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api"
                })
            ]
        })
    );

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <GestureHandlerRootView style={{ flex: 1 }}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <RootStack.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                headerShown: false,
                                animation: "slide_from_right"
                            }}>
                            <RootStack.Screen name="Home" component={Home} />
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
                            <RootStack.Screen
                                name="Dashboard"
                                component={Dashboard}
                                options={{
                                    animation: "fade_from_bottom"
                                }}
                            />
                        </RootStack.Navigator>
                    </NavigationContainer>
                </QueryClientProvider>
            </trpc.Provider>
        </GestureHandlerRootView>
    );
};
export default App;
