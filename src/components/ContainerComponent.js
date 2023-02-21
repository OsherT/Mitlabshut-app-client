import { View, Text } from "react-native";
import React from "react";

import { COLORS } from "../constants";

export default function ContainerComponent({ children, containerStyle }) {
    return (
        <View
            style={{
                width: "100%",
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
                paddingVertical: 35,
                borderRadius: 10,
                ...containerStyle,
            }}
        >
            {children}
        </View>
    );
}
