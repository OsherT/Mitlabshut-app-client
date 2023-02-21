import { Dimensions } from "react-native";
import { Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    white: "#fff",
    black: "#000",
    golden: "#D7BA7B",
    gray: "#626262",
    lightGray: "#C4C6CF",
    carrot: "#FE724E",
    green: "#00824B",

    goldenTransparent_01: "rgba(215, 186, 123, 0.1)",
    goldenTransparent_03: "rgba(215, 186, 123, 0.3)",
    goldenTransparent_04: "rgba(215, 186, 123, 0.4)",
    goldenTransparent_05: "rgba(215, 186, 123, 0.5)",

    transparent: "transparent",
};
export const SIZES = {
    h1: 30,
    h2: 22,

    width,
    height,

    paddingTop: height * 0.12,
};
export const FONTS = {
    H1: {
        fontFamily: "Mulish_700Bold",
        fontSize: 32,
    },
    H2: {
        fontFamily: "Mulish_700Bold",
        fontSize: 22,
    },
    Mulish_400Regular: { fontFamily: "Mulish_400Regular" },
    Mulish_600SemiBold: { fontFamily: "Mulish_600SemiBold" },
    Mulish_700Bold: { fontFamily: "Mulish_700Bold" },
};

export const AREA = {
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "rgba(215, 186, 123, 0.1)",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    DefaultBackground: {
        flex: 1,
        backgroundColor: COLORS.lightBlue,
    },
};
