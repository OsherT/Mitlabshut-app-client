import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { FONTS, COLORS } from "../constants";
import { ArrowTwo, Bag, BagSvg, HeartTwoSvg } from "../svg";
import { useNavigation } from "@react-navigation/native";
import BagHeader from "../svg/BagHeader";

export default function Header({onPress, title, titleStyle }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
      }}>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 0,
          paddingHorizontal: 20,
        }}
        onPress={() => navigation.goBack()}>
        <ArrowTwo />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 370,
          top: 13,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          navigation.navigate("WishList");
        }}>
        <HeartTwoSvg strokeColor="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 345,
          top: 12,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          navigation.navigate("Order");
        }}>
        <BagHeader color="black"></BagHeader>
      </TouchableOpacity>
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
