import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { userContext } from "../navigation/userContext";
import { firebase } from "../../firebaseConfig";
import { AddSvg } from "../svg";
import MultiSelect from "react-native-multiple-select";
import ButtonLogIn from "../components/ButtonLogIn";
import UploadModal from "../components/Uploading";
import WarningModal from "../components/WarningModal";
import AlertModal from "../components/AlertModal";
import * as ImageManipulator from "expo-image-manipulator";
import { LogBox } from "react-native";

export default function UploadItem() {
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const navigation = useNavigation();
  const { loggedUser } = useContext(userContext);
  const difPic =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  //api
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item`;
  const ApiUrl_image = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages`;

  //modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmAlertModal, setConfirmAlertModal] = useState(false);

  //the section of the item information hooks
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [itemCategory, setItemCategory] = useState([]);
  const [itemType, setItemType] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemDeliveryMethod, setItemDeliveryMethod] = useState([]);
  const [itemBrand, setItemBrand] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  //gets all the data from the dataBase
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
          setBrandsList(data.map((item) => ({ value: item.brand_name })));
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
          setColorsList(data.map((item) => ({ value: item.color_name })));
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
          setSizesList(data.map((item) => ({ value: item.size_name })));
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
          setTypesList(data.map((item) => ({ value: item.item_type_name })));
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
      images.length == 0
    ) {
      setMessage("יש למלא את כל הפרטים");
      setShowAlertModal(true);
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
        Item_status: "active",
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
            uploadCtegories(item_ID);
            uploadImageFB(item_ID);
          },
          (error) => {
            console.log("ERR in upload item ", error);
          }
        );
    }
  };

  ////////////////////////////////////////
  ///upload image section
  ////////////////////////////////////////
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple image selection
      selectionLimit: 3,
      orderedSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((image, index) => ({
        uri: image.uri,
        key: index,
      }));
      setImages(selectedImages);
    }
  };

  const uploadImageFB = async (item_ID) => {
    setUploading(true);
    var FBfail = false;

    const imageLinks = [];

    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i].uri);
      const blob = await response.blob();
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        images[i].uri,
        [{ resize: { width: 300 } }],
        { compress: 0.05, format: ImageManipulator.SaveFormat.JPEG }
      );
      const filename =
        `${loggedUser.id}/` +
        item_ID +
        "/" +
        manipulatedImage.uri.substring(
          manipulatedImage.uri.lastIndexOf("/") + 1
        );

      try {
        var ref = firebase.storage().ref().child(filename).put(blob);
        await ref;
        var imageRef = firebase.storage().ref().child(filename);
        const imageLink = await imageRef.getDownloadURL();
        imageLinks.push(imageLink);
        console.log(`Image ${filename} uploaded successfully`);
      } catch (error) {
        FBfail = true;

        console.log("error in upload to FB", error);
      }
    }

    if (FBfail) {
      setUploading(false);
      setMessage("קיימת שגיאה בהעלאת התמונות,\n  בנתיים שמנו תמונה זמנית 😊");
      setShowAlertModal(true);
      setConfirmAlertModal(true);
      uploadImagesDB(item_ID, imageLinks);

      setTimeout(() => {
        setShowAlertModal(false);
        navigation.navigate("OrderSuccessful", {
          message: "הפריט עלה בהצלחה,\n אל תשכחי לעדכן את תמונות מאוחר יותר !",
        });
      }, 2000);
    } else {
      uploadImagesDB(item_ID, imageLinks);
      setUploading(false);
      navigation.navigate("OrderSuccessful", {
        message: "הפריט עלה בהצלחה !",
      });
    }
    // setUploading(false);

    // uploadImagesDB(item_ID, imageLinks);

    // if (!uploading) {
    //   navigation.navigate("OrderSuccessful", {
    //     message: "הפריט עלה בהצלחה !",
    //   });
    // }
  };

  const uploadImagesDB = (item_id, imageLinks) => {
    //if there is a problem with uploading to FB
    console.log("imageLinks", imageLinks);
    if (imageLinks.length == 0) {
      const new_itemImages = {
        item_ID: item_id,
        src: difPic,
      };

      fetch(ApiUrl_image, {
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
    } else {
      for (let i = 0; i < imageLinks.length; i++) {
        const new_itemImages = {
          item_ID: item_id,
          src: imageLinks[i],
        };

        fetch(ApiUrl_image, {
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

  ////////////////////////////////////////
  ///MultiSelect section
  ////////////////////////////////////////
  const onSelectedCategoryChange = (itemCategory) => {
    setItemCategory(itemCategory);
  };

  const onSelectedDeliveryChange = (itemDeliveryMethod) => {
    setItemDeliveryMethod(itemDeliveryMethod);
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
            }}></View>
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
              onChangeText={(text) => setItemName(text)}
            />
          </View>

          <MultiSelect
            items={categoriesList}
            selectedItems={itemCategory}
            onSelectedItemsChange={onSelectedCategoryChange}
            hideTags={false}
            displayKey="value"
            uniqueKey="key"
            selectText="קטגוריה"
            searchInputPlaceholderText="חיפוש"
            selectedText=" נבחרו"
            submitButtonText="בחרי"
            noItemsText="לא נמצא מידע"
            itemTextColor="#000"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            tagRemoveIconColor={COLORS.golden}
            tagTextColor="#000"
            tagBorderColor={COLORS.goldenTransparent_03}
            submitButtonColor={COLORS.golden}
            itemFontSize={14}
            //עיצוב הטקסט הראשי
            styleTextDropdown={{
              textAlign: "right",
              color: COLORS.lightGray,
            }}
            //עיצוב החץ
            styleIndicator={{ right: 295 }}
            //עיצוב האינפוט הראשי שרואים
            styleDropdownMenuSubsection={{
              backgroundColor: "#FBF8F2",
              borderColor: COLORS.goldenTransparent_03,
              borderWidth: 1,
              borderRadius: 25,
              height: 45,
              marginBottom: 30,
              paddingRight: 0,
            }}
            //עיצוב של החיפוש
            styleInputGroup={styles.InputGroup}
            //עיצוב של התיבה שמכילה את הרשימה של הפרטים
            styleListContainer={styles.dropdownContainer}
            //עיצוב של הכותרת של הפריטים שנבחרו
            styleTextDropdownSelected={{ textAlign: "right", color: "#000" }}
          />

          <SelectList
            placeholder="סוג פריט"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => {
              setItemType(val);
            }}
            data={typesList}
            notFoundText="לא קיים מידע"
            inputStyles={[
              { color: itemType ? "black" : COLORS.lightGray }, // Set color to black if value is selected, otherwise set to gray
            ]}
          />
          <SelectList
            placeholder="מידה "
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemSize(val)}
            data={sizesList}
            notFoundText="לא קיים מידע"
            inputStyles={[
              { color: itemSize ? "black" : COLORS.lightGray }, // Set color to black if value is selected, otherwise set to gray
            ]}
          />
          <SelectList
            placeholder="  צבע "
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemColor(val)}
            data={colorsList}
            notFoundText="לא קיים מידע"
            inputStyles={[
              { color: itemColor ? "black" : COLORS.lightGray }, // Set color to black if value is selected, otherwise set to gray
            ]}
          />
          <SelectList
            placeholder="  מותג "
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemBrand(val)}
            data={brandsList}
            notFoundText="לא קיים מידע"
            inputStyles={[
              { color: itemBrand ? "black" : COLORS.lightGray }, // Set color to black if value is selected, otherwise set to gray
            ]}
          />
          <SelectList
            placeholder=" מצב פריט"
            searchPlaceholder="חיפוש"
            boxStyles={styles.dropdownInput}
            dropdownStyles={styles.dropdownContainer}
            setSelected={(val) => setItemCondition(val)}
            data={conditionsList}
            save="value"
            notFoundText="לא קיים מידע"
            inputStyles={[
              { color: itemCondition ? "black" : COLORS.lightGray }, // Set color to black if value is selected, otherwise set to gray
            ]}
          />

          <MultiSelect
            items={deliveryMethodsList}
            selectedItems={itemDeliveryMethod}
            hideTags={false}
            displayKey="value"
            uniqueKey="key"
            onSelectedItemsChange={onSelectedDeliveryChange}
            selectText="שיטת מסירה"
            searchInputPlaceholderText="חיפוש"
            selectedText=" נבחרו"
            submitButtonText="בחרי"
            noItemsText="לא נמצא מידע"
            itemTextColor="#000"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            tagRemoveIconColor={COLORS.golden}
            tagTextColor="#000"
            tagBorderColor={COLORS.goldenTransparent_03}
            submitButtonColor={COLORS.golden}
            itemFontSize={14}
            //עיצוב הטקסט הראשי
            styleTextDropdown={{ textAlign: "right", color: COLORS.lightGray }}
            //עיצוב החץ
            styleIndicator={{ right: 295 }}
            //עיצוב האינפוט הראשי שרואים
            styleDropdownMenuSubsection={{
              backgroundColor: "#FBF8F2",
              borderColor: COLORS.goldenTransparent_03,
              borderWidth: 1,
              borderRadius: 25,
              height: 45,
              paddingRight: 0,
            }}
            //עיצוב של החיפוש
            styleInputGroup={styles.InputGroup}
            //עיצוב של התיבה שמכילה את הרשימה של הפרטים
            styleListContainer={styles.dropdownContainer}
            //עיצוב של הכותרת של הפריטים שנבחרו
            styleTextDropdownSelected={{ textAlign: "right", color: "#000" }}
          />

          <TextInput
            style={styles.bigInput}
            placeholder=" תיאור מפורט  "
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setItemDescription(text)}
            /////////////////////////לנוחות, למחוק אח"כ/////////////////////////
            value={itemDescription}
          />
          <View>
            {images.length < 3 && (
              <TouchableOpacity onPress={() => pickImage(images.length)}>
                <View style={styles.picturBtn}>
                  <Text
                    style={{
                      color: COLORS.lightGray,
                      paddingTop: 10,
                      paddingBottom: 30,
                      textAlign: "center",
                    }}>
                    הוסיפי תמונות ({images.length}/3)
                  </Text>
                  <AddSvg></AddSvg>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {images.length > 0 && (
            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <View key={index}>
                  <Image source={{ uri: image.uri }} style={styles.Image} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      const newImages = [...images]; // Make a copy of the array
                      newImages.splice(index, 1); // Remove the image at the given index
                      setImages(newImages); // Update the state
                    }}>
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <UploadModal
            uploading={uploading}
            message="העלאת פריט עלולה לקחת זמן, אנא המתיני"></UploadModal>

          <Button title="הוספת פריט" onPress={UploadItem} />

          <View style={{ marginTop: 20 }}>
            <ButtonLogIn
              title="ביטול  "
              onPress={() => {
                setShowModal(true);
              }}
            />
          </View>
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }
  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header flag={true} onEdit={true} goBack={true} />
      {renderContent()}

      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSure={() => navigation.goBack()}
          massage={" השינויים לא ישמרו \n האם את בטוחה ?"}
          goBack={true}
        />
      )}
      {showAlertModal && (
        <AlertModal
          message={message}
          showModal={showAlertModal}
          setShowModal={setShowAlertModal}
          confirm={confirmAlertModal}
        />
      )}
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
    marginBottom: 10,
  },

  dropdownInput: {
    width: "100%",
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
    color: "red",
  },
  styleDropdownMenu: {
    width: "100%",
    backgroundColor: "#FBF8F2",
    borderColor: COLORS.goldenTransparent_03,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 25,
    height: 45,
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
  },
  InputGroup: {
    width: "100%",
    backgroundColor: "#FBF8F2",
    borderColor: COLORS.goldenTransparent_03,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 25,
    height: 45,
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
    marginTop: 20,
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
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: COLORS.golden,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
