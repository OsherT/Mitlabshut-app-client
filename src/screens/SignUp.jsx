import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { AddSvg } from "../svg";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import { ActivityIndicator } from "react-native-web";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function SignUp() {
  const ApiUrl_image = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages`;

  const difPic =
    "https://images.squarespace-cdn.com/content/v1/5beb55599d5abb5a47cc4907/1610465905997-2G8SGHXIYCGTF9BQB0OD/female+girl+woman+icon.jpg?format=500w";
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [ClosetDisc, setClosetDisc] = useState("ברוכות הבאות לארון החדש שלי");
  const [ClosetName, setClosetName] = useState(userName);
  const { loggedUser, setloggedUser } = useContext(userContext);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  const SignUp = () => {
    if (
      userName == "" ||
      userEmail == "" ||
      userPassword == "" ||
      userPhone == "" ||
      image == ""
    ) {
      //אלו השדות חובה שלנו
      alert("אנא הכניסי את כל הפרטים הנדרשים");
    } else {
      const newCloset = {
        //יצירת ארון חדש למשתמשת
        Id: 0,
        Description: ClosetDisc,
        User_name: ClosetName,
      };
      axios
        .post(
          "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/Post",
          newCloset
        )
        .then((res) => {
          if (res.data != 0) {
            const newUser = {
              //יצירת יוזר חדש
              Email: userEmail,
              Phone_number: userPhone,
              Full_name: userName,
              Password: userPassword,
              Address: address,
              IsAdmin: false,
              Closet_ID: res.data, //הכנסת האיידי של הארון ליוזר החדש
              User_image: difPic,
            };
            axios
              .post(
                "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostUser",
                newUser
              )
              .then((res) => {
                setloggedUser(newUser); //לאחר ההרשמה היוזר מתחבר ומנווט ישר לארון שלו
                // navigation.navigate("Closet");
                console.log("succ in user", res.data);
                uploadImageFB(res.data);
              })
              .catch((err) => {
                console.log("Error in user", err);
              });
          }
        })
        .catch((err) => {
          alert("Error in closet");
        });
    }
  };

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
    }
  };

  const uploadImageFB = async (user_id) => {
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
    } catch (error) {
      console.log("error in upload to FB", error);
    }

    // uploadImagesDB(user_id, imageLink);

    setImage(null);
    setUploading(false);

    navigation.navigate("OrderSuccessful", {
      message: "הרשמתך בוצעה בהצלחה !",
    });
  };

  const uploadImagesDB = (item_id, imageLink) => {
    const new_itemImages = {
      item_ID: item_id,
      src: imageLink,
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
  };

  function renderContent() {
    return (
      <View>
        <ContainerComponent>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H1,
              color: COLORS.black,
              marginBottom: 20,
              lineHeight: 32 * 1.2,
              textTransform: "capitalize",
            }}>
            הצטרפי לקהילה שלנו
          </Text>
          <InputField
            placeholder="שם מלא"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserName(text)}
          />
          <InputField
            placeholder="מייל"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserEmail(text)}
            keyboardType="email-address"
          />
          <SafeAreaView style={styles.view}>
            <GooglePlacesAutocomplete
              placeholder="כתובת"
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
                  width: "100%",
                  zIndex: 1,
                },
                listView: { position: "absolute", zIndex: 1, top: 50 },
              }}
            />
          </SafeAreaView>

          <InputField
            placeholder="סיסמה"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserPassword(text)}
          />

          <InputField
            placeholder="מספר טלפון"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserPhone(text)}
            keyboardType="phone-pad"
          />
          <InputField
            placeholder="תיאור הארון החדש שלך"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setClosetDisc(text)}
            keyboardType="text"
          />

          <InputField
            placeholder="הארון של..."
            containerStyle={{ marginBottom: 20 }}
            onChangeText={(text) => setClosetName(text)}
            keyboardType="text"
          />
          {image ? (
            <View style={{ alignSelf: "center" }}>
              <Image source={{ uri: image.uri }} style={styles.Image} />
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => pickImage()}>
                <View style={styles.picturBtn}>
                  <Text
                    style={{
                      color: "gray",
                      textAlign: "center",
                    }}>
                    הוסיפי תמונת פרופיל
                  </Text>
                  <AddSvg></AddSvg>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {uploading && (
            <View style={{ marginBottom: 30 }}>
              <ActivityIndicator size={"small"} color="black" />
            </View>
          )}

          <View>
            <Button title="הרשמה" onPress={SignUp} />
          </View>
        </ContainerComponent>

        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 13,
            flexDirection: "row",
            top: 745,
            left: 130,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text
              style={{
                ...FONTS.Mulish_400Regular,
                fontSize: 16,
                color: COLORS.black,
              }}>
              {" "}
              התחברי
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              fontSize: 16,
              color: COLORS.gray,
            }}>
            כבר חלק מהקהילה?{" "}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="הרשמה" flag="false" onPress={() => navigation.goBack()} />
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
  input: {
    flex: 1,
    paddingRight: 15,
    textAlign: "right",
    zIndex: 0,
  },
  picturBtn: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: COLORS.goldenTransparent_03,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBF8F2",
    marginBottom: 30,
  },
  Image: {
    width: 120,
    height: 120,
    margin: 5,
    marginBottom: 20,
    borderRadius: 25,
  },
});
