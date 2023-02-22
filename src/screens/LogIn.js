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
import AppLoading from "expo-app-loading";
import ButtonLogIn from "../components/ButtonLogIn";
import Facebook from "../svg/Facebook";
import Google from "../svg/Google";

export default function SignIn() {
  const navigation = useNavigation();

  const [loggedUser, setLoggedUser] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const logIn = () => {
    if (userEmail === "" || userPassword === "") {
      Alert.alert("נא למלא את כל הפרטים");
    } else {
      Alert.alert("Yayy");
    }
    const user = {
      email: userEmail,
      password: userPassword,
    };
    ApiUrl = `localhost:7210/api/User/email/${user.email}/password/${user.password}`;

    fetch(ApiUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        /////////need to return the object /////////
        (result) => {
          if (result > 0) {
            localStorage.setItem("loggedUser", JSON.stringify(result));
            //update the logged user
            setLoggedUser(user.email);
            // FireBaseLogin();
          } else {
            Alert.alert("הסיסמא או שם המשתמש אינם נכונים");
            // window.location.reload();
          }
        },
        (error) => {
          console.log(error);
          Alert.alert("erorrrrr");
        }
      );
  };

  const logInWithFaceBook = () => {
    Alert.alert("FaceBook yay");
  };
  const logInWithGoogle = () => {
    Alert.alert("Google yay");
  };

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
          />

          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            name="password"
            onChangeText={(text) => setUserPassword(text)}
            containerStyle={{ marginBottom: 20 }}
          />

          <View style={styles.textUpperContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>שכחת סיסמא?</Text>
            </TouchableOpacity>
          </View>

          <Button title="התחברי" onPress={logIn} />
        </ContainerComponent>

        <View style={styles.logInViaContainer}>
          <ButtonLogIn
            icon={<Google />}
            style={styles.logInViaBtn}
            title="Google   "
            onPress={logInWithGoogle}
          />
          <View style={styles.separator} />
          <ButtonLogIn
            icon={<Facebook />}
            style={styles.logInViaBtn}
            title="Facebook  "
            onPress={logInWithFaceBook}
          />
        </View>

        <View style={styles.textLowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.joinUs}>הצטרפי </Text>
          </TouchableOpacity>
          <Text style={styles.text}>עדיין לא חברת קהילה? </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.gray,
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
  joinUs: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.black,
  },
  textLowContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginBottom: 13,
    flexDirection: "row",
  },
  textUpperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  forgotPassword: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 16 * 1.7,
    textDecorationLine: "underline",
  },
  logInViaContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  separator: {
    height: 30,
  },
  logInViaBtn: {
    backgroundColor: "red",
  },
});
