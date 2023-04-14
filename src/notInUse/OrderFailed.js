import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Fail } from "../svg";

export default function OrderSuccessful() {
    const navigation = useNavigation();

    function renderContent() {
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
                        <Fail />
                    </View>
                    <Text
                        style={{
                            ...FONTS.H2,
                            textAlign: "center",
                            textTransform: "capitalize",
                            lineHeight: 22 * 1.2,
                            color: COLORS.black,
                            marginBottom: 18,
                        }}
                    >
                        Sorry! {"\n"} Your order has failed!
                    </Text>
                    <Text
                        style={{
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                            textAlign: "center",
                            lineHeight: 16 * 1.7,
                            marginBottom: 30,
                            paddingHorizontal: 30,
                        }}
                    >
                        Something went wrong. Please try again to contimue your
                        order.
                    </Text>
                    <Button
                        title="try again"
                        containerStyle={{ marginBottom: 23 }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MainLayout")}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                ...FONTS.Mulish_600SemiBold,
                                fontSize: 14,
                                textTransform: "uppercase",
                            }}
                        >
                            go to my profile
                        </Text>
                    </TouchableOpacity>
                </ContainerComponent>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            {renderContent()}
        </SafeAreaView>
    );
}
