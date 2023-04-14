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
import { AREA, COLORS, FONTS, productColors } from "../constants";

export default function SelectColor() {
    const navigation = useNavigation();
    const [selectColor, setSelectColor] = useState("#FE2121");

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
                        Color
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 35,
                        }}
                    >
                        {productColors.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: 40,
                                        height: 40,
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
            <Header title="Select Color" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
