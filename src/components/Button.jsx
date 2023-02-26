import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";

export default function Button({ title, containerStyle, onPress }) {
    return (
        <TouchableOpacity
            style={{
                height: 50,
                backgroundColor: COLORS.golden,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    textAlign: "center",
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 16,
                    textTransform: "uppercase",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
