import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";

export default function ButtonLogIn({ title, containerStyle, onPress, icon }) {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        backgroundColor: COLORS.goldenTransparent_01,
        borderColor: COLORS.goldenTransparent_03,
        borderRadius: 25,
        borderWidth: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        ...containerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: COLORS.black,
          textAlign: "center",
          ...FONTS.Mulish_600SemiBold,
          fontSize: 16,
          textTransform: "uppercase",
          paddingHorizontal: 20,
        }}>
        {title}
      </Text>
      {icon && icon}
    </TouchableOpacity>
  );
}
