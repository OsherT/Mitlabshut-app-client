import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent, Button } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { ArrowFour } from "../svg";

export default function Checkout() {
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
                <ContainerComponent>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderWidth: 1,
                            paddingVertical: 13,
                            paddingHorizontal: 22,
                            borderRadius: 50,
                            borderColor: COLORS.goldenTransparent_04,
                            marginBottom: 10,
                            backgroundColor: "#FBF8F2",
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 18,
                                textTransform: "capitalize",
                                color: COLORS.black,
                                lineHeight: 18 * 1.2,
                            }}
                        >
                            My order
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 18,
                                textTransform: "capitalize",
                                color: COLORS.black,
                                lineHeight: 18 * 1.2,
                            }}
                        >
                            $41.69
                        </Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            paddingVertical: 13,
                            paddingHorizontal: 22,
                            borderRadius: 25,
                            borderColor: COLORS.goldenTransparent_04,
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                Shoulder bag...
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                1 x $30.00
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                Summer dress...
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                1 x $15.98
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                Discount
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                -4.29
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                Delivery
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                    color: COLORS.green,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.7,
                                }}
                            >
                                Free
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderWidth: 1,
                            paddingVertical: 13,
                            paddingHorizontal: 22,
                            borderRadius: 50,
                            borderColor: COLORS.goldenTransparent_04,
                            marginBottom: 10,
                            backgroundColor: "#FBF8F2",
                        }}
                        onPress={() => navigation.navigate("ShippingDetails")}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_400Regular,
                                fontSize: 14,
                                color: COLORS.gray,
                                textTransform: "capitalize",
                                lineHeight: 14 * 1.7,
                            }}
                        >
                            Shipping Details
                        </Text>
                        <ArrowFour />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderWidth: 1,
                            paddingVertical: 13,
                            paddingHorizontal: 22,
                            borderRadius: 50,
                            borderColor: COLORS.goldenTransparent_04,
                            marginBottom: 35,
                            backgroundColor: "#FBF8F2",
                        }}
                        onPress={() =>
                            navigation.navigate("PaymentMethodCheckout")
                        }
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_400Regular,
                                fontSize: 14,
                                color: COLORS.gray,
                                textTransform: "capitalize",
                                lineHeight: 14 * 1.7,
                            }}
                        >
                            Payment Method
                        </Text>
                        <ArrowFour />
                    </TouchableOpacity>
                    <Button
                        title="Confirm order"
                        onPress={() => navigation.navigate("OrderSuccessful")}
                    />
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Checkout" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
