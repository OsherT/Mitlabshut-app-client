import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { ArrowThree } from "../svg";
import { FONTS } from "../constants";

export default function ProfileCategory({
  icon,
  title,
  onPress,
  containerStyle,
  arrow = true,
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          marginLeft: 15,
          flex: 1,
          ...FONTS.Mulish_600SemiBold,
          fontSize: 16,
          textAlign: "right",
          paddingRight:10
        }}>
        {title}
      </Text>
      {icon}

      {arrow && <ArrowThree />}
    </TouchableOpacity>
  );
}
