import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
// eslint-disable-next-line react-native/split-platform-components
import {
    Alert,
    // eslint-disable-next-line react-native/split-platform-components
    PermissionsAndroid,
    StyleSheet,
    Text,
    Linking
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { RootStackParamList } from "../App";
import { BarcodeFormat, useScanBarcodes } from "vision-camera-code-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { log } from "react-native-reanimated";

const CameraScreen = ({
    navigation
}: NativeStackScreenProps<RootStackParamList, "CameraScreen">) => {
    const devices = useCameraDevices();
    const device = devices.back;

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
        // console.log(barcodes);
    }, [barcodes]);

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
                        "You need to provide permission to use a camera"
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
                                    navigation.navigate("Home");
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

    if (!device) return <Text>Loading</Text>;

    return (
        <>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
            />
            <SafeAreaView>
                {barcodes.map((code, key) => {
                    console.log(code.rawValue);

                    return (
                        <Text key={key} className="text-white">
                            {code.rawValue}
                        </Text>
                    );
                })}
            </SafeAreaView>
        </>
    );
};

export default CameraScreen;
