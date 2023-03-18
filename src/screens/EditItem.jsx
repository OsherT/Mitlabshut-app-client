import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
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
import MultiSelect from "react-native-multiple-select";

export default function EditItem(props) {
  const item = props.route.params.item;
  const itemCurrentImages = props.route.params.itemImages;
  const isFocused = useIsFocused();

  const { loggedUser } = useContext(userContext);
  const navigation = useNavigation();
  const [itemName, setItemName] = useState(item.name);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemType, setItemType] = useState(item.type);
  const [itemSize, setItemSize] = useState(item.size);
  const [itemCondition, setItemCondition] = useState(item.use_condition);
  const [itemColor, setItemColor] = useState(item.color);
  const [itemBrand, setItemBrand] = useState(item.brand);
  const [itemDescription, setItemDescription] = useState(item.description);

  const getShippingOptions = (num) => {
    if (num === "12") {
      return ["1", "2"];
    } else if (num === "2") {
      return ["2"];
    } else {
      return ["1"];
    }
  };

  const [itemDeliveryMethod, setItemDeliveryMethod] = useState(
    getShippingOptions(item.shipping_method)
  );

  //images & categories
  const [categoriesFlag, setCategoriesFlag] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    props.route.params.itemCtegories.map((item) => item.category_name)
  );
  const [itemNewImages, setItemNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [flagForNewImg, setFlagForNewImg] = useState(false);

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
          var categoryOptions = data.map((item) => item.category_name);
          setCategoriesList(
            categoryOptions.map((category) => ({
              key: category,
              value: category,
            }))
          );
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
          console.log("succ in update item ", data);
          if (!flagForNewImg) {
            console.log("flagForNewImg", flagForNewImg);
            navigation.navigate("OrderSuccessful", {
              message: "הפרטים עודכנו בהצלחה !",
            });
          }
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
    for (let i = 0; i < selectedCategory.length; i++) {
      fetch(
        ApiUrl +
          `/PostItemsInCategory/Item_ID/${item_ID}/Category_name/${selectedCategory[i]}`,
        {
          method: "POST",
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
            console.log("succ in post categories", result);
          },
          (error) => {
            console.log("ERR in post categories", error);
          }
        );
    }
  };

  ////////////////////////////////////////
  ///uploads the image to the fireBase////
  ////////////////////////////////////////

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
      selectedImages = result.assets.map((image, index) => ({
        uri: image.uri,
        key: index,
      }));
      setItemNewImages(selectedImages);
      setFlagForNewImg(true);
    }
  };

  //post images to the FB
  const uploadImageFB = async (item_ID) => {
    setUploading(true);
    const imageLinks = [];

    for (let i = 0; i < itemNewImages.length; i++) {
      const response = await fetch(itemNewImages[i].uri);
      const blob = await response.blob();
      const filename =
        `${loggedUser.id}/` +
        item_ID +
        "/" +
        itemNewImages[i].uri.substring(
          itemNewImages[i].uri.lastIndexOf("/") + 1
        );

      try {
        var ref = firebase.storage().ref().child(filename).put(blob);
        await ref;
        var imageRef = firebase.storage().ref().child(filename);
        const imageLink = await imageRef.getDownloadURL();
        imageLinks.push(imageLink);
        console.log("upload to FB #", i);
      } catch (error) {
        console.log("error in upload to FB", error);
      }
    }
    console.log("finish upload to FB");
    //after uploading all the new images
    deleteImagesFB();
    deleteImagesDB(item_ID, imageLinks);
    UpdateItem();
  };

  //delete images from the FB
  const deleteImagesFB = async () => {
    try {
      const storageRef = firebase.storage().ref();
      for (const itemImage of itemCurrentImages) {
        const filename = itemImage.split("%2F").pop().split("?")[0];
        const imageRef = storageRef.child(
          `${loggedUser.id}/${item.id}/${filename}`
        );
        await imageRef.delete();
        console.log(`suc in delete images from DB`);
      }
    } catch (error) {
      console.log("Error FB deleting images:", error);
    }
  };

  //delete images from the DB and call thr post fun to DB
  const deleteImagesDB = async (item_ID, imageLinks) => {
    fetch(
      `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages/DeleteItem_Image_Video/Item_ID/${item_ID}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      }
    )
      .then((res) => {})
      .then(
        (result) => {
          console.log("suc in delete images from DB ");
          uploadImagesDB(item_ID, imageLinks);
        },
        (error) => {
          console.log("ERR in delete images from DB", error);
        }
      );
  };

  //post images to the DB
  const uploadImagesDB = (item_id, imageLinks) => {
    for (let i = 0; i < imageLinks.length; i++) {
      const new_itemImages = {
        item_ID: item_id,
        src: imageLinks[i],
      };

      fetch(`https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages`, {
        method: "POST",
        body: JSON.stringify(new_itemImages),
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
            console.log("suc in post images to DB ", result);
          },
          (error) => {
            console.log("ERR in post images to DB", error);
          }
        );
    }
    navigation.navigate("OrderSuccessful", {
      message: "הפרטים עודכנו בהצלחה !",
    });
  };

  //to convert the shipping method to string,shipping method in data base gets string only
  const ArrayToStringShip = (data) => {
    var string = "";
    for (let index = 0; index < data.length; index++) {
      string += data[index];
    }
    return string;
  };

  const onSelectedCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCategoriesFlag(true);
  };

  const onSelectedDeliveryChange = (selectedDelivery) => {
    setItemDeliveryMethod(selectedDelivery);
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

          <MultiSelect
            items={categoriesList}
            selectedItems={selectedCategory}
            hideTags={false}
            displayKey="value"
            uniqueKey="key"
            onSelectedItemsChange={onSelectedCategoryChange}
            selectText=""
            searchInputPlaceholderText="חיפוש"
            selectedText=" נבחרו"
            submitButtonText="בחרי"
            noItemsText="לא נמצא מידע"
            itemTextColor="#000"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            tagRemoveIconColor={COLORS.golden}
            tagTextColor="#000"
            altFontFamily="ProximaNova-Light"
            tagBorderColor={COLORS.goldenTransparent_03}
            searchInputStyle={{
              color: "#000",
              textAlign: "right",
              backgroundColor: "#FBF8F2",
              padding: 12,
              borderRadius: 25,
            }}
            styleDropdownMenu={styles.dropdownContainer}
            styleInputGroup={styles.InputGroup}
            styleItemsContainer={styles.dropdownContainer}
            styleDropdownMenuSubsection={{ backgroundColor: "#FBF8F2" }}
            submitButtonColor={COLORS.golden}
            itemFontSize={14}
          />

          <Text
            style={{
              textAlign: "right",
              color: colors.grey3,
              right: 15,
            }}>
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

          <MultiSelect
            items={deliveryMethodsList}
            selectedItems={itemDeliveryMethod}
            hideTags={false}
            displayKey="value"
            uniqueKey="key"
            onSelectedItemsChange={onSelectedDeliveryChange}
            selectText=""
            searchInputPlaceholderText="חיפוש"
            selectedText=" נבחרו"
            submitButtonText="בחרי"
            noItemsText="לא נמצא מידע"
            itemTextColor="#000"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            tagRemoveIconColor={COLORS.golden}
            tagTextColor="#000"
            altFontFamily="ProximaNova-Light"
            tagBorderColor={COLORS.goldenTransparent_03}
            searchInputStyle={{
              color: "#000",
              textAlign: "right",
              backgroundColor: "#FBF8F2",
              padding: 12,
              borderRadius: 25,
            }}
            styleDropdownMenu={styles.dropdownContainer}
            styleInputGroup={styles.InputGroup}
            styleItemsContainer={styles.dropdownContainer}
            styleDropdownMenuSubsection={{ backgroundColor: "#FBF8F2" }}
            submitButtonColor={COLORS.golden}
            itemFontSize={14}
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
            {itemNewImages.length < 3 && (
              <TouchableOpacity onPress={() => pickImage(itemNewImages.length)}>
                <View style={styles.picturBtn}>
                  <Text
                    style={{
                      color: "gray",
                      paddingTop: 10,
                      paddingBottom: 30,
                      textAlign: "center",
                    }}>
                    עדכני תמונות ({itemNewImages.length}/3)
                  </Text>
                  <AddSvg></AddSvg>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {!flagForNewImg && itemCurrentImages.length > 0 && (
            <View style={styles.imageContainer}>
              {itemCurrentImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.Image}
                />
              ))}
            </View>
          )}

          {itemNewImages.length > 0 && (
            <View style={styles.imageContainer}>
              {itemNewImages.map((image, index) => (
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

          <Button
            title="עדכן פרטים "
            onPress={() => {
              updateCtegories();
              flagForNewImg ? uploadImageFB(item.id) : UpdateItem();
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
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    textAlign: "right",
  },
  InputGroup: {
    width: "100%",
    backgroundColor: "#FBF8F2",
    borderColor: COLORS.goldenTransparent_03,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
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
