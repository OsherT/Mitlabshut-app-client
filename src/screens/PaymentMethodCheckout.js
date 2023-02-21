import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Check } from "../svg";

const methods = [
    {
        id: "1",
        type: "Credit card",
    },
    {
        id: "2",
        type: "Apple Pay",
    },
    {
        id: "3",
        type: "Pay Pal",
    },
    {
        id: "4",
        type: "Cash",
    },
];

const cards = [
    {
        id: "1",
        number: "7741 ******** 6644",
    },
    {
        id: "2",
        number: "7741 ******** 4455",
    },
];

export default function PaymentMethodCheckout() {
    const navigation = useNavigation();

    const [selectMethod, setSelectMethod] = useState("1");
    const [selectCardNumber, setSelectCardNumber] = useState("1");

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
                    {methods.map((item, index) => {
                        return item.type === "Credit card" ? (
                            <View key={index}>
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        height: 50,
                                        borderWidth: 1,
                                        borderRadius: 25,
                                        backgroundColor: "#FBF8F2",
                                        borderColor:
                                            COLORS.goldenTransparent_04,
                                        marginBottom: 10,
                                        alignItems: "center",
                                        flexDirection: "row",
                                        paddingHorizontal: 25,
                                        justifyContent: "space-between",
                                    }}
                                    onPress={() => setSelectMethod(item.id)}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.Mulish_600SemiBold,
                                            fontSize: 18,
                                            color: COLORS.gray,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {item.type}
                                    </Text>
                                    <View
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderWidth: 2,
                                            borderColor:
                                                COLORS.goldenTransparent_05,
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {selectMethod === item.id && (
                                            <View
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    backgroundColor:
                                                        COLORS.golden,
                                                    borderRadius: 5,
                                                }}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                {cards.map((item, index, array) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                width: "100%",
                                                height: 50,
                                                borderWidth: 1,
                                                borderRadius: 25,
                                                borderColor:
                                                    COLORS.goldenTransparent_04,
                                                marginBottom:
                                                    array.length - 1 === index
                                                        ? 20
                                                        : 10,
                                                alignItems: "center",
                                                flexDirection: "row",
                                                paddingHorizontal: 25,
                                                justifyContent: "space-between",
                                            }}
                                            onPress={() =>
                                                setSelectCardNumber(item.id)
                                            }
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.Mulish_400Regular,
                                                    fontSize: 16,
                                                    color: COLORS.gray,
                                                }}
                                            >
                                                {item.number}
                                            </Text>
                                            {selectCardNumber === item.id && (
                                                <Check color={COLORS.green} />
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ) : (
                            <TouchableOpacity
                                key={item.id}
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
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 18,
                                        color: COLORS.gray,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.type}
                                </Text>
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderWidth: 2,
                                        borderColor:
                                            COLORS.goldenTransparent_05,
                                        borderRadius: 10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {selectMethod === item.id && (
                                        <View
                                            style={{
                                                width: 10,
                                                height: 10,
                                                backgroundColor: COLORS.golden,
                                                borderRadius: 5,
                                            }}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
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
