import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check } from "../svg";

export default function SignUp() {
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
                            textAlign: "center",
                            ...FONTS.H1,
                            color: COLORS.black,
                            marginBottom: 30,
                            lineHeight: 32 * 1.2,
                            textTransform: "capitalize",
                        }}
                    >
                        Sign up
                    </Text>
                    <InputField
                        placeholder="Kristin Watson"
                        containerStyle={{ marginBottom: 10 }}
                        icon={<Check color={COLORS.gray} />}
                    />
                    <InputField
                        placeholder="kristinwatson@mail.com"
                        containerStyle={{ marginBottom: 20 }}
                        icon={<Check color={COLORS.gray} />}
                    />
                    <InputField
                        placeholder="••••••••"
                        containerStyle={{ marginBottom: 20 }}
                        icon={
                            <TouchableOpacity>
                                <EyeOff />
                            </TouchableOpacity>
                        }
                    />
                    <InputField
                        placeholder="••••••••"
                        containerStyle={{ marginBottom: 20 }}
                        icon={
                            <TouchableOpacity>
                                <EyeOff />
                            </TouchableOpacity>
                        }
                    />
                    <Button
                        title="SIGN UP"
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
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_400Regular,
                                fontSize: 16,
                                color: COLORS.black,
                            }}
                        >
                            Sign in.
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Sign Up" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
