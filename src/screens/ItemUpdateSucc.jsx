import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Success } from "../svg";

export default function ItemUpdateSucc() {
  const navigation = useNavigation();

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <View style={{ alignSelf: "center", marginBottom: 35 }}>
            <Success />
          </View>
          <Text
            style={{
              ...FONTS.H2,
              textAlign: "center",
              textTransform: "capitalize",
              lineHeight: 22 * 1.2,
              color: COLORS.black,
              marginBottom: 18,
            }}>
            השינויים בוצעו בהצלחה !
          </Text>
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_600SemiBold,
                fontSize: 16,
                textTransform: "uppercase",
              }}>
              אישור
            </Text>
          </TouchableOpacity>
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      {renderContent()}
    </SafeAreaView>
  );
}
