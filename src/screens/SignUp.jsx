import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button, ContainerComponent } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { EyeOff, Check } from "../svg";
import { TextInput } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

export default function SignUp() {
  const difPic =
  "https://images.squarespace-cdn.com/content/v1/5beb55599d5abb5a47cc4907/1610465905997-2G8SGHXIYCGTF9BQB0OD/female+girl+woman+icon.jpg?format=500w";
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userClosetId, setUserClosetId] = useState("");

  //https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/

  const SignUp = () => {
    if (
      userName == "" ||
      userEmail == "" ||
      userPassword == "" ||
      userPhone == ""
    ) {
      //Remember to add location!!!!
      alert("אנא הכניסי את כל הפרטים הנדרשים");
    } 
    else {
      const newCloset = {
        Id: 0,
        Description: "היי, זה הארון החדש שלי!",
      };
      axios
        .post(
          "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet",
          newCloset
        )
        .then((res) => {
          if (res.data != 0) {
            const newUser = {
              Email: userEmail,
              Phone_number: userPhone,
              Full_name: userName,
              Password: userPassword,
              Address: "נחל צבי 13 א מגדל העמק", //To change
              IsAdmin: false,
              Closet_ID: res.data,
              User_image: difPic,
            };
            axios
          .post(
            "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User",
            newUser
          )
          .then((res) => {
            alert("🦄");
          })
          .catch((err) => {
            alert("Error in user");
            console.log(err);
          });      
          }
        })
        .catch((err) => {
          alert("Error in closet");
        });
      }
    }
    



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
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H1,
              color: COLORS.black,
              marginBottom: 30,
              lineHeight: 32 * 1.2,
              textTransform: "capitalize",
            }}>
            הצטרפות לקהילה
          </Text>
          <InputField
            placeholder="שם מלא"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserName(text)}
            // icon={<Check color={COLORS.gray} />}
          />
          <InputField
            placeholder="מייל"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserEmail(text)}

            //icon={<Check color={COLORS.gray} />}
          />
          <InputField
            placeholder="סיסמה"
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(text) => setUserPassword(text)}
          />
          <View style={styles.view}>
            <TextInput
              style={styles.input}
              placeholder="מספר טלפון"
              keyboardType="phone-pad"
              onChangeText={(text) => setUserPhone(text)}
            />
          </View>
          {/* <SafeAreaView style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="כתובת"
              keyboardShouldPersistTaps="always"
              onPress={(data) => {
                setUserLocation(data);
              }}
              query={{
                key: "AIzaSyAaCpPtzL7apvQuXnKdRhY0omPHiMdc--s",
                language: "he",
              }}
            />
          </SafeAreaView> */}

          <Button title="הרשמה" onPress={SignUp} />
        </ContainerComponent>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            flex: 1,
            marginBottom: 13,
            flexDirection: "row",
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
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="Sign Up" onPress={() => navigation.goBack()} />
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
  input: {
    flex: 1,
    paddingRight: 15,
    textAlign: "right",
  },
});
