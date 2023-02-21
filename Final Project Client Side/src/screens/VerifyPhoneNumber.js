import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-input";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";

export default function VerifyPhoneNumber() {
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
                        We have sent you an SMS with a code to number +17
                        0123456789.
                    </Text>
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            borderWidth: 1,
                            borderRadius: 25,
                            paddingHorizontal: 25,
                            borderColor: COLORS.goldenTransparent_03,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                    >
                        <PhoneInput
                            style={{
                                fontSize: 16,
                                ...FONTS.Mulish_400Regular,
                            }}
                            placeholderTextColor={COLORS.black}
                            initialCountry={"us"}
                        />
                    </View>

                    <Button
                        title="confirm"
                        onPress={() => navigation.navigate("ConfirmationCode")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Verify Your Phone Number"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
