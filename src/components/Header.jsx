import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { FONTS, COLORS } from "../constants";
import { ArrowTwo, HeartTwoSvg } from "../svg";
import { useNavigation } from "@react-navigation/native";
import BagHeader from "../svg/BagHeader";
import WarningModal from "./WarningModal";
import { userContext } from "../navigation/userContext";


//the header we have in all our pages
export default function Header({
  title,
  titleStyle,
  flag,
  onEdit,
  showModal,
  goBack,
  selectedTab,
}) {
  const navigation = useNavigation();
  const [showModal2, setShowModal] = useState(showModal);
  const { setSelectedTab } = useContext(userContext);

  const handleSure = () => {
    navigation.goBack();
  };

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
          onPress={() => {
            if (onEdit) {
              setShowModal(true); // set showModal2 to true
            } else {
              setSelectedTab(selectedTab);
            }
          }}>
          <ArrowTwo />
        </TouchableOpacity>
      )}

      {!flag && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            top: 14,
          }}
          onPress={() => {
            setSelectedTab("WishList");
          }}>
          <HeartTwoSvg strokeColor="black" />
        </TouchableOpacity>
      )}

      {!flag && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 40,
            top: 12,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            setSelectedTab("Order");
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

      {onEdit && (
        <WarningModal
          showModal={showModal2}
          setShowModal={setShowModal}
          handleSure={handleSure}
          massage={" השינויים לא ישמרו \n האם את בטוחה ?"}
        />
      )}
    </View>
  );
}
