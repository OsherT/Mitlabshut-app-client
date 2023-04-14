import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { AddSvg } from "../svg";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebaseConfig";
import { ScrollView } from "react-native";
import UploadModal from "../components/Uploading";
import { SelectList } from "react-native-dropdown-select-list";
import AlertModal from "../components/AlertModal";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function SignUp() {
  const difPic =
    "https://images.squarespace-cdn.com/content/v1/5beb55599d5abb5a47cc4907/1610465905997-2G8SGHXIYCGTF9BQB0OD/female+girl+woman+icon.jpg?format=500w";
  const navigation = useNavigation();
  const { setSelectedTab, setloggedUser, registerForPushNotificationsAsync } =
  useContext(userContext);
  const ageList = Array.from({ length: 109 }, (_, i) => ({
    value: (i + 12).toString(),
    label: `${i + 12}`,
  }));

  //user data
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAge, setUserAge] = useState("");
  const [ClosetDisc, setClosetDisc] = useState("ברוכות הבאות לארון החדש שלי");

  //modal
  const [showModal, setShowModal] = useState(false);
  const [confirmAlertModal, setConfirmAlertModal] = useState(false);

//FB image
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const isFocused = useIsFocused();

//nottifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (isFocused) {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
          // פה נעשה את הפעולה שנרצה לאחר שהמשתמש לחץ על ההתרא, לדוגמא ניווט לארון של היוזר שעקב אחריו
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
          // פה נעשה את הפעולה שנרצה לאחר שהמשתמש לחץ על ההתרא, לדוגמא ניווט לארון של היוזר שעקב אחריו
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [isFocused]);
//פונקציית ההרשמה
  const SignUp = () => {
    if (
      userName == "" ||
      userEmail == "" ||
      userPassword == "" ||
      userPhone == "" ||
      image == "" ||
      address == "" ||
      userAge == ""
    ) {
      //אלו השדות חובה שלנו
      setMessage("יש למלא את כל הפרטים");
      setShowAlertModal(true);
    } else if (userPhone.length <10) {
      setMessage("אנא הכניסי מספר טלפון תקין");
      setShowAlertModal(true);
    }
    else if (address.split(",").length < 3) {
      setMessage("אנא הכניסי כתובת מלאה הכוללת שם רחוב, עיר ומדינה");
      setShowAlertModal(true);
    }
     else {
      const newCloset = {
        //יצירת ארון חדש למשתמשת
        Id: 0,
        Description: ClosetDisc,
        User_name: "null",
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
              email: userEmail,
              phone_number: userPhone,
              full_name: userName,
              password: userPassword,
              address: address,
              isAdmin: false,
              closet_ID: res.data, //הכנסת האיידי של הארון ליוזר החדש
              user_image: difPic, //בהתחלה נכניס תמונה דיפולטית
              age: parseInt(userAge),
              token: expoPushToken,
            };
            console.log("newUser token", newUser.token);

            axios
              .post(
                "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostUser",
                newUser
              )
              .then((res) => {
                setloggedUser(res.data); 
                uploadImageFB(res.data);
              })
              .catch((err) => {
                console.log("Error in user", err);
              });
          }
        })
        .catch((err) => {
          console.log("Error in closet", err);
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

  const uploadImageFB = async (user) => {
    setUploading(true);
    var FBfail = false;

    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename =
      `${user.id}/` + image.uri.substring(image.uri.lastIndexOf("/") + 1);

    try {
      var ref = firebase.storage().ref().child(filename).put(blob);
      await ref;
      var imageRef = firebase.storage().ref().child(filename);
      var imageLink = await imageRef.getDownloadURL();
      setImage(null);
      setUploading(false);

      if (!uploading) {
        navigation.navigate("AccountCreated");
      }
    } catch (error) {
      FBfail = true;
      console.log("error in upload to FB", error);
    }
    if (FBfail) {
      setUploading(false);
      setMessage("קיימת שגיאה בהעלאת התמונה,\n  בנתיים שמנו לך תמונה זמנית 😊");
      setShowAlertModal(true);
      setConfirmAlertModal(true);

      setSelectedTab("Home");
      setTimeout(() => {
        setShowAlertModal(false);
        navigation.navigate("MainLayout");
      }, 2000);
    } else {
      uploadImagesDB(user, imageLink);
    }
  };

  //in order to upload the image to the correct place in the FaireBase i have to get the user's id,
  //in FB we open a file to every user by his id, we get the id only after the  user's post
  //so we must post the user and only then to updat user's image
  const uploadImagesDB = (user, imageLink) => {
    const userWithImage = {
      email: user.email,
      id: user.id,
      closet_id: user.closet_id,
      phone_number: user.phone_number,
      full_name: user.full_name,
      password: user.password,
      address: user.address,
      isAdmin: false,
      user_image: imageLink,
      age: parseInt(userAge),
      token: user.token,
    };
    axios
      .put(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PutUser",
        userWithImage
      )
      .then((res) => {
        setloggedUser(userWithImage); //לאחר ההרשמה היוזר מתחבר ומנווט ישר לארון שלו
      })
      .catch((err) => {
        console.log("err in user DB 2", err);
      });
  };

  function renderContent() {
    return (
      <View style={{ marginBottom: 50 }}>
        <ContainerComponent>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H1,
              color: COLORS.black,
              marginBottom: 20,
              lineHeight: 32 * 1.2,
              textTransform: "capitalize",
            }}
          >
            הצטרפי לקהילה שלנו
          </Text>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
                placeholder="רחוב, עיר, מדינה"
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
                    width: "100%",
                    zIndex: 1,
                  },
                  listView: { position: "absolute", zIndex: 1, top: 50 },
                }}
              />
            </SafeAreaView>

            <SelectList
              placeholder="גיל"
              searchPlaceholder="חיפוש"
              boxStyles={styles.dropdownInput}
              dropdownStyles={styles.dropdownContainer}
              setSelected={(val) => setUserAge(val)}
              data={ageList}
              save="value"
              notFoundText="לא קיים מידע"
              inputStyles={[
                { color: userAge ? "black" : COLORS.lightGray }, // Set color to black if value is selected, otherwise set to gray
              ]}
            />
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

            {image ? (
              <View style={{ alignSelf: "center" }}>
                <Image source={{ uri: image.uri }} style={styles.Image} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setImage(""); // Update the state
                  }}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => pickImage()}>
                  <View style={styles.picturBtn}>
                    <Text
                      style={{
                        color: "gray",
                        textAlign: "center",
                      }}
                    >
                      הוסיפי תמונת פרופיל
                    </Text>
                    <AddSvg></AddSvg>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <UploadModal
              uploading={uploading}
              message="ההרשמה עלולה לקחת זמן, אנא המתיני"
            ></UploadModal>
            <View>
              <Button title="הרשמה" onPress={() => SignUp()} />
            </View>

            <View
              style={{
                // position: "absolute",
                justifyContent: "center",
                alignItems: "flex-end",
                marginBottom: 13,
                flexDirection: "row",
                top: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text
                  style={{
                    ...FONTS.Mulish_400Regular,
                    fontSize: 16,
                    color: COLORS.black,
                  }}
                >
                  {" "}
                  התחברי
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  ...FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: COLORS.gray,
                }}
              >
                כבר חלק מהקהילה?{" "}
              </Text>
            </View>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
          </ScrollView>
        </ContainerComponent>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header
        title="הרשמה"
      
        flag={true}
        onEdit={true}
        showModal={false}
        setShowModal={setShowModal}
        handleSure={() => navigation.goBack()}
        massage={" השינויים לא ישמרו \n האם את בטוחה ?"}
        goBack={true}
      />
      {renderContent()}
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
    // textAlign: "right",
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
