import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";

import { FONTS, COLORS } from "../constants";
import { ArrowTwo, BagSvg, HeartTwoSvg } from "../svg";
import { useNavigation } from "@react-navigation/native";
import BagHeader from "../svg/BagHeader";

export default function Header({ title, titleStyle, flag, onEdit }) {
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
        onPress={() => {
          if (onEdit) {
            Alert.alert("השינויים לא ישמרו", "האם את בטוחה שברצונך לחזור?", [
              {
                text: "אישור",
                onPress: () => navigation.goBack(),
              },
              {
                text: "ביטול",
                style: "cancel",
              },
            ]);
          } else {
            navigation.goBack();
          }
        }}>
        <ArrowTwo />
      </TouchableOpacity>

      {!flag && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            top: 14,
          }}
          onPress={() => {
            navigation.navigate("WishList");
          }}>
          <HeartTwoSvg strokeColor="black" />
        </TouchableOpacity>
      )}

      {!flag && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 60,
            top: 12,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate("Order");
          }}>
          <BagHeader color="black"></BagHeader>
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
