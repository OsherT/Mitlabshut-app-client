import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Star } from "../svg";
import { COLORS, FONTS } from "../constants";

export default function RatingComponent({ item, containerStyle, onPress }) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.white,
                paddingHorizontal: 6,
                paddingVertical: 3,
                position: "absolute",
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Star />
            <Text
                style={{
                    paddingLeft: 3,
                    ...FONTS.Mulish_400Regular,
                    fontSize: 10,
                    color: COLORS.black,
                }}
            >
                {item.rating}
            </Text>
        </TouchableOpacity>
    );
}
