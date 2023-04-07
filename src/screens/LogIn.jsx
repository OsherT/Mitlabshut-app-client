import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import AppLoading from "expo-app-loading";
import ButtonLogIn from "../components/ButtonLogIn";
// import Facebook from "../svg/Facebook";
// import Google from "../svg/GoogleSvg";
import { userContext } from "../navigation/userContext";
import AlertModal from "../components/AlertModal";
// import * as webBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

export default function SignIn() {
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api`;
  const { loggedUser, setloggedUser, setSelectedTab } = useContext(userContext);
  const navigation = useNavigation();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");

  //לצורך נוחות כדי לא להקליד את הנתונים כל פעם////////////////////////
  const [userEmail, setUserEmail] = useState("o@g.c");
  const [userPassword, setUserPassword] = useState("123");
  //לצורך נוחות כדי לא להקליד את הנתונים כל פעם////////////////////////

  //ref to clean the user inputs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  //check if the user insert correct values, and loning him in
  const logIn = () => {
    if (userEmail === "" || userPassword === "") {
      setMessage("יש למלא את כל הפרטים");
      setShowAlertModal(true);
    } else {
      setUserEmail(userEmail.replace("%40", "@"));
      fetch(
        ApiUrl + `/User/GetUser/email/${userEmail}/password/${userPassword}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (user) => {
            if (user.id > 0) {
              setloggedUser(user);
              navigation.navigate("MainLayout");
            }

            //if deatails are incorrect
            else {
              setMessage("כתובת האימייל או הסיסמא שגויים");
              setShowAlertModal(true);
              setUserEmail("");
              setUserPassword("");
              emailInputRef.current.clear();
              passwordInputRef.current.clear();
            }
          },
          (error) => {
            console.log("ERR in logIn", error);
          }
        );
    }
  };

  // const logInWithFaceBook = () => {
  //   Alert.alert("FaceBook yay");
  // };
  // const logInWithGoogle = () => {
  //   Alert.alert("Google yay");
  // };

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
            // onChangeText={(text) => setUserEmail(text.replace("%40", "@"))}
            //לצורך נוחות כדי לא להקליד את הנתונים כל פעם////////////////////////
            value="o@g.c"
            containerStyle={{ marginBottom: 10, textAlign: "right" }}
            ref={emailInputRef}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            name="password"
            // onChangeText={(text) => setUserPassword(text)}

            //לצורך נוחות כדי לא להקליד את הנתונים כל פעם////////////////////////
            value="123"
            containerStyle={{ marginBottom: 20 }}
            ref={passwordInputRef}
          />

          <View style={styles.textUpperContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>שכחת סיסמא?</Text>
            </TouchableOpacity>
          </View>

          <Button title="התחברי" onPress={logIn} />
        </ContainerComponent>

        {/* <View style={styles.logInViaContainer}>
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
        </View> */}

        <View style={styles.textLowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.joinUs}>הצטרפי </Text>
          </TouchableOpacity>
          <Text style={styles.text}>עדיין לא חברת קהילה? </Text>
        </View>
        {showAlertModal && (
          <AlertModal
            showModal={showAlertModal}
            setShowModal={setShowAlertModal}
            massage={message}
          />
        )}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
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
