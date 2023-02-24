import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { TextInput } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import axios from "axios";

export default function UploadItem() {
  const difPic =
    "https://images.squarespace-cdn.com/content/v1/5beb55599d5abb5a47cc4907/1610465905997-2G8SGHXIYCGTF9BQB0OD/female+girl+woman+icon.jpg?format=500w";
  const navigation = useNavigation();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState([]);
  const [itemType, setItemType] = useState([]);
  const [itemSize, setItemSize] = useState([]);
  const [itemCondition, setItemCondition] = useState("");
  const [itemColor, setItemColor] = useState([]);
  const [itemDeliveryMethod, setItemDeliveryMethod] = useState("");
  const [itemBrand, setItemBrand] = useState([]);
  const [itemImage, setItemImage] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const DeliveryMethod = [
    { key: "1", value: "איסוף עצמי" },
    { key: "2", value: "משלוח" },
  ];

  const ItemCondition = [
    { key: "1", value: "חדש עם אטיקט  " },
    { key: "2", value: "חדש ללא אטיקט  " },
    { key: "3", value: "כמו חדש" },
    { key: "4", value: "נלבש מספר פעמים" },
  ];

  useEffect(
    () =>
      //Get Values from database
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          // Store Values in Temporary Array
          let newArray = response.data.map((item) => {
            return { key: item.id, value: item.name };
          });
          //Set Data Variable
          setData(newArray);
        })
        .catch((e) => {
          console.log(e);
        }),
    []
  );

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
              placeholder="מחיר"
              keyboardType="phone-pad"
              onChangeText={(text) => setItemPrice(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="שם פריט"
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setItemName(text)}
            />
          </View>

          <TextInput
            style={styles.dropdownInput}
            placeholder="קטגוריה"
            containerStyle={{ marginBottom: 10 }}
          />

          <TextInput
            style={styles.dropdownInput}
            placeholder="סוג פריט"
            containerStyle={{ marginBottom: 10 }}
          />

          <TextInput
            style={styles.dropdownInput}
            placeholder="מידה"
            containerStyle={{ marginBottom: 10 }}
          />

          <MultipleSelectList
            placeholder=" מצב פריט"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCondition(val)}
            data={ItemCondition}
            notFoundText="לא קיים מידע"
          />
          <TextInput
            style={styles.dropdownInput}
            placeholder="צבע"
            containerStyle={{ marginBottom: 10 }}
          />

          <TextInput
            style={styles.dropdownInput}
            placeholder="מותג"
            containerStyle={{ marginBottom: 10 }}
          />

          <MultipleSelectList
            placeholder="שיטת מסירה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemDeliveryMethod(val)}
            data={DeliveryMethod}
            notFoundText="לא קיים מידע"
          />
          <TextInput
            style={styles.dropdownInput}
            placeholder=" הוספת תמונה"
            containerStyle={{ marginBottom: 10 }}
          />
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

  dropdownInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FBF8F2",
    marginBottom: 30,
    textAlign: "right",
  },
  dropdownContainer: {
    backgroundColor: "#FBF8F2",
    borderColor: COLORS.goldenTransparent_03,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
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
