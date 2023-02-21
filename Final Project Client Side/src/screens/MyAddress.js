import { View, SafeAreaView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA } from "../constants";
import { EditTwo } from "../svg";

const addresses = [
    {
        id: "1",
        location: "8000 S Kirkland Ave, Chicago...",
    },
    {
        id: "2",
        location: "8000 S Kirkland Ave, Chicago...",
    },
    {
        id: "3",
        location: "8000 S Kirkland Ave, Chicago...",
    },
];

export default function MyAddress() {
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
                    {addresses.map((item, index) => {
                        return (
                            <View key={index}>
                                <InputField
                                    placeholder={item.location}
                                    containerStyle={{ marginBottom: 10 }}
                                    icon={<EditTwo />}
                                />
                            </View>
                        );
                    })}
                    <Button
                        title="Add a new adDress"
                        containerStyle={{ marginTop: 15 }}
                        onPress={() => navigation.navigate("NewAddress")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="My address" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
