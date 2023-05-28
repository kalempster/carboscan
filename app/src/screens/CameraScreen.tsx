import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line react-native/split-platform-components
import {
    Alert,
    // eslint-disable-next-line react-native/split-platform-components
    PermissionsAndroid,
    StyleSheet,
    Text,
    Linking,
    View,
    ToastAndroid
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { RootStackParamList } from "../App";
import { BarcodeFormat, useScanBarcodes } from "vision-camera-code-scanner";
import { ProductSchemaType } from "../../../backend/zod/productSchema";
import { trpc } from "../utils/trpc";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRecentItemsStore } from "../stores/useRecentItemsStore";
import { Image } from "react-native";
import { TRPCClientError } from "@trpc/client";

const CameraScreen = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "CameraScreen">) => {
    const devices = useCameraDevices();
    const device = devices.back;

    const snapPoints = useMemo(() => ["50%"], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
        if (index != -1) return;

        console.log("xd");

        setCurrentProduct(null);
        setProductActive(false);
        setCameraStopped(false);
        navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }]
        });
    }, []);

    const [cameraStopped, setCameraStopped] = useState(false);

    const [productActive, setProductActive] = useState(false);

    const [currentProduct, setCurrentProduct] =
        useState<ProductSchemaType | null>(null);

    const recentItemsStore = useRecentItemsStore();

    const [frameProcessor, barcodes] = useScanBarcodes(
        [
            BarcodeFormat.CODABAR,
            BarcodeFormat.CODE_128,
            BarcodeFormat.CODE_39,
            BarcodeFormat.CODE_93,
            BarcodeFormat.EAN_13,
            BarcodeFormat.EAN_8,
            BarcodeFormat.ITF,
            BarcodeFormat.UPC_A,
            BarcodeFormat.UPC_E
        ],
        {
            checkInverted: true
        }
    );

    useEffect(() => {
        (async () => {
            const status = await PermissionsAndroid.request(
                "android.permission.CAMERA"
            );
            /* eslint-disable indent */
            switch (status) {
                case "denied":
                    Alert.alert(
                        "Camera permission",
                        "You need to provide permission to use a camera",
                        [
                            {
                                text: "Allow",
                                onPress() {
                                    Linking.openSettings();
                                    navigation.navigate("Dashboard");
                                }
                            }
                        ]
                    );
                    break;

                case "never_ask_again":
                    Alert.alert(
                        "Camera permission",
                        "You need to provide permission to use a camera",
                        [
                            {
                                text: "Allow",
                                onPress() {
                                    Linking.openSettings();
                                    navigation.navigate("Dashboard");
                                }
                            }
                        ]
                    );
                    break;

                default:
                    break;
            }
            /* eslint-enable indent */
        })();
    }, []);

    const getProduct = trpc.products.getProduct.useMutation();
    useEffect(() => {
        (async () => {
            if (barcodes.length > 0 && barcodes[0].rawValue && !cameraStopped) {
                setCameraStopped(true);
                try {
                    const product = await getProduct.mutateAsync({
                        barcode: barcodes[0].rawValue
                    });
                    if (!product) {
                        setCameraStopped(false);
                        ToastAndroid.show(
                            "Item not found in database",
                            ToastAndroid.SHORT
                        );
                        return;
                    }
                    recentItemsStore.addProduct(product);
                    setProductActive(true);
                    setCurrentProduct(product);
                } catch (error) {
                    if (error instanceof TRPCClientError) {
                        ToastAndroid.show(
                            "There was an error while getting the product",
                            ToastAndroid.SHORT
                        );
                        setCameraStopped(false);
                    }
                }
            }
        })();
    }, [barcodes]);

    if (!device) return <Text>Loading</Text>;

    return (
        <>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={!cameraStopped}
                frameProcessor={!cameraStopped ? frameProcessor : undefined}
                frameProcessorFps={5}
            />
            <BottomSheet
                enablePanDownToClose
                index={productActive ? 0 : -1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                {currentProduct && (
                    <View className="flex flex-1 p-10">
                        <View className="flex flex-row gap-x-5">
                            <View className="flex aspect-square items-center justify-center rounded-2xl bg-primary p-6">
                                {currentProduct && (
                                    <Image
                                        resizeMode="center"
                                        className="h-16 w-16"
                                        source={{
                                            uri: currentProduct
                                                ? currentProduct?.imageUrl
                                                : ""
                                        }}
                                    />
                                )}
                            </View>
                            <View className="flex w-full flex-1">
                                <View className="flex flex-row items-end justify-between">
                                    <Text
                                        className={`font-outfit text-4xl font-bold  text-textPrimary ${
                                            currentProduct?.rating < 33
                                                ? "text-red-600"
                                                : currentProduct?.rating > 33 &&
                                                  currentProduct?.rating < 66
                                                ? "text-yellow-400"
                                                : "text-primary"
                                        }`}>
                                        {/* eslint-disable indent */}
                                        {currentProduct?.rating < 33
                                            ? "Bad"
                                            : currentProduct?.rating > 33 &&
                                              currentProduct?.rating < 66
                                            ? "Okay"
                                            : "Good"}
                                        {/* eslint-enable indent */}
                                    </Text>
                                    <Text className="font-outfit text-xl text-textPrimary ">
                                        {currentProduct?.rating}/100
                                    </Text>
                                </View>
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    className="font-outfit text-2xl text-textPrimary">
                                    {currentProduct?.name}
                                </Text>
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={3}
                                    className="font-outfit text-textSecondary">
                                    This company emitted around{" "}
                                    {currentProduct?.carbonFootprint} grams CO2e
                                    to manufacture this product.
                                </Text>
                            </View>
                        </View>
                        <Text className="font-outfit text-lg text-textSecondary">
                            {currentProduct?.description}
                        </Text>
                    </View>
                )}
            </BottomSheet>
        </>
    );
};

export default CameraScreen;
