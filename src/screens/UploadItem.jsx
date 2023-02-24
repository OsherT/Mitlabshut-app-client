import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { TextInput } from "react-native";

export default function UploadItem() {
  const difPic =
    "https://images.squarespace-cdn.com/content/v1/5beb55599d5abb5a47cc4907/1610465905997-2G8SGHXIYCGTF9BQB0OD/female+girl+woman+icon.jpg?format=500w";
  const navigation = useNavigation();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemDeliveryMethod, setItemDeliveryMethod] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemDescription, setItemDescription] = useState("");


  function renderContent() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <Text style={styles.header}>פריט חדש</Text>


          <View style={styles.doubleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="שם פריט"
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setItemName(text)}
            />


            <TextInput
              style={styles.textInput}
              placeholder="קטגוריה"
              containerStyle={{ marginBottom: 10 }}
            />
          </View>

          <View style={styles.doubleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="מחיר"
              keyboardType="phone-pad"
              onChangeText={(text) => setUserPhone(text)}
            />

            <TextInput
              style={styles.textInput}
              placeholder="סוג פריט"
              containerStyle={{ marginBottom: 10 }}
            />
          </View>

          <View style={styles.doubleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="מידה"
              containerStyle={{ marginBottom: 10 }}
            />

            <TextInput
              style={styles.textInput}
              placeholder="מצב הפריט"
              containerStyle={{ marginBottom: 10 }}
            />

          </View>
          <View style={styles.doubleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="צבע"
              containerStyle={{ marginBottom: 10 }}
            />

            <TextInput
              style={styles.textInput}
              placeholder="מותג"
              containerStyle={{ marginBottom: 10 }}
            />
          </View>
          <View style={styles.doubleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder=" הוספת תמונה"
              containerStyle={{ marginBottom: 10 }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="שיטת מסירה"
              containerStyle={{ marginBottom: 10 }}
            />
          </View>

          <TextInput
            style={styles.bigInput}
            placeholder=" תיאור מפורט  "
            containerStyle={{ marginBottom: 10 }}
          />

          <Button title="הוספת פריט" />
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    ...FONTS.H1,
    color: COLORS.black,
    marginBottom: 30,
    lineHeight: 32 * 1.2,
    textTransform: "capitalize",
  },
  doubleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  textInput: {
    width: "49%",
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FBF8F2",
    textAlign: "right",
  },
  bigInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FBF8F2",
    textAlign: "right",
    marginBottom: 30,
  },
});
