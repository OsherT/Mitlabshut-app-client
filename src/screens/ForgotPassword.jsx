import { Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [user, setUser] = useState("");
  const [firstStep, setFirstStep] = useState(true);
  const [flag, setflag] = useState(false);
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");

  function newpass() {
    if (userEmail == "" || userPhone == "") {
      alert("אנא מלאי את כל השדות הנדרשים");
    } else {
      //לשלוח לשרת את המייל והטלפון ולקבל חזרה את יוזר
      setflag(true);
      setFirstStep(false);
      setUser("user");
    }
  }
  function changePass() {
    if (password!=rePassword) {
      alert("הסיסמאות אינן זהות")
    }
    else{
      //put to user
    }
  }
  function renderStepOne() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent>
          <Text style={styles.textMessage}>
            אנא הכניסי את כתובת הדוא"ל שלך ומספר הטלפון לאימות
          </Text>
          <InputField
            placeholder="כתובת דואר אלקטרוני"
            containerStyle={{ marginBottom: 20 }}
            keyboardType="email-address"
            onChangeText={(text) => setUserEmail(text)}
          />
          <InputField
            placeholder="מספר טלפון"
            containerStyle={{ marginBottom: 20 }}
            keyboardType="phone-pad"
            onChangeText={(text) => setUserPhone(text)}
          />
          <Button title="שלחי" onPress={() => newpass()} />
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }
  function renderStepTwo() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent>
          <Text style={styles.textMessage}>הכניסי סיסמה חדשה </Text>
          <InputField
            placeholder="סיסמה"
            containerStyle={{ marginBottom: 20 }}
            onChangeText={(text) => setpassword(text)}
          />
          <InputField
            placeholder="אימות סיסמה"
            containerStyle={{ marginBottom: 20 }}
            onChangeText={(text) => setrePassword(text)}
          />
          <Button title="שני סיסמה" onPress={() => changePass()} />
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="שחזור סיסמה" onPress={() => navigation.goBack()} />
      {firstStep && renderStepOne()}
      {flag && renderStepTwo()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textMessage: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 30,
    textAlign: "right",
  },
});
