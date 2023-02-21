import { SafeAreaView, Image } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA } from "../constants";
import { EditTwo } from "../svg";

export default function EditProfile() {
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
                    <Image
                        source={{
                            uri: "https://via.placeholder.com/240x240",
                        }}
                        style={{
                            width: 60,
                            height: 60,
                            alignSelf: "center",
                            borderRadius: 30,
                            marginBottom: 35,
                        }}
                    />
                    <InputField
                        placeholder="Kristin Watson"
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        placeholder="kristinwatson@mail.com"
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        placeholder="+17 123456789"
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 10 }}
                    />
                    <InputField
                        placeholder="Chicago, USA"
                        icon={<EditTwo />}
                        containerStyle={{ marginBottom: 20 }}
                    />
                    <Button
                        title="SAVE changes"
                        onPress={() => navigation.navigate("MainLayout")}
                    />
                </ContainerComponent>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
