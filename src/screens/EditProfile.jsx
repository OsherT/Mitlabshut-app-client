import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Edit, EditTwo } from "../svg";
import { userContext } from "../navigation/userContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "react-native-elements";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../../firebaseConfig";

export default function EditProfile(props) {
  const {
    loggedUser,
    setclosetDesc,
    setclosetName,
    setloggedUser,
    closetName,
    closetDesc,
  } = useContext(userContext);
  const navigation = useNavigation();
  const [address, setAddress] = useState(loggedUser.address);
  const [userName, setUserName] = useState(loggedUser.full_name);
  const [userEmail, setUserEmail] = useState(loggedUser.email);

  const [userPassword, setUserPassword] = useState(loggedUser.password);
  const [userPhone, setUserPhone] = useState(loggedUser.phone_number);
  const [userClosetId] = useState(loggedUser.closet_id);
  const [userImage, setUserImage] = useState(loggedUser.user_image);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

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
      console.log("image", image);
    }
  };

  const uploadImageFB = async (user_id) => {
    console.log("in uploadImageFB, user_id", user_id);

    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename =
      `${user_id}/` + image.uri.substring(image.uri.lastIndexOf("/") + 1);

    try {
      var ref = firebase.storage().ref().child(filename).put(blob);
      await ref;
      var imageRef = firebase.storage().ref().child(filename);
      const imageLink = await imageRef.getDownloadURL();
      setImage(null);
      setUserImage(null);
      setUploading(false);
      updateUser(imageLink);
    } catch (error) {
      console.log("error in upload to FB", error);
    }
  };

  //update users details
  const updateUser = (imageLink) => {
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
    };

    const newClosetData = {
      id: loggedUser.closet_id,
      description: closetDesc,
      user_name: closetName,
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
              console.log("newUser ", newUser);
              console.log("loggeduser ", loggedUser);

              console.log("suc in update user ", res.data);
              navigation.navigate("OrderSuccessful", {
                message: "הפרטים עודכנו בהצלחה !",
              });
            })
            .catch((error) => {
              console.log("ERR in update closet", error);
            });
        },
        (error) => {
          console.log("ERR in update user", error);
        }
      );
  };

  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  }}
                  styles={{
                    container: {
                      flex: 0,
                      // position: "absolute",
                      width: "100%",
                    },
                    listView: { position: "absolute", zIndex: 1, top: 50 },
                  }}
                />
              </SafeAreaView>

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

              <Text
                style={{ textAlign: "right", color: colors.grey3, right: 15 }}>
                שם ארון:
              </Text>
              <InputField
                defaultValue={closetName}
                icon={<EditTwo />}
                containerStyle={{ marginBottom: 20 }}
                onChangeText={(text) => setclosetName(text)}
                keyboardType="text"
              />

              {uploading && (
                <View style={{ marginBottom: 30 }}>
                  <ActivityIndicator size={"small"} color="black" />
                </View>
              )}

              <View style={{ marginTop: 40 }}>
                <Button
                  title="שמור שינויים "
                  onPress={() => uploadImageFB(loggedUser.id)}
                />
              </View>
            </ContainerComponent>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="עדכון פרטים אישיים" onPress={() => navigation.goBack()} />
      {renderContent()}
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
});
