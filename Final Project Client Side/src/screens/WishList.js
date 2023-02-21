import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Line, RatingComponent } from "../components";
import { AREA, COLORS, FONTS, products } from "../constants";
import { BagSvg, FavoriteSvg } from "../svg";

export default function WishList() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 25,
                    paddingBottom: 40,
                }}
                showsHorizontalScrollIndicator={false}
            >
                {products.map((item, index) => {
                    return (
                        item.isFavorite === true && (
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
                                        paddingHorizontal: 15,
                                        paddingVertical: 9,
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.Mulish_600SemiBold,
                                            fontSize: 14,
                                            textTransform: "capitalize",
                                            marginBottom: 6,
                                            lineHeight: 14 * 1.2,
                                        }}
                                    >
                                        {item.name}
                                    </Text>

                                    <Text style={{ color: COLORS.gray }}>
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
                                        right: 15,
                                        top: 9,
                                    }}
                                >
                                    <FavoriteSvg />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        right: 15,
                                        bottom: 9,
                                    }}
                                >
                                    <BagSvg />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Wish List" goBack={false} />
            {renderContent()}
        </SafeAreaView>
    );
}
