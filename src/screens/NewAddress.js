import { SafeAreaView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA } from "../constants";

export default function NewAddress() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                }}
                showsHorizontalScrollIndicator={false}
            >
                <ContainerComponent>
                    <InputField
                        placeholder="Enter an address"
                        containerStyle={{ marginBottom: 25 }}
                    />
                    <Button
                        title="Confirm"
                        onPress={() => navigation.navigate("MyAddress")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="Add A New Address"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </SafeAreaView>
    );
}
