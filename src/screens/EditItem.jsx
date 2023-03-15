import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useIsFocused, useNavigation } from "@react-navigation/native";
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
import { colors } from "react-native-elements";
import { firebase } from "../../firebaseConfig";

export default function EditItem(props) {
  const item = props.route.params.item;
  const itemImages = props.route.params.itemImages;
  const isFocused = useIsFocused();

  //take only the category name and not the all object
  const itemCtegories = props.route.params.itemCtegories.map(
    (item) => item.category_name
  );

  const { loggedUser } = useContext(userContext);
  const navigation = useNavigation();
  const [itemName, setItemName] = useState(item.name);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemCategory, setItemCategory] = useState(itemCtegories);
  const [itemType, setItemType] = useState(item.type);
  const [itemSize, setItemSize] = useState(item.size);
  const [itemCondition, setItemCondition] = useState(item.use_condition);
  const [itemColor, setItemColor] = useState(item.color);
  const [itemBrand, setItemBrand] = useState(item.brand);
  // const [itemImage, setItemImage] = useState(itemImages);
  const [itemDescription, setItemDescription] = useState(item.description);
  const [itemDeliveryMethod, setItemDeliveryMethod] = useState(
    item.shipping_method
  );
  const [categoriesFlag, setCategoriesFlag] = useState(false);

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

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item`;

  useEffect(() => {
    if (isFocused) {
      GetBrandsList();
      GetColorsList();
      GetSizesList();
      GetTypesList();
      GetCategoriesList();
      console.log("item", item);
    }
  }, [isFocused]);

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

  const UpdateItem = () => {
    const updateItem = {
      id: item.id,
      closet_ID: loggedUser.closet_id,
      name: itemName,
      price: itemPrice,
      type: itemType,
      size: itemSize,
      use_condition: itemCondition,
      color: itemColor,
      shipping_method: ArrayToStringShip(itemDeliveryMethod),
      brand: itemBrand,
      description: itemDescription,
      sale_status: true,
    };

    //update the item's data
    fetch(ApiUrl + `/PutItem`, {
      method: "PUT",
      body: JSON.stringify(updateItem),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          navigation.navigate("OrderSuccessful", {
            message: "הפרטים עודכנו בהצלחה !",
          });
        },
        (error) => {
          console.log("ERR in update item ", error);
        }
      );
  };

  // update only after the array hsa been changed
  const updateCtegories = () => {
    if (categoriesFlag) {
      deleteCtegories();
    }
  };

  const deleteCtegories = () => {
    fetch(ApiUrl + `/DeleteItemsInCategory/Item_ID/${item.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res;
      })
      .then(
        (result) => {
          postCtegories(item.id);
        },
        (error) => {
          console.log("ERR in delete categories", error);
        }
      );
  };

  //upload categories to Items_in_category table
  const postCtegories = (item_ID) => {
    for (let i = 0; i < itemCategory.length; i++) {
      fetch(
        ApiUrl +
          `/PostItemsInCategory/Item_ID/${item_ID}/Category_name/${itemCategory[i]}`,
        {
          method: "POST",
          // body: JSON.stringify(new_categories),
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {},
          (error) => {
            console.log("ERR in post categories", error);
          }
        );
    }
  };

  ////////////////////////////////////////
  ///uploads the image to the fireBase////
  ////////////////////////////////////////

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [flagForNewImg, setFlagForNewImg] = useState(false);

  const pickImage = async () => {
    let selectedImages = []; // declare selectedImages with let
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple image selection
      selectionLimit: 3,
      orderedSelection: true,
    });

    if (!result.canceled) {
      setFlagForNewImg(true);
      selectedImages = result.assets.map((image, index) => ({
        uri: image.uri,
        key: index,
      }));
      setImages(selectedImages);
      console.log("selectedImages", selectedImages);
    }
    console.log("result", result);
  };

  //post images to the FB
  const uploadImageFB = async (item_ID) => {
    setUploading(true);
    const imageLinks = [];

    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i].uri);
      const blob = await response.blob();
      const filename =
        `${loggedUser.id}/` +
        item_ID +
        "/" +
        images[i].uri.substring(images[i].uri.lastIndexOf("/") + 1);

      try {
        var ref = firebase.storage().ref().child(filename).put(blob);
        await ref;
        var imageRef = firebase.storage().ref().child(filename);
        const imageLink = await imageRef.getDownloadURL();
        imageLinks.push(imageLink);
      } catch (error) {
        console.log("error in upload to FB", error);
      }
    }
    deleteImagesFB();
    console.log("imageLinks", imageLinks);
    uploadImagesDB(item_ID, imageLinks);
    UpdateItem();
    setUploading(false);
    setImages([]);
  };

  //delete images from the FB
  const deleteImagesFB = async () => {
    console.log("in delet fb");
    try {
      const storageRef = firebase.storage().ref();
      console.log("itemImages", itemImages);
      for (const itemImage of itemImages) {
        const filename = itemImage.split("%2F").pop().split("?")[0];
        console.log("itemImage", itemImage);
        const imageRef = storageRef.child(
          `${loggedUser.id}/${item.id}/${filename}`
        );
        await imageRef.delete();
        console.log(`Image ${filename} deleted successfully`);
      }
    } catch (error) {
      console.log("Error FB deleting images:", error);
    }
  };
  //need to do delete the current images from the db, after that to post the new
  const uploadImagesDB = (item_id, imageLinks) => {
    for (let i = 0; i < imageLinks.length; i++) {
      const new_itemImages = {
        item_ID: item_id,
        src: imageLinks[i],
      };

      fetch(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages`,
        {
          method: "POST",
          body: JSON.stringify(new_itemImages),
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            console.log("suc in post images to DB ", result);
            navigation.navigate("OrderSuccessful", {
              message: "הפריט עודכן בהצלחה !",
            });
          },
          (error) => {
            console.log("ERR in post images to DB", error);
          }
        );
    }
  };

 const deleteImagesDB = async () => {
 };

  //to convert the shipping method to string,shipping method in data base gets string only

  const ArrayToStringShip = (data) => {
    var string = "";
    for (let index = 0; index < data.length; index++) {
      string += data[index];
    }
    return string;
  };

  //options ia obj
  const categoryOptions = categoriesList.map((category) => ({
    key: category,
    value: category,
  }));

  //options ia obj
  const chosenCategory = itemCategory.map((category) => ({
    key: category,
    value: category,
  }));

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
          <Text style={styles.header}>עדכון פריט</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text
              style={{ textAlign: "right", color: colors.grey3, left: 125 }}>
              מחיר :
            </Text>
            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              שם פריט :
            </Text>
          </View>
          <View style={styles.doubleContainer}>
            <TextInput
              style={styles.textInput}
              defaultValue={"₪ " + item.price.toString()}
              keyboardType="numeric"
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => {
                setItemPrice(text.slice(2));
              }}
            />

            <TextInput
              style={styles.textInput}
              defaultValue={item.name}
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setItemName(text)}
            />
          </View>
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            קטגוריה :
          </Text>
          <MultipleSelectList
            data={categoryOptions}
            defaultOption={chosenCategory}
            // defaultOption={categoryOptions}
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => {
              setItemCategory(val);
              setCategoriesFlag(true);
            }}
            notFoundText="לא קיים מידע"
            save="value"
            label="קטגוריה"
            badgeStyles={{ backgroundColor: "white" }}
            badgeTextStyles={{ color: "black" }}
            placeholder=" קטגוריה"
            searchPlaceholder="חיפוש"
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            סוג פריט :
          </Text>
          <SelectList
            placeholder={item.type}
            defaultOption={item.type}
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemType(val)}
            data={typesList}
            notFoundText="לא קיים מידע"
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            מידה :
          </Text>
          <SelectList
            placeholder={item.size}
            defaultOption={item.size}
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemSize(val)}
            data={sizesList}
            notFoundText="לא קיים מידע"
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            צבע :
          </Text>
          <SelectList
            placeholder={item.color}
            defaultOption={item.color}
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemColor(val)}
            data={colorsList}
            notFoundText="לא קיים מידע"
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            מותג :
          </Text>
          <SelectList
            placeholder={item.brand}
            defaultOption={item.brand}
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemBrand(val)}
            data={brandsList}
            notFoundText="לא קיים מידע"
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            מצב שימוש :
          </Text>
          <SelectList
            placeholder={item.use_condition}
            defaultOption={item.use_condition}
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCondition(val)}
            data={conditionsList}
            save="value"
            notFoundText="לא קיים מידע"
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            שיטת איסוף :
          </Text>
          <MultipleSelectList
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            badgeStyles={{ backgroundColor: "white" }}
            badgeTextStyles={{ color: "black" }}
            setSelected={(val) => setItemDeliveryMethod(val)}
            data={deliveryMethodsList}
            placeholder="שיטת מסירה"
            searchPlaceholder="חיפוש"
            notFoundText="לא קיים מידע"
            label="שיטת מסירה"
            maxHeight={200}
          />
          <Text style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
            תיאור פריט :
          </Text>
          <TextInput
            style={styles.bigInput}
            defaultValue={item.description}
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setItemDescription(text)}
          />

          <View>
            {images.length < 3 && (
              <TouchableOpacity onPress={() => pickImage(images.length)}>
                <View style={styles.picturBtn}>
                  <Text
                    style={{
                      color: "gray",
                      paddingTop: 10,
                      paddingBottom: 30,
                      textAlign: "center",
                    }}>
                    עדכני תמונות ({images.length}/3)
                  </Text>
                  <AddSvg></AddSvg>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {!flagForNewImg && itemImages.length > 0 && (
            <View style={styles.imageContainer}>
              {itemImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.Image}
                />
              ))}
            </View>
          )}

          {images.length > 0 && (
            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.Image}
                />
              ))}
            </View>
          )}

          {uploading && (
            <View style={{ marginBottom: 30 }}>
              <ActivityIndicator size={"small"} color="black" />
            </View>
          )}

          {/* <View>
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
                    בחרי תמונות
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

          {uploading && (
            <View style={{ marginBottom: 30 }}>
              <ActivityIndicator size={"small"} color="black" />
            </View>
          )} */}

          <Button
            title="עדכן פרטים "
            onPress={() => {
              flagForNewImg ? uploadImageFB(item.id) : UpdateItem(),
                updateCtegories();
            }}
          />
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
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
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
    // textAlign: "right",
    // flexDirection: "column",
    // alignItems: "flex-end",
    // justifyContent: "space-between",
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
