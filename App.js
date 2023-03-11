import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import AppNavigation from "./src/navigation/AppNavigation";

const firebaseConfig = {
    apiKey: "AIzaSyAt1b2u1JfJ1L2Wloz9jYDcZI3WRrW4qgI",
    authDomain: "mitlabshut-b53e9.firebaseapp.com",
    projectId: "mitlabshut-b53e9",
    storageBucket: "mitlabshut-b53e9.appspot.com",
    messagingSenderId: "946523654428",
    appId: "1:946523654428:web:7295063651cee54875d2d9",
    measurementId: "G-2L0P4HZWLR",
  };
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
