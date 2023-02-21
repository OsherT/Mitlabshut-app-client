import { Text, SafeAreaView } from "react-native";
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
                        style={{
                            marginBottom: 30,
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                            lineHeight: 16 * 1.7,
                        }}
                    >
                        Enter new password and confirm.
                    </Text>
                    <InputField
                        placeholder="New Password"
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        placeholder="Confirm Password"
                        containerStyle={{ marginBottom: 20 }}
                    />
                    <Button
                        title="change password"
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
