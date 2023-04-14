import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { onboarding, SIZES, FONTS, COLORS } from "../constants";
import { Button } from "../components";
import { Arrow } from "../svg";

export default function OnBoarding() {
    const navigation = useNavigation();

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    function updateCurrentSlideIndex(e) {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SIZES.width);
        setCurrentSlideIndex(currentIndex);
    }

    function renderDots() {
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                {onboarding.map((_, index) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentSlideIndex == index && {
                                    width: 24,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: 7,
                    alignSelf: "center",
                }}
            >
                {renderDots()}
            </View>
            <FlatList
                data={onboarding}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                renderItem={({ item, index }) => {
                    return (
                        <ImageBackground
                            style={{
                                width: SIZES.width,
                                height: SIZES.height,
                                flex: 1,
                                paddingHorizontal: 30,
                            }}
                            source={item.image}
                        >
                            <View style={{ flex: 1 }} />
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "flex-end",
                                    justifyContent: "space-between",
                                    marginBottom: 30,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.Mulish_700Bold,
                                        fontSize: 32,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.title}
                                </Text>
                                {index !== onboarding.length - 1 && (
                                    <View style={{ marginBottom: 12 }}>
                                        <Arrow />
                                    </View>
                                )}
                            </View>

                            <Button
                                title="Get Started"
                                containerStyle={{ marginBottom: 70 }}
                                onPress={() => navigation.navigate("SignIn")}
                            />
                        </ImageBackground>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 5,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: COLORS.white,
        marginBottom: 25,
    },
});
