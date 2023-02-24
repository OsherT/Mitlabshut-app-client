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
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import axios from "axios";

export default function UploadItem() {
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

  //lists  
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);
  const [typesList, setTypesList] = useState([]);

  const deliveryMethodsList = [
    { key: "1", value: "איסוף עצמי" },
    { key: "2", value: "משלוח" },
  ];

  const conditionsList = [
    { key: "1", value: "חדש עם אטיקט  " },
    { key: "2", value: "חדש ללא אטיקט  " },
    { key: "3", value: "כמו חדש" },
    { key: "4", value: "נלבש מספר פעמים" },
  ];

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  useEffect(() => {
    GetBrandsList();
    GetCategoriesList();
    GetColorsList();
    GetSizesList();
    GetTypesList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetBrandsList = () => {
    fetch(ApiUrl + "Item_brand", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setBrandsList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const GetCategoriesList = () => {
    fetch(ApiUrl + "Item_category", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setCategoriesList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const GetColorsList = () => {
    fetch(ApiUrl + "Item_color", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setColorsList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const GetSizesList = () => {
    fetch(ApiUrl + "Item_size", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setSizesList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const GetTypesList = () => {
    fetch(ApiUrl + "Item_type", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setTypesList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

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

          <SelectList
            placeholder="  קטגוריה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCategory(val)}
            data={categoriesList}
            notFoundText="לא קיים מידע"
          />

          <SelectList
            placeholder="  סוג פריט"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemType(val)}
            data={typesList}
            notFoundText="לא קיים מידע"
          />

          <SelectList
            placeholder="מידה "
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemSize(val)}
            data={sizesList}
            notFoundText="לא קיים מידע"
          />

          <SelectList
            placeholder="  צבע "
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemColor(val)}
            data={colorsList}
            notFoundText="לא קיים מידע"
          />

          <SelectList
            placeholder="  מותג "
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemBrand(val)}
            data={brandsList}
            notFoundText="לא קיים מידע"
          />

          <SelectList
            placeholder=" מצב פריט"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCondition(val)}
            data={conditionsList}
            notFoundText="לא קיים מידע"
          />

          <MultipleSelectList
            placeholder="שיטת מסירה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemDeliveryMethod(val)}
            data={deliveryMethodsList}
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
    width: "100%",

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
    width: "100%",
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
