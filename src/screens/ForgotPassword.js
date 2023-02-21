import { Text, SafeAreaView,StyleSheet } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";

export default function ForgotPassword() {
    const navigation = useNavigation();

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
              <Text
                style={styles.textMessage}>
                אנא הכנסי את כתובת הדוא"ל שלך. את תקבלי קישור כדי ליצור סיסמה חדשה
                באמצעות דואר אלקטרוני.
              </Text>
              <InputField
                placeholder="כתובת דואר אלקטרוני"
                containerStyle={{ marginBottom: 20 }}
              />
              <Button
                title="שלחי"
                onPress={() => navigation.navigate("NewPassword")}
              />
            </ContainerComponent>
          </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Forgot Password"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
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
  }
});