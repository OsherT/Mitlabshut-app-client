import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
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

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  useEffect(() => {}, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // setUserImage(result.uri);
    // setUserImage(
    //   "https://scontent.ftlv18-1.fna.fbcdn.net/v/t1.6435-9/37673670_10157514945495278_8702446268250587136_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=y3hGZ5pDXjoAX-m60Ia&_nc_ht=scontent.ftlv18-1.fna&oh=00_AfBnG6vLlmG8fKu4oTNCZQzr5NWKc5FnhMFG3m3zWitr5A&oe=64272285"
    // );
    setUserImage(
      "https://scontent.ftlv18-1.fna.fbcdn.net/v/t39.30808-6/318441234_6279612948733570_8741695248983855855_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=_S6heIS7Ww0AX9gdDsW&_nc_ht=scontent.ftlv18-1.fna&oh=00_AfDwxnLI-9eF9snTq8sETCw9rv0LdqzDPw9KIZm4r8wzig&oe=6409E89C"
    );
  };

  //update users details
  const updateUser = () => {
    const newUser = {
      email: userEmail,
      id: loggedUser.id,
      closet_id: userClosetId,
      phone_number: userPhone,
      full_name: userName,
      password: userPassword,
      address: address,
      isAdmin: false,
      user_image: userImage,
    };

    const newClosetData = {
      id: loggedUser.closet_id,
      description: closetDesc,
      user_name: closetName,
    };

    console.log("newUser", newUser);

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
              console.log("suc in update user ", res);
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
                <ImageBackground
                  source={{
                    uri: userImage,
                  }}
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

              <View style={{ marginTop: 40 }}>
                <Button title="שמור שינויים " onPress={updateUser} />
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
