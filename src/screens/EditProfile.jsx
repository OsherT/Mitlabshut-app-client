import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Edit, EditTwo } from "../svg";
import { userContext } from "../navigation/userContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const { loggedUser, setloggedUser } = useContext(userContext);

  const navigation = useNavigation();

  const [address, setAddress] = useState(loggedUser.address);
  const [userName, setUserName] = useState(loggedUser.full_name);
  const [userEmail] = useState(loggedUser.email);
  const [userPassword, setUserPassword] = useState(loggedUser.password);
  const [userPhone, setUserPhone] = useState(loggedUser.phone_number);
  const [userClosetId] = useState(loggedUser.closet_id);
  const [userImage, setUserImage] = useState(loggedUser.user_image);

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // setItemImage(result.uri);

    // setUserImage(
    //   "https://scontent.ftlv18-1.fna.fbcdn.net/v/t1.6435-9/37673670_10157514945495278_8702446268250587136_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=y3hGZ5pDXjoAX-m60Ia&_nc_ht=scontent.ftlv18-1.fna&oh=00_AfBnG6vLlmG8fKu4oTNCZQzr5NWKc5FnhMFG3m3zWitr5A&oe=64272285"
    // );
    setUserImage(
      "https://scontent.fsdv1-2.fna.fbcdn.net/v/t39.30808-6/275113161_10228259427687412_4499196323364308307_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=iDDYjAdJaKoAX_O-eJW&_nc_ht=scontent.fsdv1-2.fna&oh=00_AfAZWmFI0O_mjhX3rl2OqNXxe4w98TmIOehzkCLbF3JDEA&oe=64070A66"
    );
  };

  //update users details
  const updateUser = () => {
    const newUser = {
      Email: userEmail,
      ID: loggedUser.id,
      Closet_ID: userClosetId,
      Phone_number: userPhone,
      Full_name: userName,
      Password: userPassword,
      Address: address,
      IsAdmin: false,
      User_image: userImage,
    };

    console.log("newUser", newUser);

    fetch(ApiUrl + `User`, {
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
          setloggedUser(newUser);
          console.log("suc in update user= ", result);
          navigation.navigate("OrderSuccessful");
        },
        (error) => {
          console.log("ERR in update user", error);
        }
      );
  };

  function renderContent() {
    return (
      // <KeyboardAwareScrollView
      //   contentContainerStyle={{
      //     flexGrow: 1,
      //     paddingHorizontal: 20,
      //     paddingVertical: 25,
      //   }}
      //   showsHorizontalScrollIndicator={false}>

      <ContainerComponent>
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}>
          <ImageBackground
            source={{
              // uri: loggedUser.user_image,
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
                right: 3,
                bottom: 3,
              }}>
              <Edit />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <InputField
          defaultValue={loggedUser.full_name}
          icon={<EditTwo />}
          containerStyle={{ marginBottom: 10 }}
          onChangeText={(text) => setUserName(text)}
          keyboardType="text"
        />
        {/* <InputField
          value={loggedUser.email}
          icon={<EditTwo />}
          containerStyle={{ marginBottom: 10 }}
          onChangeText={(text) => setUserEmail(text)}
          keyboardType="text"
          
        /> */}

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

        <InputField
          
          defaultValue={loggedUser.phone_number}
          icon={<EditTwo />}
          containerStyle={{ marginBottom: 10 }}
          keyboardType="phone-pad"
          onChangeText={(text) => setUserPhone(text)}
        />

        <InputField
          defaultValue={loggedUser.password}
          icon={<EditTwo />}
          containerStyle={{ marginBottom: 20 }}
          onChangeText={(text) => setUserPassword(text)}
          keyboardType="text"
        />

        <View style={{ marginTop: 40 }}>
          <Button title="שמור שינויים " onPress={updateUser} />
        </View>
      </ContainerComponent>
      // </KeyboardAwareScrollView>
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
