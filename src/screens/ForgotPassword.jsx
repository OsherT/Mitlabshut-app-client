import { Text, SafeAreaView, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import React, { useContext, useState } from "react";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [user, setUser] = useState("");
  const [firstStep, setFirstStep] = useState(true);
  const [flag, setflag] = useState(false);
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const { setSelectedTab } = useContext(userContext);

  function newpass() {
    if (userEmail == "" || userPhone == "") {
      alert("אנא מלאי את כל השדות הנדרשים");
    } else {
      //לשלוח לשרת את המייל והטלפון ולקבל חזרה את יוזר
      setUserEmail(userEmail.replace("%40", "@"));
      axios
        .get(
          `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserEmailAndPhone/email/${userEmail}/Phone_number/${userPhone}`
        )
        .then((res) => {
          setUser(res.data);
          setflag(true);
          setFirstStep(false);
        })
        .catch((err) => {
          console.log("err in newpass ", err);
        });
    }
  }
  function changePass() {
    if (password != rePassword) {
      alert("הסיסמאות אינן זהות");
    } else {
      const updateUser = {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        full_name: user.full_name,
        password: password,
        address: user.address,
        is_admin: user.is_admin,
        closet_id: user.closet_id,
        user_image: user.user_image,
        token: user.token,
      };
      //https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PutUser
      axios
        .put(
          "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PutUser",
          updateUser
        )
        .then((res) => {
          navigation.navigate("PasswordHasBeenResetScreen");
        })
        .catch((err) => {
          console.log(err);
        });
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
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <Text style={styles.textMessage}>
            אנא הכניסי את כתובת הדוא"ל שלך ומספר הטלפון לצורך אימות פרטים
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
          <Button title="אישור" onPress={() => newpass()} />
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
        showsHorizontalScrollIndicator={false}>
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
      <Header
        title="שחזור סיסמה"
        goBack={true}
        selectedTab={() => {
          setSelectedTab("Home");
          navigation.goBack();
        }}
      />
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
    textAlign: "center",
  },
});
