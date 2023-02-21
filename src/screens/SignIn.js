import { View, Text, TouchableOpacity, SafeAreaView,StyleSheet  } from "react-native";
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
                        ברוכות הבאות!
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
                        התחברי לקהילה
                    </Text>
                    <InputField
                        placeholder="המייל שלך"
                        containerStyle={{ marginBottom: 10, textAlign:"right" }}
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
                                זכור אותי 
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
                                שכחת את הסיסמה?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="התחברי"
                        onPress={() => navigation.navigate("MainLayout")}
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
                            {" "}הצטרפי.  
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                        }}
                    >
                        עדיין לא חברת קהילה? {" "}
                    </Text>
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

  
  
  
  
  