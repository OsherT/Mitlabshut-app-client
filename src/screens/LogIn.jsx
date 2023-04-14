import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { userContext } from "../navigation/userContext";
import AlertModal from "../components/AlertModal";
import { RememberSvg } from "../svg";

//for later
// import Facebook from "../svg/Facebook";
// import Google from "../svg/GoogleSvg";
// import * as webBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogIn() {
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api`;
  const { setloggedUser, setSelectedTab } = useContext(userContext);
  const navigation = useNavigation();

  //modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //user info
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //ref to clean the user inputs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    async function getRememberMeState() {
      try {
        const storedRememberMe = await AsyncStorage.getItem("rememberMe");
        setRememberMe(storedRememberMe === "true");
      } catch (error) {
        console.error('Error retrieving "Remember Me" state:', error);
      }
    }
    getRememberMeState();

    const loadCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedEmail && storedPassword) {
          setUserEmail(storedEmail);
          setUserPassword(storedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.log("Error loading credentials from AsyncStorage:", error);
      }
    };

    loadCredentials();
  }, []);

  //checks if the user insert correct values, and loning him in
  const logIn = async () => {
    if (userEmail == "" || userPassword == "") {
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

    if (rememberMe) {
      try {
        await AsyncStorage.setItem("username", userEmail);
        await AsyncStorage.setItem("password", userPassword);
        await AsyncStorage.setItem("rememberMe", "true");
      } catch (error) {
        console.error("Error saving login credentials:", error);
      }
    } else {
      // If "Remember Me" is not checked, remove stored login credentials
      try {
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("rememberMe");
        setUserEmail("");
        setUserPassword("");
      } catch (error) {
        console.error("Error removing login credentials:", error);
      }
    }
  };

  //for later
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
            onChangeText={(text) => setUserEmail(text.replace("%40", "@"))}
            value={userEmail}
            containerStyle={{ marginBottom: 10, textAlign: "right" }}
            ref={emailInputRef}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.textInput}
            placeholder="••••••••"
            name="password"
            onChangeText={(text) => setUserPassword(text)}
            value={userPassword}
            containerStyle={{ marginBottom: 20 }}
            ref={passwordInputRef}
          />

          <View style={styles.textUpperContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>שכחת סיסמא?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setRememberMe(!rememberMe)}>
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: COLORS.gray,
                  lineHeight: 16 * 1.7,
                }}>
                {" "}
                {""} זכור אותי
              </Text>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: COLORS.goldenTransparent_05,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {rememberMe && <RememberSvg />}
              </View>
            </TouchableOpacity>
          </View>

          <Button title="התחברי" onPress={logIn} />
        </ContainerComponent>

        {/* for later */}
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
            message={message}
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
