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
import firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebaseConfig";

export default function UploadItem() {
  const navigation = useNavigation();
  const { loggedUser } = useContext(userContext);
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item`;

  //fireBase
  const storage = getStorage(app);

  //להחליף מה שיושב סתם במערך ל"""
  //the section of the item information hooks
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

  //the section of the lists hooks
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);
  const [typesList, setTypesList] = useState([]);

  // section of the local lists hooks
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

  useEffect(() => {
    GetBrandsList();
    GetCategoriesList();
    GetColorsList();
    GetSizesList();
    GetTypesList();
  }, []);

  ////////////////////////////////////////
  //gets all the data from the dataBase//
  ////////////////////////////////////////
  const GetBrandsList = () => {
    fetch(ApiUrl + "/GetBrand", {
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
    fetch(ApiUrl + "/GetCategory", {
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
    fetch(ApiUrl + "/GetColor", {
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
    fetch(ApiUrl + "/GetItem_size", {
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
    fetch(ApiUrl + "/GetItem_type", {
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

  //checks if the user inserts all the required info and uploads the item into the item table
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
      const item = {
        Closet_ID: loggedUser.closet_id,
        Name: itemName,
        Price: itemPrice,
        Type: itemType,
        Size: itemSize,
        Use_condition: itemCondition,
        Color: itemColor,
        Shipping_method: ArrayToStringShip(itemDeliveryMethod),
        Brand: itemBrand,
        Description: itemDescription,
        Sale_status: true,
      };

      //posts to item table
      fetch(ApiUrl + `/PostItem`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (item_ID) => {
            Alert.alert("Item added in succ");
            uploadImages(item_ID);
            uploadCtegories(item_ID);

            navigation.navigate("Closet");
          },
          (error) => {
            console.log("ERR in upload item ", error);
          }
        );
    }
  };

  ////////////////////////////////////////
  ///uploads the image to the fireBase////
  ////////////////////////////////////////

  // Get user's images folder reference

  // Get item's folder reference
  // const itemId = item.id;
  // const itemRef = ref(imagesRef, item_id);

  // Upload image to item's folder
  const uploadImageFB = async (uri) => {
    const userId = loggedUser.id;
    const imagesRef = ref(storage, `images/${userId}`);
    const itemId = userId;
    const itemRef = ref(imagesRef, itemId);

    const response = await fetch(uri);
    const blob = await response.blob();
    const imageName = `${new Date().getTime()}.jpg`; // generate unique image name
    const imageRef = ref(itemRef, imageName);

    if (typeof imageRef.child === "function" && typeof imageName === "string") {
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully:", imageUrl);
    } else {
      console.error("Invalid child path or image name:", itemRef, imageName);
    }
  };

  // Call the uploadImage function for each item image URI
  const itemImageList = ["uri1", "uri2", "uri3", "uri4", "uri5", "uri6"]; // replace with actual item image URIs
  for (let i = 0; i < itemImageList.length; i++) {
    uploadImageFB(itemImageList[i]);
  }

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true
    });

    if (!result.canceled) {
      let newImages = [...itemImage];
      newImages[index] = result.uri;
      setItemImage(newImages);

      await uploadImageFB(result.uri); // Upload the selected image to Firebase
    }
  };

  // open image picker and inserts the url into an array
  // const pickImage = async (index) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   let newImages = [...itemImage];
  //   newImages[index] = result.uri;
  //   setItemImage(newImages);
  // };

  //upload images to Item_Image_Video table
  const uploadImages = (item_id) => {
    for (let i = 0; i < itemImage.length; i++) {
      // item_Src: itemImage[i],
      const item_Src = "image";

      fetch(ApiUrl + `/PostItemImageVideo/ItemId/${item_id}/SRC/${item_Src}`, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            // console.log("suc in post imges= ", result);
          },
          (error) => {
            console.log("ERR in post imges", error);
          }
        );
    }
  };

  //converts the shipping method to string, shipping method in data base gets string only
  const ArrayToStringShip = (data) => {
    var string = "";
    for (let index = 0; index < data.length; index++) {
      string += data[index];
    }
    return string;
  };

  //uploads categories to Items_in_category table
  const uploadCtegories = (item_ID) => {
    for (let i = 0; i < itemCategory.length; i++) {
      fetch(
        ApiUrl +
          `/PostItemsInCategory/Item_ID/${item_ID}/Category_name/${itemCategory[i]}`,
        {
          method: "POST",
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        }
      )
        .then((res) => {
          return res;
        })
        .then(
          (result) => {},
          (error) => {
            console.log("ERR in post categories", error);
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text
              style={{ textAlign: "right", color: COLORS.grey3, left: 125 }}>
              מחיר :
            </Text>
            <Text
              style={{ textAlign: "right", color: COLORS.grey3, right: 15 }}>
              שם פריט :
            </Text>
          </View>
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

          <MultipleSelectList
            placeholder=" קטגוריה"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCategory(val)}
            data={categoriesList}
            notFoundText="לא קיים מידע"
            save="value"
            label="קטגוריה"
            badgeStyles={{ backgroundColor: "white" }}
            badgeTextStyles={{ color: "black" }}
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
            save="value"
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
            label="שיטת מסירה"
            maxHeight={200}
            badgeStyles={{ backgroundColor: "white" }}
            badgeTextStyles={{ color: "black" }}
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
