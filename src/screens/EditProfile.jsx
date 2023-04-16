import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS } from "../constants";
import { Edit, EditTwo } from "../svg";
import { userContext } from "../navigation/userContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from "expo-image-picker";
import { colors } from "react-native-elements";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../../firebaseConfig";
import ButtonLogIn from "../components/ButtonLogIn";
import UploadModal from "../components/Uploading";
import { SelectList } from "react-native-dropdown-select-list";
import WarningModal from "../components/WarningModal";
import AlertModal from "../components/AlertModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditProfile() {
  const {
    loggedUser,
    setclosetDesc,
    setSelectedTab,
    setloggedUser,
    closetName,
    closetDesc,
  } = useContext(userContext);
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  //modals
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmAlertModal, setConfirmAlertModal] = useState(false);

  //users info
  const [address, setAddress] = useState(loggedUser.address);
  const [userName, setUserName] = useState(loggedUser.full_name);
  const [userEmail, setUserEmail] = useState(loggedUser.email);
  const [userAge, setUserAge] = useState(loggedUser.age);
  const [userPassword, setUserPassword] = useState(loggedUser.password);
  const [userPhone, setUserPhone] = useState(loggedUser.phone_number);
  const [userClosetId] = useState(loggedUser.closet_id);
  const [userImage, setUserImage] = useState(loggedUser.user_image);
  const [image, setImage] = useState(null);

  //flages
  const [uploading, setUploading] = useState(false);
  const [flagForNewImg, setFlagForNewImg] = useState(false);

  //create the age list
  const ageList = Array.from({ length: 109 }, (_, i) => ({
    value: (i + 12).toString(),
    label: `${i + 12}`,
  }));

  ////////////////////////////////////////
  ///edit image section
  ////////////////////////////////////////
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setImage({
        uri: result.uri,
        key: 1,
      });
      setFlagForNewImg(true);
    }
  };

  const uploadImageFB = async (user_id) => {
    setUploading(true);
    var FBfail = false;

    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename =
      `${user_id}/` + image.uri.substring(image.uri.lastIndexOf("/") + 1);

    try {
      var ref = firebase.storage().ref().child(filename).put(blob);
      await ref;
      var imageRef = firebase.storage().ref().child(filename);
      var imageLink = await imageRef.getDownloadURL();
    } catch (error) {
      FBfail = true;

      console.log("error in upload to FB", error);
    }
    if (FBfail) {
      setUploading(false);
      setMessage("קיימת שגיאה בהעלאת הנתונים,\nאנא נסי שוב מאוחר יותר");
      setShowAlertModal(true);
      setConfirmAlertModal(true);

      setSelectedTab("Closet");
      setTimeout(() => {
        setShowAlertModal(false);
        navigation.navigate("MainLayout");
      }, 2000);
    } else {
      deleteImageFB();
      updateUser(imageLink);
    }
  };

  const deleteImageFB = async () => {
    try {
      const filename = userImage.split("%2F").pop().split("?")[0];
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`${loggedUser.id}/${filename}`);
      await imageRef.delete();
      console.log("Image FB deleted successfully");
      setUserImage(null);
    } catch (error) {
      console.log("Error FB deleting image:", error);
    }
  };

  //update users details
  const updateUser = (imageLink) => {
    if (address.split(",").length < 3) {
      setMessage("אנא הכניסי כתובת מלאה הכוללת שם רחוב, עיר ומדינה");
      setShowAlertModal(true);
    } else if (
      userName == "" ||
      userEmail == "" ||
      userPassword == "" ||
      userPhone == "" ||
      image == "" ||
      address == "" ||
      userAge == ""||
      closetDesc==""
    ) {
      setMessage("אנא מלאי את כל הפרטים");
      setShowAlertModal(true);
    } else {
      const newUser = {
        email: userEmail,
        id: loggedUser.id,
        closet_id: userClosetId,
        phone_number: userPhone,
        full_name: userName,
        password: userPassword,
        address: address,
        isAdmin: false,
        user_image: imageLink,
        age: userAge,
        token: loggedUser.token,
      };

      const newClosetData = {
        id: loggedUser.closet_id,
        description: closetDesc,
        user_name: "0",
      };

      fetch(ApiUrl + `User/PutUser`, {
        method: "PUT",
        body: JSON.stringify(newUser),
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
            axios
              .put(
                "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/Put",
                newClosetData
              )
              .then((res) => {
                setloggedUser(newUser);
                console.log("newUser",newUser);
                setUserImage(imageLink);
                setFlagForNewImg(false);
                setUploading(false);

                if (!uploading) {
                  navigation.navigate("OrderSuccessful", {
                    message: "הפרטים עודכנו בהצלחה !",
                  });
                }
              })
              .catch((error) => {
                console.log("ERR in update closet", error);
              });
          },
          (error) => {
            console.log("ERR in update user", error);
          }
        );
    }
  };

  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <ContainerComponent>
            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}>
              {!image && (
                <ImageBackground
                  source={{ uri: loggedUser.user_image }}
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: "center",
                    marginBottom: 15,
                  }}
                  imageStyle={{ borderRadius: 40 }}>
                  <View
                    style={{
                      position: "absolute",
                      right: -20,
                      bottom: -20,
                    }}>
                    <Edit />
                  </View>
                </ImageBackground>
              )}
              {image && (
                <ImageBackground
                  source={{ uri: image.uri }}
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: "center",
                    marginBottom: 15,
                  }}
                  imageStyle={{ borderRadius: 40 }}>
                  <View
                    style={{
                      position: "absolute",
                      right: -20,
                      bottom: -20,
                    }}>
                    <Edit />
                  </View>
                </ImageBackground>
              )}
            </TouchableOpacity>
            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              שם מלא:
            </Text>
            <InputField
              defaultValue={loggedUser.full_name}
              icon={<EditTwo />}
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setUserName(text)}
              keyboardType="text"
            />
            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              כתובת אימייל :
            </Text>
            <InputField
              defaultValue={loggedUser.email}
              icon={<EditTwo />}
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setUserEmail(text)}
              keyboardType="text"
            />
            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              כתובת מגורים:
            </Text>
            <SafeAreaView style={styles.view}>
              <GooglePlacesAutocomplete
                placeholder={loggedUser.address}
                fetchDetails={true}
                GooglePlacesSearchQuery={{ rankby: "distance" }}
                onPress={(data, details = null) => {
                  setAddress(data.description);
                }}
                query={{
                  key: "AIzaSyAaCpPtzL7apvQuXnKdRhY0omPHiMdc--s",
                  language: "he",
                }}
                textInputProps={{
                  textAlign: "right",
                  backgroundColor: "#FBF8F2",
                  placeholderTextColor: "black",
                }}
                styles={{
                  container: {
                    flex: 0,
                    width: "100%",
                  },
                  listView: {
                    position: "absolute",
                    zIndex: 1,
                    top: 50,
                  },
                  textInputContainer: {
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  description: {
                    flex: 1,
                  },
                  icon: {
                    marginHorizontal: 8,
                  },
                }}
                renderRightButton={() => <EditTwo />}
              />
            </SafeAreaView>

            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              גיל:
            </Text>

            <SelectList
              defaultOption={loggedUser.age}
              placeholder={
                <>
                  {loggedUser.age}
                  {"    "}
                  <EditTwo />
                </>
              }
              searchPlaceholder="חיפוש"
              boxStyles={styles.dropdownInput}
              dropdownStyles={styles.dropdownContainer}
              setSelected={(val) => setUserAge(val)}
              data={ageList}
              save="value"
              notFoundText="לא קיים מידע"
            />

            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              מספר טלפון:
            </Text>
            <InputField
              defaultValue={loggedUser.phone_number}
              icon={<EditTwo />}
              containerStyle={{ marginBottom: 10 }}
              keyboardType="phone-pad"
              onChangeText={(text) => setUserPhone(text)}
            />
            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              סיסמה:
            </Text>
            <InputField
              defaultValue={loggedUser.password}
              icon={<EditTwo />}
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setUserPassword(text)}
              keyboardType="text"
            />
            <Text
              style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
              תיאור ארון:
            </Text>
            <InputField
              defaultValue={closetDesc}
              icon={<EditTwo />}
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => setclosetDesc(text)}
              keyboardType="text"
            />

            <UploadModal
              uploading={uploading}
              message="עדכון פרטים עלול לקחת זמן, אנא המתיני"></UploadModal>

            <View style={{ marginTop: 10 }}>
              <Button
                title="עדכני פרטים"
                onPress={() => {
                  flagForNewImg
                    ? uploadImageFB(loggedUser.id)
                    : updateUser(loggedUser.user_image);
                }}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <ButtonLogIn title="ביטול  " onPress={() => setShowModal(true)} />
            </View>
          </ContainerComponent>
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header
        title="עדכון פרטים אישיים"
        flag={true}
        onEdit={true}
        showModal={false}
        setShowModal={setShowModal}
        handleSure={() => navigation.goBack()}
        massage={" השינויים לא ישמרו \n האם את בטוחה ?"}
        goBack={true}
      />
      {renderContent()}
      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSure={() => navigation.goBack()}
          massage={" השינויים לא ישמרו \n האם את בטוחה ?"}
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
  view: {
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
    marginBottom: 10,
    zIndex: 1,
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
    marginBottom: 10,
    textAlign: "right",
    height: 50,
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
});
