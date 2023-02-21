import { View, Text, ScrollView, SafeAreaView, StatusBar } from "react-native";
import React from "react";

import { AREA, FONTS, COLORS } from "../constants";
import { Header, ContainerComponent, Button } from "../components";
import { Empty } from "../svg";

export default function CartIsEmpty() {
    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 25,
                }}
                showsHorizontalScrollIndicator={false}
            >
                <ContainerComponent>
                    <View style={{ alignSelf: "center", marginBottom: 35 }}>
                        <Empty />
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
                        Your cart is empty!
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
                    <Button title="shop now" />
                </ContainerComponent>
            </ScrollView>
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
            <Header title="Order" goBack={false} />
            {renderContent()}
        </SafeAreaView>
    );
}
