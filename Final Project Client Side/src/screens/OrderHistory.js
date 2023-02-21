import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components";
import { AREA, COLORS, FONTS, orderHistory } from "../constants";
import { ShippedSvg, DeliveredSvg, CanceledSvg } from "../svg";

export default function OrderHistory() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                }}
                showsHorizontalScrollIndicator={false}
            >
                {orderHistory.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                width: "100%",
                                height: 88,
                                backgroundColor: COLORS.white,
                                marginBottom: 10,
                                borderRadius: 10,
                                padding: 20,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ marginRight: 15 }}>
                                {item.status === "Shipped" ? (
                                    <ShippedSvg />
                                ) : item.status === "Delivered" ? (
                                    <DeliveredSvg />
                                ) : item.status === "Canceled" ? (
                                    <CanceledSvg />
                                ) : null}
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_700Bold,
                                        fontSize: 16,
                                        marginBottom: 4,
                                        color: COLORS.black,
                                    }}
                                >
                                    #{item.number}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}
                                >
                                    {item.productsInfo}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 90,
                                    height: 32,
                                    backgroundColor: COLORS.golden,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 16,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                    }}
                                >
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Order History" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
