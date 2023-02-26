import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { TextInput } from "react-native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { AddSvg } from "../svg";
import * as ImagePicker from "expo-image-picker";
import { userContext } from "../navigation/userContext";

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
  const { loggedUser } = useContext(userContext);

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
        (data) => {
          setBrandsList(data.map((item) => item.brand_name));
        },
        (error) => {
          console.log("barnd error", error);
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
        (data) => {
          setCategoriesList(data.map((item) => item.category_name));
        },
        (error) => {
          console.log("category error", error);
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
        (data) => {
          setColorsList(data.map((item) => item.color_name));
        },
        (error) => {
          console.log("colors error", error);
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
        (data) => {
          setSizesList(data.map((item) => item.size_name));
        },
        (error) => {
          console.log("size error", error);
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
        (data) => {
          setTypesList(data.map((item) => item.item_type_name));
        },
        (error) => {
          console.log("type error", error);
        }
      );
  };

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let newImages = [...itemImage];
    newImages[index] = result.uri;
    setItemImage(newImages);
  };

  const UploadItem = () => {
    if (
      itemName == "" ||
      itemPrice == "" ||
      itemCategory == "" ||
      itemType == "" ||
      itemSize == "" ||
      itemCondition == "" ||
      itemColor == "" ||
      itemDeliveryMethod == "" ||
      itemBrand == "" ||
      itemDescription == "" ||
      itemImage == []
    ) {
      Alert.alert("אנא מלאי את כל הפרטים");
    } else {
      const newItem = {
        closetId: loggedUser.closet_id,
        itemName: itemName,
        itemPrice: itemPrice,
        // itemCategory: itemCategory,נשמר בטבלה מקשרת, לא לשלוח
        itemType: itemType,
        itemSize: itemSize,
        itemCondition: itemCondition,
        itemColor: itemColor,
        itemDeliveryMethod: itemDeliveryMethod,
        itemBrand: itemBrand,
        itemDescription: itemDescription,
        saleStatus: true,
      };
      const new_itemCategories = {
        itemCategory: itemCategory,
      };
      const new_itemImaged = {
        itemImage: itemImage,
      };

      console.log(newItem);
      console.log(new_itemCategories);
      console.log(new_itemImaged);

      fetch(ApiUrl + `Item`, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("status", res.status);
          return res.json();
        })
        .then(
          (user) => {
            console.log("user", user);
          },
          (error) => {
            console.log("ERR in logIn", error);
          }
        );
    }
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
          {/* <SelectList
            placeholder="  קטגוריה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCategory(val)}
            data={categoriesList}
            notFoundText="לא קיים מידע"
          /> */}

          <MultipleSelectList
            placeholder=" קטגוריה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCategory(val)}
            data={categoriesList}
            notFoundText="לא קיים מידע"
            // save="value"
            label="קטגוריה"
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

          {/* לשנות שיכניס את המילה ולא את המפתח */}
          <SelectList
            placeholder=" מצב פריט"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCondition(val)}
            data={conditionsList}
            notFoundText="לא קיים מידע"
          />

          {/* לשנות שיכניס את המילה ולא את המפתח */}
          <MultipleSelectList
            placeholder="שיטת מסירה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemDeliveryMethod(val)}
            data={deliveryMethodsList}
            notFoundText="לא קיים מידע"
            // save="value"
            label="שיטת מסירה"
            maxHeight={200}
          />

          <TextInput
            style={styles.bigInput}
            placeholder=" תיאור מפורט  "
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setItemDescription(text)}
          />

          <View>
            {itemImage.length < 3 && (
              <TouchableOpacity onPress={() => pickImage(itemImage.length)}>
                <View style={styles.picturBtn}>
                  <Text
                    style={{
                      color: "gray",
                      paddingTop: 10,
                      paddingBottom: 30,
                      textAlign: "center",
                    }}>
                    הוסיפי תמונות
                  </Text>
                  <AddSvg></AddSvg>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View>
            {itemImage.length > 0 && (
              <View style={styles.imageContainer}>
                {itemImage.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.Image}
                  />
                ))}
              </View>
            )}
          </View>

          <Button title="הוספת פריט" onPress={UploadItem} />
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
    // height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "row-reverse",
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
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bigInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    backgroundColor: "#FBF8F2",
    textAlign: "right",
    marginBottom: 30,
  },
  picturBtn: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBF8F2",
    marginBottom: 30,
    paddingTop: 30,
  },
  Image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 25,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    paddingHorizontal: 25,
    borderRadius: 25,

    borderColor: COLORS.goldenTransparent_03,
    backgroundColor: "#FBF8F2",
    textAlign: "right",
    marginBottom: 30,
    paddingTop: 13,
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "space-between",
  },
});
