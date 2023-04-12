import React, { useEffect, useLayoutEffect } from "react";
import * as SplashScreen from "expo-splash-screen"; // Update import statement
import { useFonts } from "expo-font";
import AppNavigation from "./src/navigation/AppNavigation";
import { I18nManager } from "react-native";

export default function App() {
  let [fontsLoaded] = useFonts({
    Mulish_400Regular: require("./src/assets/fonts/Mulish-Regular.ttf"),
    Mulish_600SemiBold: require("./src/assets/fonts/Mulish-SemiBold.ttf"),
    Mulish_700Bold: require("./src/assets/fonts/Mulish-Bold.ttf"),
  });

  useEffect(() => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error while hiding splash screen:", error);
      }
    };

    hideSplashScreen();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    return <AppNavigation />;
  }
}


