import {
    View,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES } from "../constants";
import { Button } from "../components";
import { ArrowFive, BackSvg, HeartTwoSvg, RatingSvg } from "../svg";

export default function ProductDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { productDetails } = route.params;

    function renderSlide() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        zIndex: 1,
                        paddingHorizontal: 20,
                        marginTop: 40,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: SIZES.width,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackSvg />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <HeartTwoSvg />
                    </TouchableOpacity>
                </View>
                <ImageBackground
                    style={{ width: SIZES.width, height: "100%" }}
                    source={{ uri: "https://via.placeholder.com/375x523" }}
                ></ImageBackground>
            </View>
        );
    }

    function renderContent() {
        return (
            <View style={{ backgroundColor: "#EFEDE6" }}>
                {renderDots()}
                <View
                    style={{
                        width: SIZES.width,
                        height: 15,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        position: "absolute",
                        top: -15,
                        backgroundColor: COLORS.white,
                        zIndex: 9,
                        backgroundColor: "#EFEDE6",
                    }}
                />
                <View
                    style={{
                        paddingVertical: 30,
                        paddingTop: 10,
                        backgroundColor: "#EFEDE6",
                        width: "100%",
                        paddingHorizontal: 30,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_700Bold,
                            fontSize: 22,
                            textAlign: "center",
                            textTransform: "capitalize",
                            lineHeight: 22 * 1.2,
                            marginBottom: 9,
                            color: COLORS.black,
                        }}
                    >
                        {productDetails.name}
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 20,
                            color: COLORS.black,
                            marginBottom: 19,
                        }}
                    >
                        {productDetails.price}
                    </Text>
                    <View style={{ marginBottom: 25, alignSelf: "center" }}>
                        <RatingSvg />
                    </View>

                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.white,
                                borderRadius: 30,
                                width: 102,
                                height: 35,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => navigation.navigate("SelectSize")}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    marginRight: 8,
                                }}
                            >
                                Size
                            </Text>
                            <ArrowFive />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.white,
                                borderRadius: 30,
                                marginHorizontal: 10,
                                width: 102,
                                height: 35,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                            onPress={() => navigation.navigate("SelectColor")}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    marginRight: 8,
                                }}
                            >
                                COLOR
                            </Text>
                            <ArrowFive />
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="+ ADd to cart"
                        containerStyle={{ marginBottom: 13 }}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
            {renderSlide()}
            {renderContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 2,
        top: -50,
    },
});
