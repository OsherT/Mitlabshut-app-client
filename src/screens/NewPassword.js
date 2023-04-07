import { Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";

export default function NewPassword() {
    const navigation = useNavigation();

    function renderContent() {
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
                    <Text
                        style={styles.textMessage}
                    >
                        הכניסי סיסמא חדשה ובצעי אימותעעעע
                    </Text>
                    <InputField
                        placeholder="סיסמא חדשה"
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        placeholder="אימות סיסמא"
                        containerStyle={{ marginBottom: 20 }}
                    />
                    <Button
                        title="עדכני סיסמא"
                        onPress={() =>
                        
                            navigation.navigate("RessetPasswordNotice")
                        }
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }
    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Reset Password"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  textMessage: {
    marginBottom: 30,
    ...FONTS.Mulish_400Regular,
    fontSize: 16,
    color: COLORS.gray,
    lineHeight: 16 * 1.7,
    textAlign: "center",
  },
});