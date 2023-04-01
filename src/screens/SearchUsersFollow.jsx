import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { SearchSvg } from "../svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userContext } from "../navigation/userContext";
import axios from "axios";

export default function SearchUsersFollow() {
  const navigation = useNavigation();

  const [searchName, setSearchName] = useState("");
  const { loggedUser, setloggedUser } = useContext(userContext);
  const isFocused = useIsFocused();
  const [usersFollow, setUsersFollow] = useState([]);

  useEffect(() => {
    if (isFocused || searchName == "") {
      GetUsersFollow();
    }
  }, [isFocused, searchName]);

  const GetUsersFollow = () => {
    fetch(
      "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserFollowingByUser/LoggedUser/" +
        loggedUser.id,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          setUsersFollow(data);
        },
        (error) => {
          console.log("GetUsersFollow error", error);
        }
      );
  };

  //returns the search res
  const searchUserByName = () => {
    axios
      .get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserByFullName/FullName/${searchName}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        const tempArray = res.data.filter((d) => {
          return usersFollow.some((u) => u.id === d.id);
        });
        setUsersFollow(tempArray);
      })
      .catch((err) => {
        console.log("searchUserByName error", err);
      });
  };

  //renders the search section (upper)
  function renderSearch() {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 20,
        }}>
        {usersFollow.length > 0 && (
          <View
            style={{
              width: "100%",
              height: 44,
              backgroundColor: COLORS.white,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View style={{ paddingLeft: 15, paddingRight: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  if (searchName != "") {
                    searchUserByName();
                  }
                }}>
                <SearchSvg />
              </TouchableOpacity>
            </View>
            <TextInput
              style={{ flex: 1, textAlign: "right", paddingRight: 15 }}
              placeholder="חפשי משתמש..."
              onChangeText={(text) => {
                setSearchName(text);
              }}
              keyboardType="web-search"
              defaultValue=""
            />
          </View>
        )}
      </View>
    );
  }

  //renders all the users i follow
  function renderUsers() {
    return (
      <KeyboardAwareScrollView>
        {usersFollow.length > 0 ? (
          <View style={{ paddingHorizontal: 20 }}>
            {usersFollow.map((user, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: "100%",
                    height: 150,
                    backgroundColor: COLORS.white,
                    marginBottom: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("Closet", {
                      closetId: user.closet_id,
                      owner: user,
                    })
                  }>
                  <ImageBackground
                    source={{ uri: user.user_image }}
                    style={{
                      width: 180,
                      height: "97%",
                      margin: 5,
                    }}
                    imageStyle={{ borderRadius: 10 }}></ImageBackground>
                  <View
                    style={{
                      padding: 35,
                      paddingTop: 65,
                      flex: 1,
                      alignContent: "center",
                    }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_400Regular,
                        fontSize: 20,
                        textTransform: "capitalize",
                        marginBottom: 6,
                        textAlign: "right",
                      }}>
                      {user.full_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 16,
              color: COLORS.black,
              lineHeight: 50 * 1.2,
              textAlign: "center",
            }}>
            אין ארונות במעקב עדיין
          </Text>
        )}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Header title=" משתמשות במעקב" goBack={false} flag={false} />
      {renderSearch()}
      {renderUsers()}
    </SafeAreaView>
  );
}
