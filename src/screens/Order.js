import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
    Header,
    ContainerComponent,
    RatingComponent,
    Button,
} from "../components";
import { AREA, COLORS, FONTS, SIZES, products } from "../constants";
import { Plus, Minus, Check } from "../svg";

export default function Order() {
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
                {products.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: COLORS.white,
                                marginBottom: 15,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                flexDirection: "row",
                            }}
                        >
                            <ImageBackground
                                source={item.photo_300x300}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <RatingComponent
                                    item={item}
                                    containerStyle={{
                                        bottom: 2,
                                        left: 2,
                                        borderBottomLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                />
                            </ImageBackground>
                            <View
                                style={{
                                    paddingVertical: 9,
                                    paddingHorizontal: 15,
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 14,
                                        color: COLORS.black,
                                        lineHeight: 14 * 1.2,
                                        marginBottom: 6,
                                        textTransform: "capitalize",
                                    }}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 12,
                                        color: COLORS.gray,
                                    }}
                                >
                                    Size: {item.size}
                                </Text>
                                <View
                                    style={{
                                        height: 1,
                                        width: SIZES.width * 0.45,
                                        backgroundColor: "#E9E9E9",
                                        marginVertical: 10,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 14,
                                        color: COLORS.carrot,
                                    }}
                                >
                                    ${item.price}
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingVertical: 9,
                                    paddingRight: 15,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity>
                                    <Plus />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                        color: COLORS.gray,
                                    }}
                                >
                                    5
                                </Text>
                                <TouchableOpacity>
                                    <Minus />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        alignSelf: "flex-start",
                        paddingHorizontal: 18,
                        paddingVertical: 3,
                        borderRadius: 40,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 25,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            textTransform: "capitalize",
                            lineHeight: 16 * 1.7,
                            color: COLORS.black,
                            paddingRight: 10,
                        }}
                    >
                        Promocode applied
                    </Text>
                    <Check color={COLORS.green} />
                </TouchableOpacity>
                <ContainerComponent>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            Subtotal
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            $45.98
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.gray,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            Discount
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 16,
                                color: COLORS.gray,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            -4.29
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 18,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            Total
                        </Text>
                        <Text
                            style={{
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 18,
                                color: COLORS.black,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                            }}
                        >
                            $41.69
                        </Text>
                    </View>
                    <Button
                        title="Checkout"
                        containerStyle={{ marginTop: 35 }}
                        onPress={() => navigation.navigate("Checkout")}
                    />
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Shoping Card" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
