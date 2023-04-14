import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { Header, ContainerComponent, InputField, Button } from "../components";
import { AREA, promocodes, COLORS, FONTS } from "../constants";
import { Copy, Discount } from "../svg";

export default function MyPromocodes() {
    const navigation = useNavigation();

    function renderPromocodesEmpty() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                showsHorizontalScrollIndicator={false}
            >
                <ContainerComponent>
                    <View style={{ alignSelf: "center", marginBottom: 35 }}>
                        <Discount />
                    </View>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.H2,
                            textTransform: "capitalize",
                            color: COLORS.black,
                            lineHeight: 22 * 1.2,
                            marginBottom: 18,
                        }}
                    >
                        Your don’t have {"\n"} promocodes yet!
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                            paddingHorizontal: 50,
                            marginBottom: 30,
                        }}
                    >
                        Looks like you haven't made your order yet.
                    </Text>
                    <InputField
                        placeholder="Enter the voucher"
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <Button
                        title="Submit"
                        onPress={() => navigation.navigate("MainLayout")}
                    />
                </ContainerComponent>
            </ScrollView>
        );
    }

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
                {promocodes.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{
                                width: "100%",
                                height: 97,
                                backgroundColor: COLORS.white,
                                marginBottom: 15,
                                borderRadius: 10,
                                paddingHorizontal: 20,
                                paddingVertical: 18,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                showMessage({
                                    message: `${item.name} has been copied`,
                                    type: "info",
                                });
                            }}
                        >
                            <Image
                                source={item.icon_195x195}
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 35,
                                }}
                            />
                            <View style={{ marginLeft: 15, flex: 1 }}>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 16,
                                        color: COLORS.black,
                                        lineHeight: 16 * 1.2,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 14,
                                        color: COLORS.black,
                                        lineHeight: 14 * 1.2,
                                        color: item.color,
                                        marginVertical: 4,
                                    }}
                                >
                                    {item.discount}
                                </Text>
                                <Text
                                    style={{
                                        color: COLORS.gray,
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                    }}
                                >
                                    {item.valid}
                                </Text>
                            </View>
                            <Copy />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="My Promocodes" onPress={() => navigation.goBack()} />
            {promocodes.length ? renderContent() : renderPromocodesEmpty()}
        </SafeAreaView>
    );
}
