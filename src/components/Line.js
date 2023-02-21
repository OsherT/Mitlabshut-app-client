import { View, Text } from "react-native";
import React from "react";

export default function Line({ lineStyle }) {
    return (
        <View
            style={{
                width: "75%",
                height: 1,
                backgroundColor: "#E9E9E9",
                marginVertical: 6,
                ...lineStyle,
            }}
        />
    );
}
