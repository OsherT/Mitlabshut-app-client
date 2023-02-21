import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Briefcase } from "../svg";

export default function AccountCreated() {
    const navigation = useNavigation();

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
                        <Briefcase />
                    </View>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.H2,
                            color: COLORS.black,
                            lineHeight: 22 * 1.2,
                            marginBottom: 14,
                            textTransform: "capitalize",
                        }}
                    >
                        Account Created!
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Mulish_400Regular,
                            fontSize: 16,
                            color: COLORS.gray,
                            paddingHorizontal: 20,
                            lineHeight: 16 * 1.7,
                            marginBottom: 30,
                        }}
                    >
                        Your account had beed created successfully.
                    </Text>
                    <Button
                        title="shop now"
                        onPress={() => navigation.navigate("MainLayout")}
                    />
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
