import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";

export default function UploadModal({ uploading, message }) {
  return (
    <Modal transparent visible={uploading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}>
          <ActivityIndicator size="large" color="black" />
          <Text
            style={{
              textAlign: "center",
              color: COLORS.black,
              fontSize: 16,
              padding: 20,
            }}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
