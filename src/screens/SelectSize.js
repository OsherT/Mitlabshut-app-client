import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS, productSizes } from "../constants";

export default function SelectSize() {
    const [size, setSize] = useState("S");
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
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 16,
                            marginBottom: 14,
                            color: COLORS.black,
                        }}
                    >
                        Size
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 35,
                        }}
                    >
                        {productSizes.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        borderColor:
                                            size == item.size
                                                ? COLORS.golden
                                                : COLORS.goldenTransparent_05,

                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 11,
                                        backgroundColor:
                                            size === item.size
                                                ? COLORS.golden
                                                : COLORS.white,
                                    }}
                                    onPress={() => setSize(item.size)}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.Mulish_600SemiBold,
                                            fontSize: 12,
                                            color:
                                                size === item.size
                                                    ? COLORS.white
                                                    : COLORS.black,
                                        }}
                                    >
                                        {item.size}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <Button
                        title="Submit"
                        onPress={() => navigation.goBack()}
                    />
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Select Size" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
