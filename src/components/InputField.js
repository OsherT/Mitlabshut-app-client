import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

import { COLORS } from "../constants";

export default function InputField({ placeholder, containerStyle, icon,onChangeText }) {
    function handleChange(text) {
        setText(text);
      }

    return (
        <View
            style={{
                width: "100%",
                height: 50,
                borderWidth: 1,
                borderRadius: 25,
                paddingHorizontal: 25,
                borderColor: COLORS.goldenTransparent_03,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                ...containerStyle,
                backgroundColor: "#FBF8F2",
            }}
        >
            <TextInput
                placeholder={placeholder}
                style={{ flex: 1, paddingRight: 15 ,textAlign:"right"}}
                onChangeText={onChangeText}
            />
            {icon && icon}
        </View>
    );
}
