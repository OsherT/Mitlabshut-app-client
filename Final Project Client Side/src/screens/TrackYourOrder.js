import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";

const orderStatus = [
    {
        id: "1",
        status: "Order Created",
        isDone: true,
    },
    {
        id: "2",
        status: "Order Confirmed",
        isDone: true,
    },
    {
        id: "3",
        status: "Order Shipping",
        isDone: true,
    },
    {
        id: "4",
        status: "Courier Delivering",
        isDone: false,
    },
    {
        id: "5",
        status: "Receiving",
        isDone: false,
    },
];

export default function TrackYourOrder() {
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
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_700Bold,
                            color: COLORS.black,
                            fontSize: 20,
                            textTransform: "capitalize",
                            lineHeight: 20 * 1.2,
                            marginBottom: 4,
                        }}
                    >
                        Your order:
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            lineHeight: 16 * 1.7,
                            color: COLORS.gray,
                            marginBottom: 30,
                        }}
                    >
                        #100345
                    </Text>
                    {orderStatus.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: "100%",
                                    height: 50,
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    backgroundColor: "#FBF8F2",
                                    borderColor: COLORS.goldenTransparent_04,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 25,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                        color: COLORS.gray,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.status}
                                </Text>
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        borderColor:
                                            COLORS.goldenTransparent_05,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {item.isDone && (
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
                            </View>
                        );
                    })}
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Track Your Order"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
