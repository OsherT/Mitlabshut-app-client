import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";

export default function ConfirmationCode() {
    const navigation = useNavigation();

    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();

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
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                            marginBottom: 30,
                            lineHeight: 16 * 1.7,
                        }}
                    >
                        Enter your OTP code here.
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 30,
                        }}
                    >
                        <View
                            style={{
                                borderRadius: 60,
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: COLORS.goldenTransparent_05,
                            }}
                        >
                            <TextInput
                                style={{
                                    textAlign: "center",
                                    paddingHorizontal: 22,
                                    paddingVertical: 14.5,
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontFamily: "Mulish_400Regular",
                                    color: COLORS.golden,
                                    width: 60,
                                }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={firstInput}
                                onChangeText={(text) => {
                                    setOtp({ ...otp, 1: text });
                                    text && secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View
                            style={{
                                borderRadius: 60,
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: COLORS.goldenTransparent_05,
                            }}
                        >
                            <TextInput
                                style={{
                                    textAlign: "center",
                                    paddingHorizontal: 22,
                                    paddingVertical: 14.5,
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontFamily: "Mulish_400Regular",
                                    color: COLORS.golden,
                                    width: 59,
                                }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={secondInput}
                                onChangeText={(text) => {
                                    setOtp({ ...otp, 2: text });
                                    text
                                        ? thirdInput.current.focus()
                                        : firstInput.current.focus();
                                }}
                            />
                        </View>
                        <View
                            style={{
                                borderRadius: 60,
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: COLORS.goldenTransparent_05,
                            }}
                        >
                            <TextInput
                                style={{
                                    textAlign: "center",
                                    paddingHorizontal: 22,
                                    paddingVertical: 14.5,
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontFamily: "Mulish_400Regular",
                                    color: COLORS.golden,
                                    width: 59,
                                }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={thirdInput}
                                onChangeText={(text) => {
                                    setOtp({ ...otp, 3: text });
                                    text
                                        ? fourthInput.current.focus()
                                        : secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View
                            style={{
                                borderRadius: 60,
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: COLORS.goldenTransparent_05,
                            }}
                        >
                            <TextInput
                                style={{
                                    textAlign: "center",
                                    paddingHorizontal: 22,
                                    paddingVertical: 14.5,
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontFamily: "Mulish_400Regular",
                                    color: COLORS.golden,
                                    width: 59,
                                }}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={fourthInput}
                                onChangeText={(text) => {
                                    setOtp({ ...otp, 4: text });
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 30,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_400Regular,
                                fontSize: 16,
                                color: COLORS.gray,
                                lineHeight: 16 * 1.7,
                            }}
                        >
                            Didn’t receive the OTP?{" "}
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 16,
                                    color: COLORS.black,
                                    lineHeight: 16 * 1.7,
                                }}
                            >
                                Resend.
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Verify"
                        onPress={() => navigation.navigate("AccountCreated")}
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
