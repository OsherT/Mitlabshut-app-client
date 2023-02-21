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
import { Success } from "../svg";

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
                        <Success />
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
                        Successfully! {"\n"} Thank you for your order!
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
                        Your order will be delivered on time. ID # 123456
                    </Text>
                    <Button
                        title="View Order"
                        containerStyle={{ marginBottom: 23 }}
                        onPress={() => navigation.navigate("TrackYourOrder")}
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
                            Continue Shopping
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
