import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { FONTS, COLORS } from "../constants";
import { ArrowTwo } from "../svg";
import { useNavigation } from "@react-navigation/native";

export default function Header({ goBack = true, onPress, title, titleStyle }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
      }}>
      {goBack && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 0,
            paddingHorizontal: 20,
          }}
          //   onPress={() => navigation.goBack()}>
          onPress={onPress}>
          <ArrowTwo />
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: 18,
          ...FONTS.Mulish_600SemiBold,
          color: COLORS.black,
          ...titleStyle,
        }}>
        {title}
      </Text>
    </View>
  );
}
