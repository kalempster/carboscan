// eslint-disable-next-line no-undef
module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        "nativewind/babel",
        [
            "react-native-reanimated/plugin",
            {
                globals: ["__scanCodes"]
            }
        ]
    ]
};
