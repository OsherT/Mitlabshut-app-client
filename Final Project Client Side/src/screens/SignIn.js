import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Check, EyeOff, RememberSvg } from "../svg";

export default function SignIn() {
    const navigation = useNavigation();
    const [remember, setRemember] = useState(false);

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
                            textAlign: "center",
                            ...FONTS.H1,
                            color: COLORS.black,
                            marginBottom: 14,
                            lineHeight: 32 * 1.2,
                            textTransform: "capitalize",
                        }}
                    >
                        Welcome Back!
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_400Regular,
                            color: COLORS.gray,
                            fontSize: 16,
                            lineHeight: 16 * 1.7,
                            marginBottom: 30,
                        }}
                    >
                        Sign in to continue
                    </Text>
                    <InputField
                        placeholder="johndoe@mail.com"
                        containerStyle={{ marginBottom: 10 }}
                        icon={<Check color={COLORS.gray} />}
                    />
                    <InputField
                        placeholder="*********************"
                        containerStyle={{ marginBottom: 20 }}
                        icon={
                            <TouchableOpacity>
                                <EyeOff />
                            </TouchableOpacity>
                        }
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            onPress={() => setRemember(!remember)}
                        >
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
                                }}
                            >
                                {remember && <RememberSvg />}
                            </View>

                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 16,
                                    color: COLORS.gray,
                                    lineHeight: 16 * 1.7,
                                }}
                            >
                                Remember me
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("ForgotPassword")
                            }
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 16,
                                    color: COLORS.black,
                                    lineHeight: 16 * 1.7,
                                }}
                            >
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="SIGN IN"
                        onPress={() => navigation.navigate("VerifyPhoneNumber")}
                    />
                </ContainerComponent>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                        flex: 1,
                        marginBottom: 13,
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                        }}
                    >
                        Don’t have an account?{" "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_400Regular,
                                fontSize: 16,
                                color: COLORS.black,
                            }}
                        >
                            Sign up.
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Sign In" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
