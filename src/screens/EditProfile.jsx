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

export default function EditProfile() {
  const { loggedUser, setloggedUser } = useContext(userContext);

  const navigation = useNavigation();

  const [address, setAddress] = useState(loggedUser.address);
  const [userName, setUserName] = useState(loggedUser.full_name);
  const [userEmail, setUserEmail] = useState(loggedUser.email);
  const [userPassword, setUserPassword] = useState(loggedUser.password);
  const [userPhone, setUserPhone] = useState(loggedUser.phone_number);
  const [userClosetId] = useState(loggedUser.Closet_ID);
  const [itemImage, setItemImage] = useState(loggedUser.User_image);

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  console.log("loggedUser", loggedUser);
  console.log("loggedUser.address", loggedUser.address);

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

  //upload images to Item_Image_Video table
  const updateUser = (id) => {
    const newUser = {
      Email: userEmail,
      Phone_number: userPhone,
      Full_name: userName,
      Password: userPassword,
      Address: address, //To change
      IsAdmin: false,
      Closet_ID: userClosetId,
      User_image:
        "https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.6435-9/41952282_10157685462195278_136145717344337920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TnyYCGqvAOYAX_nk6mp&tn=0JEpg4HFhHuurQmq&_nc_ht=scontent.fsdv1-2.fna&oh=00_AfBzlF3IlBrfMLEoWKSKpJMqbuPlakxqPXtZkXGoiRXtcA&oe=6426C3C7",
    };
    fetch(ApiUrl + `User/id/${id}`, {
      method: "UPDATE",
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
          console.log("suc in update user= ", result);
        },
        (error) => {
          console.log("ERR in update user", error);
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
              console.log(loggedUser);
            }}>
            <ImageBackground
              source={{
                uri: loggedUser.user_image,
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
            value={loggedUser.full_name}
            icon={<EditTwo />}
            containerStyle={{ marginBottom: 10 }}
          />
          <InputField
            value={loggedUser.email}
            icon={<EditTwo />}
            containerStyle={{ marginBottom: 10 }}
          />
          <InputField
            value={loggedUser.phone_number}
            icon={<EditTwo />}
            containerStyle={{ marginBottom: 10 }}
            keyboardType="phone-pad"
          />
          <InputField
            value={loggedUser.password}
            icon={<EditTwo />}
            containerStyle={{ marginBottom: 20 }}
          />
          {/* gogellllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll */}
          <SafeAreaView style={styles.view}>
            <GooglePlacesAutocomplete
              placeholder={loggedUser.address}
              fetchDetails={true}
              GooglePlacesSearchQuery={{ rankby: "distance" }}
              onPress={(data, details = null) => {
                setAddress(data.description);
                console.log(data.description);
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
                  //position: "absolute",
                  width: "100%",
                  zIndex: 1,
                },
                listView: { position: "absolute", zIndex: 1 },
              }}
            />
          </SafeAreaView>
          <View style={{ marginTop: 40 }}>
            <Button
              title="שמור שינויים "
              onPress={
                // (() => navigation.navigate("Closet"), updateUser(loggedUser.id))
                (() =>  Alert.alert("to update"))
              }
            />
          </View>
        </ContainerComponent>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
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
  },
});
