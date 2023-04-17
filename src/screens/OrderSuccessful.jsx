import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Success } from "../svg";
import { userContext } from "../navigation/userContext";
import { useEffect } from "react";

export default function OrderSuccessful(props) {
  const navigation = useNavigation();
  const message = props.route.params.message;
  const { setSelectedTab, loggedUser } = useContext(userContext);

  useEffect(() => {
    console.log("loggedUser", loggedUser);
  }, []);

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
            {message}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MainLayout");
            }}>
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
