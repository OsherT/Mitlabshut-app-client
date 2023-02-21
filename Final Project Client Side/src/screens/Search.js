import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components";
import { COLORS, products, FONTS } from "../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../svg";

export default function Search() {
    const navigation = useNavigation();

    function renderSearch() {
        return (
            <View
                style={{
                    paddingHorizontal: 20,
                    marginTop: 10,
                    marginBottom: 20,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 44,
                        backgroundColor: COLORS.white,
                        borderRadius: 5,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                        <SearchSvg />
                    </View>
                    <TextInput
                        placeholder="Search for a clothe..."
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                        }}
                        onPress={() => navigation.navigate("Filter")}
                    >
                        <FilterSvg />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderContent() {
        return (
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 50,
                }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            width: "47.5%",
                            marginBottom: 15,
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                        }}
                        onPress={() =>
                            navigation.navigate("ProductDetails", {
                                productDetails: item,
                                productSlides: item.slides,
                            })
                        }
                    >
                        <ImageBackground
                            source={item.photo_480x384}
                            style={{
                                width: "100%",
                                height: 128,
                            }}
                            imageStyle={{ borderRadius: 10 }}
                        >
                            <TouchableOpacity style={{ left: 12, top: 12 }}>
                                <HeartSvg />
                            </TouchableOpacity>
                        </ImageBackground>
                        <View
                            style={{
                                paddingHorizontal: 12,
                                paddingBottom: 15,
                                paddingTop: 12,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Mulish_600SemiBold,
                                    fontSize: 14,
                                    textTransform: "capitalize",
                                    lineHeight: 14 * 1.2,
                                    color: COLORS.black,
                                    marginBottom: 6,
                                }}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.gray,
                                    ...FONTS.Mulish_400Regular,
                                    fontSize: 14,
                                }}
                            >
                                Size: {item.size}
                            </Text>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: "#E9E9E9",
                                    width: "75%",
                                    marginVertical: 7,
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.Mulish_600SemiBold,
                                    fontSize: 14,
                                    color: COLORS.carrot,
                                }}
                            >
                                {item.price}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                right: 12,
                                bottom: 12,
                            }}
                        >
                            <BagSvg />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
        >
            <Header title="Search" goBack={false} />
            {renderSearch()}
            {renderContent()}
        </SafeAreaView>
    );
}
