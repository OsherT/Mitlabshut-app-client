import Modal from "react-native-modal";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

export default function AlertModal({ showModal, setShowModal, message }) {
  return (
    <Modal
      isVisible={!!showModal}
      onBackdropPress={setShowModal}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      style={{ margin: 0 }}>
      <View
        style={{
          width: SIZES.width - 60,
          backgroundColor: COLORS.white,
          marginHorizontal: 30,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 34,
        }}>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.Mulish_600SemiBold,
            fontSize: 20,
            marginBottom: 26,
          }}>
          {message}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TouchableOpacity
            style={{
              width: 130,
              height: 40,
              backgroundColor: COLORS.golden,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 7.5,
            }}
            onPress={() => setShowModal(false)}>
            <Text
              style={{
                color: COLORS.red,
                ...FONTS.Mulish_600SemiBold,
                fontSize: 14,
                textTransform: "uppercase",
              }}>
              אישור
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
