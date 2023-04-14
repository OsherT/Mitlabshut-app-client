import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { ArrowSix, AddSvg } from "../svg";

const methods = [
    {
        id: "1",
        type: "Credit card",
    },
    {
        id: "2",
        type: "Cash on  Payment",
    },
];

export default function PaymentMethod() {
    const navigation = useNavigation();

    const [selectMethod, setSelectMethod] = useState("1");

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
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            borderWidth: 1,
                            borderRadius: 25,
                            backgroundColor: "#FBF8F2",
                            borderColor: COLORS.goldenTransparent_04,
                            marginBottom: 10,
                            alignItems: "center",
                            flexDirection: "row",
                            paddingHorizontal: 25,
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.gray,
                            }}
                        >
                            Visa **********250
                        </Text>
                    </View>
                    {methods.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: "100%",
                                    height: 50,
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    backgroundColor: "#FBF8F2",
                                    borderColor: COLORS.goldenTransparent_04,
                                    marginBottom: 10,
                                    alignItems: "center",
                                    flexDirection: "row",
                                    paddingHorizontal: 25,
                                    justifyContent: "space-between",
                                }}
                                onPress={() => setSelectMethod(item.id)}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 14,
                                            height: 14,
                                            borderWidth: 1,
                                            borderRadius: 7,
                                            borderColor:
                                                COLORS.goldenTransparent_04,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {item.id === selectMethod && (
                                            <View
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    backgroundColor:
                                                        COLORS.golden,
                                                    borderRadius: 4,
                                                }}
                                            />
                                        )}
                                    </View>
                                    <Text
                                        style={{
                                            ...FONTS.Mulish_600SemiBold,
                                            fontSize: 16,
                                            marginLeft: 12,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {item.type}
                                    </Text>
                                </View>
                                {item.id === "1" && <ArrowSix />}
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 50,
                            borderWidth: 1,
                            borderRadius: 25,
                            backgroundColor: "#FBF8F2",
                            borderColor: COLORS.goldenTransparent_04,
                            marginBottom: 10,
                            alignItems: "center",
                            flexDirection: "row",
                            paddingHorizontal: 25,
                            justifyContent: "space-between",
                        }}
                        onPress={() => navigation.navigate("NewCard")}
                    >
                        <AddSvg />
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.black,
                                flex: 1,
                                marginLeft: 12,
                            }}
                        >
                            Add a new card
                        </Text>
                        <ArrowSix />
                    </TouchableOpacity>
                    <Button
                        title="SUBMIT"
                        containerStyle={{ marginTop: 15 }}
                        onPress={() => navigation.navigate("MainLayout")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Payment Method"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
