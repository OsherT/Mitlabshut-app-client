import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { promo, SIZES, COLORS, products, FONTS } from "../constants";
import { RatingComponent, Line } from "../components";
import { BagSvg, HeartSvg } from "../svg";

export default function Home() {
    const navigation = useNavigation();

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    function updateCurrentSlideIndex(e) {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SIZES.width);
        setCurrentSlideIndex(currentIndex);
    }

    function renderDots() {
        return (
            <View>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    {promo.map((_, index) => {
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    currentSlideIndex == index && {
                                        width: 22,
                                    },
                                ]}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }

    function renderSlide() {
        return (
            <View
                style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    overflow: "hidden",
                }}
            >
                <FlatList
                    data={promo}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    renderItem={({ item, index, separators }) => (
                        <View
                            key={item.key}
                            style={{ width: SIZES.width, height: 356 }}
                        >
                            <ImageBackground
                                source={item.photo_1125x1068}
                                style={{ width: "100%", height: "100%" }}
                            ></ImageBackground>
                        </View>
                    )}
                />
            </View>
        );
    }

    function renderBestSellers() {
        return (
            <View style={{ marginBottom: 40 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        marginBottom: 16,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_700Bold,
                            fontSize: 20,
                            textTransform: "capitalize",
                            color: COLORS.black,
                            lineHeight: 20 * 1.2,
                        }}
                    >
                        Best sellers
                    </Text>
                </View>
                <FlatList
                    data={products}
                    horizontal={true}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                width: 266,
                                backgroundColor: COLORS.white,
                                marginRight: 15,
                                borderRadius: 10,
                            }}
                            onPress={() =>
                                navigation.navigate("ProductDetails", {
                                    productDetails: item,
                                    productSlides: item.slides,
                                })
                            }
                        >
                            <Image
                                source={item.photo_798x408}
                                style={{
                                    width: "100%",
                                    height: 136,
                                    borderRadius: 10,
                                }}
                            />
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 16,
                                        textTransform: "capitalize",
                                        color: COLORS.black,
                                        marginBottom: 5,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 12,
                                        lineHeight: 12 * 1.2,
                                        color: COLORS.gray,
                                    }}
                                >
                                    Size: {item.size}
                                </Text>
                                <View
                                    style={{
                                        width: "80%",
                                        height: 1,
                                        backgroundColor: "#E9E9E9",
                                        marginVertical: 7,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.Mulish_600SemiBold,
                                        fontSize: 14,
                                        color: COLORS.carrot,
                                        lineHeight: 14 * 1.2,
                                    }}
                                >
                                    {item.price}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingLeft: 20 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

    function renderFeaturedProducts() {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 16,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Mulish_700Bold,
                            fontSize: 20,
                            textTransform: "capitalize",
                            color: COLORS.black,
                            lineHeight: 20 * 1.2,
                        }}
                    >
                        Featured Products
                    </Text>
                </View>
                {products.map((item, index) => {
                    return (
                        item.featuredProducts === true && (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: "100%",
                                    height: 100,
                                    backgroundColor: COLORS.white,
                                    marginBottom: 15,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                }}
                                onPress={() =>
                                    navigation.navigate("ProductDetails", {
                                        productDetails: item,
                                        productSlides: item.slides,
                                    })
                                }
                            >
                                <ImageBackground
                                    source={item.photo_300x300}
                                    style={{
                                        width: 100,
                                        height: "100%",
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
                                        onPress={() =>
                                            navigation.navigate("Reviews")
                                        }
                                    />
                                </ImageBackground>
                                <View
                                    style={{
                                        paddingHorizontal: 15,
                                        paddingVertical: 11,
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.Mulish_600SemiBold,
                                            fontSize: 14,
                                            textTransform: "capitalize",
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
                                        {item.size}
                                    </Text>
                                    <Line />
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
                                        width: 30,
                                        height: 30,
                                        right: 15,
                                        bottom: 11,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={() => {
                                        showMessage({
                                            message: `${item.name} has been added`,
                                            type: "info",
                                        });
                                    }}
                                >
                                    <BagSvg />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        width: 30,
                                        height: 30,
                                        right: 15,
                                        top: 8,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <HeartSvg />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    );
                })}
            </View>
        );
    }

    return (
        <ScrollView
            style={{
                flexGrow: 1,
            }}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
        >
            {renderSlide()}
            {renderDots()}
            {renderBestSellers()}
            {renderFeaturedProducts()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        marginHorizontal: 5,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.black,
        marginTop: 20,
        marginBottom: 40,
    },
});
