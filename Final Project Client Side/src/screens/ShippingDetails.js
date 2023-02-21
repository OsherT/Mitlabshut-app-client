import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent, InputField } from "../components";
import { AREA, adress, COLORS, FONTS } from "../constants";

export default function ShippingDetails() {
    const navigation = useNavigation();
    const [location, setLocation] = useState("1");

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
                    {adress.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    height: 50,
                                    width: "100%",
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    marginBottom: 10,
                                    borderColor: COLORS.goldenTransparent_04,
                                    alignItems: "center",
                                    paddingHorizontal: 25,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                                onPress={() => setLocation(item.id)}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                        color: COLORS.gray,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.location}
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
                                    {location === item.id && (
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
                    <InputField placeholder="Enter an address" />
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Shipping Details"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
