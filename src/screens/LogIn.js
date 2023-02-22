import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Check, EyeOff, RememberSvg } from "../svg";
import AppLoading from "expo-app-loading";

export default function SignIn() {
  const navigation = useNavigation();

  const [remember, setRemember] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // const data={
  //   email: userEmail,
  //   password: userPassword
  // };

  // const handleChange = (name, value) => {
  //   setData({ ...data, [name]: value, error: null });
  // };

  const logIn = () => {
    if (userEmail === "" || userPassword === "") {
      Alert.alert("נא למלא את כל הפרטים");
    } else {      Alert.alert("Yayy");
}
    //   const user = {
    //     email: userEmail,
    //     password: userPassword,
    //   };
    //   fetch(
    //     /////////check the correct api /////////
    //     ApiUrl + "Users?email=" + user.email + "&password=" + user.password,
    //     {
    //       method: "GET",
    //       headers: new Headers({
    //         "Content-Type": "application/json; charset=UTF-8",
    //       }),
    //     }
    //   )
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then(
    //       /////////need to return the object /////////
    //       (result) => {
    //         if (result.UserId > 0) {
    //           localStorage.setItem("loggedUser", JSON.stringify(result));
    //           //update the logged user
    //           setLoggedUser(result);
    //           // FireBaseLogin();
    //         } else if (result.UserId === 0) {
    //           alert("הסיסמא או שם המשתמש אינם נכונים");
    //           // window.location.reload();
    //         } else if (!result.UserId) {
    //           alert("הסיסמא או שם המשתמש אינם נכונים");
    //           // window.location.reload();
    //         }
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    
  };

// async function handleRememberMe(email, password) {
//   try {
//     await AsyncStorage.setItem("email", email);
//     await AsyncStorage.setItem("password", password);
//     await AsyncStorage.setItem("rememberMe", "true");
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function checkRememberMe() {
//   try {
//     const rememberMe = await AsyncStorage.getItem("rememberMe");
//     const email = await AsyncStorage.getItem("email");
//     const password = await AsyncStorage.getItem("password");

//     if (rememberMe === "true" && email && password) {
//       // Fill in the email and password fields
//       setEmail(email);
//       setPassword(password);
//       setRememberMe(true);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function handleLogout() {
//   try {
//     await AsyncStorage.removeItem("email");
//     await AsyncStorage.removeItem("password");
//     await AsyncStorage.removeItem("rememberMe");
//   } catch (error) {
//     console.error(error);
//   }
// }


  function renderContent() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <Text style={styles.mainHeader}>ברוכה הבאה </Text>
          <Text style={styles.secondHeader}>התחברי לקהילה</Text>

          <TextInput
            style={styles.textInput}
            placeholder="המייל שלך"
            name="email"
            onChangeText={(text) => setUserEmail(text)}
            containerStyle={{ marginBottom: 10, textAlign: "right" }}
            icon={<Check color={COLORS.gray} />}
          />
          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            name="password"
            onChangeText={(text) => setUserPassword(text)}
            containerStyle={{ marginBottom: 20 }}
            icon={
              <TouchableOpacity>
                <EyeOff />
              </TouchableOpacity>
            }
          />
          <View style={styles.textUpperContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>שכחתי סיסמא</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRemember(!remember)}>
              <Text style={styles.rememberMe}> זכור אותי</Text>
              <View style={styles.checkBox}>{remember && <RememberSvg />}</View>
            </TouchableOpacity>
          </View>

          <Button title="התחברי" onPress={logIn} />
        </ContainerComponent>
        <View style={styles.textLowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.joinUs}>הצטרפי</Text>
          </TouchableOpacity>
          <Text style={styles.text}>עדיין לא חברת קהילה? </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Sign In" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}

// cant get the values that the user inserts

const styles = StyleSheet.create({
  text: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.black,
  },
  joinUs: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.black,
    textDecorationLine: "underline",
  },
  textLowContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginBottom: 13,
    flexDirection: "row",
  },
  mainHeader: {
    textAlign: "center",
    ...FONTS.H1,
    color: COLORS.black,
    marginBottom: 14,
    lineHeight: 32 * 1.2,
    textTransform: "capitalize",
  },
  secondHeader: {
    textAlign: "center",
    ...FONTS.Mulish_400Regular,
    color: COLORS.gray,
    fontSize: 16,
    lineHeight: 16 * 1.7,
    marginBottom: 30,
  },
  rememberMe: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.gray,
    lineHeight: 16 * 1.7,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.goldenTransparent_05,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textUpperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  forgotPassword: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 16 * 1.7,
    textDecorationLine: "underline",
  },
  textInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FBF8F2",
    marginBottom: 20,
    textAlign: "right",
  },
});
