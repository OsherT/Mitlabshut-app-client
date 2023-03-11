import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";

export default function ButtonFollow({
  textColor,
  backgroundColor,
  title,
  containerStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        height: 40,
        width: 150,
        backgroundColor: backgroundColor,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: textColor,
          textAlign: "center",
          ...FONTS.Mulish_600SemiBold,
          fontSize: 16,
          textTransform: "uppercase",
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
