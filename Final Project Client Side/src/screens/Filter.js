import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent, Button } from "../components";
import {
    AREA,
    COLORS,
    FONTS,
    productSizes,
    productColors,
    tags,
} from "../constants";

export default function Filter() {
    const navigation = useNavigation();

    const [size, setSize] = useState("S");
    const [selectColor, setSelectColor] = useState("#FE2121");
    const [productTag, setProductTag] = useState(1);

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
                            marginBottom: 25,
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
                    <Text
                        style={{
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 16,
                            marginBottom: 14,
                            color: COLORS.black,
                        }}
                    >
                        Color
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 25,
                        }}
                    >
                        {productColors.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: 34,
                                        height: 34,
                                        backgroundColor: item.color,
                                        borderRadius: 20,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 14,
                                        borderWidth:
                                            selectColor === item.color ? 4 : 0,
                                        borderColor:
                                            COLORS.goldenTransparent_05,
                                    }}
                                    onPress={() => setSelectColor(item.color)}
                                ></TouchableOpacity>
                            );
                        })}
                    </View>
                    <Text
                        style={{
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 16,
                            marginBottom: 14,
                            color: COLORS.black,
                        }}
                    >
                        Price
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 25,
                        }}
                    >
                        <Text
                            style={{
                                marginRight: 8,
                                ...FONTS.Mulish_400Regular,
                                fontSize: 14,
                                color: COLORS.black,
                            }}
                        >
                            Min:
                        </Text>
                        <View
                            style={{
                                width: 90,
                                height: 30,
                                borderRadius: 15,
                                borderColor: COLORS.goldenTransparent_05,
                                borderWidth: 1,
                                marginRight: 20,
                            }}
                        >
                            <TextInput
                                placeholder="$1500"
                                textAlign={"center"}
                            />
                        </View>

                        <Text
                            style={{
                                marginRight: 8,
                                ...FONTS.Mulish_400Regular,
                                fontSize: 14,
                                color: COLORS.black,
                            }}
                        >
                            Max:
                        </Text>
                        <View
                            style={{
                                width: 90,
                                height: 30,
                                borderRadius: 15,
                                borderColor: COLORS.goldenTransparent_05,
                                borderWidth: 1,
                                marginRight: 20,
                            }}
                        >
                            <TextInput
                                placeholder="$1500"
                                textAlign={"center"}
                            />
                        </View>
                    </View>
                    <Text
                        style={{
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 16,
                            marginBottom: 14,
                            color: COLORS.black,
                        }}
                    >
                        Tags
                    </Text>
                    <View
                        style={{
                            marginBottom: 20,
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        {tags.map((item, index) => (
                            <TouchableOpacity
                                style={{
                                    marginBottom: 8,
                                    marginRight: 8,
                                    borderRadius: 50,
                                    borderColor:
                                        productTag == index
                                            ? COLORS.golden
                                            : COLORS.goldenTransparent_05,
                                    borderWidth: 1,
                                    backgroundColor:
                                        productTag == index
                                            ? COLORS.golden
                                            : COLORS.transparent,
                                }}
                                key={item.id}
                                onPress={() => setProductTag(index)}
                            >
                                <Text
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 6,
                                        textTransform: "uppercase",
                                        fontSize: 12,
                                        ...FONTS.Mulish_600SemiBold,
                                        color:
                                            productTag == index
                                                ? COLORS.white
                                                : COLORS.black,
                                    }}
                                >
                                    {item.tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Button
                        title="apply filters"
                        onPress={() => navigation.navigate("MainLayout")}
                    />
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Filter" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
