import React, { useState, useEffect, useRef } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
  let [fontsLoaded] = useFonts({
    Mulish_400Regular: require("./src/assets/fonts/Mulish-Regular.ttf"),
    Mulish_600SemiBold: require("./src/assets/fonts/Mulish-SemiBold.ttf"),
    Mulish_700Bold: require("./src/assets/fonts/Mulish-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <AppNavigation />;
  }
}
