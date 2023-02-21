import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS, comments } from "../constants";

export default function Reviews() {
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
                    {comments.map((item, index, array) => {
                        let lastIndex = array.length - 1;
                        return (
                            <View
                                key={index}
                                style={{
                                    paddingBottom: index === lastIndex ? 0 : 26,
                                    marginBottom: index === lastIndex ? 0 : 20,
                                    borderBottomWidth:
                                        index === lastIndex ? 0 : 1,
                                    borderBottomColor:
                                        index === lastIndex
                                            ? COLORS.transparent
                                            : COLORS.goldenTransparent_05,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 15,
                                    }}
                                >
                                    <Image
                                        source={item.photo}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            marginRight: 14,
                                        }}
                                    />
                                    <View>
                                        <Text
                                            style={{
                                                ...FONTS.Mulish_600SemiBold,
                                                fontSize: 16,
                                                color: COLORS.black,
                                                marginBottom: 6,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <View>
                                            <Rating
                                                type="star"
                                                count={5}
                                                defaultRating={14}
                                                imageSize={12}
                                                readonly={true}
                                                startingValue={3}
                                                ratingBackgroundColor="Red"
                                                style={{
                                                    alignItems: "flex-start",
                                                    // paddingHorizontal: 10,
                                                }}
                                                starContainerStyle={{
                                                    paddingHorizontal: 10,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Mulish_400Regular,
                                        fontSize: 14,
                                        color: COLORS.gray,
                                        lineHeight: 14 * 1.5,
                                    }}
                                >
                                    {item.comment}
                                </Text>
                            </View>
                        );
                    })}
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Reviews" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
