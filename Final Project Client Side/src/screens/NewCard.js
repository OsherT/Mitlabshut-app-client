import { View, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS } from "../constants";

export default function NewCard() {
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
                    <InputField
                        placeholder="Account holder name"
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        placeholder="Card number"
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                width: "47%",
                                height: 50,
                                borderWidth: 1,
                                borderRadius: 25,
                                paddingHorizontal: 25,
                                borderColor: COLORS.goldenTransparent_03,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: "#FBF8F2",
                            }}
                        >
                            <TextInput
                                placeholder="Exp. Date"
                                style={{ flex: 1, paddingRight: 15 }}
                            />
                        </View>
                        <View
                            style={{
                                width: "47%",
                                height: 50,
                                borderWidth: 1,
                                borderRadius: 25,
                                paddingHorizontal: 25,
                                borderColor: COLORS.goldenTransparent_03,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: "#FBF8F2",
                            }}
                        >
                            <TextInput
                                placeholder="CVV Code"
                                style={{ flex: 1, paddingRight: 15 }}
                            />
                        </View>
                    </View>
                    <Button
                        title="SAVE NOW"
                        containerStyle={{ marginTop: 25 }}
                        onPress={() => navigation.navigate("PaymentMethod")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Add a new Card"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
