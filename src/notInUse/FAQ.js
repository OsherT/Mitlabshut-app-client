import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Accordion from "react-native-collapsible/Accordion";

import { Header } from "../components";
import { AREA, SIZES, frequentlyQuestions, COLORS, FONTS } from "../constants";
import { QuestionCloseSvg, QuestionOpenSvg } from "../svg";

export default function FAQ() {
    const navigation = useNavigation();
    const [activeSections, setActiveSections] = useState([]);

    const setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderHeader = (section, _, isActive) => {
        return (
            <View
                duration={400}
                style={{
                    paddingVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        ...FONTS.Mulish_600SemiBold,
                        fontSize: 16,
                        color: COLORS.black,
                    }}
                >
                    {section.title}
                </Text>
                {isActive ? <QuestionOpenSvg /> : <QuestionCloseSvg />}
            </View>
        );
    };

    const renderContent = (section, _, isActive) => {
        return (
            <View
                style={{
                    marginHorizontal: 20,
                    paddingTop: 9,
                    paddingBottom: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#E8E8E8",
                }}
                transition="backgroundColor"
            >
                <Text
                    style={{
                        color: COLORS.gray,
                        ...FONTS.Roboto_400Regular,
                        fontSize: 15,
                        lineHeight: 15 * 1.5,
                    }}
                >
                    {section.content}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <Header
                title="FAQ"
                titleStyle={{ textTransform: "uppercase" }}
                onPress={() => navigation.goBack()}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Accordion
                    activeSections={activeSections}
                    sections={frequentlyQuestions}
                    touchableComponent={TouchableOpacity}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                    underlayColor={COLORS.black}
                    sectionContainerStyle={{
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
