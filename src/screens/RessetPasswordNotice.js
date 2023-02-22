import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Key } from "../svg";

export default function PasswordHasBeenResetScreen() {
  const navigation = useNavigation();

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <View style={{ alignSelf: "center", marginBottom: 30 }}>
            <Key />
          </View>
          <Text style={styles.header}>סיסמתך עודכנה בהצלחה!</Text>
          <Text style={styles.textMessage}>
            אנא בצעי התחברות עם הסיסמא החדשה על מנת להיכנס לאפליקציה{" "}
          </Text>
          <Button title="בוצע" onPress={() => navigation.navigate("SignIn")} />
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      {renderContent()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textMessage: {
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  header: {
    ...FONTS.H2,
    color: COLORS.black,
    marginBottom: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    textTransform: "capitalize",
  },
});
