import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { FilterSvg, SearchSvg } from "../svg";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userContext } from "../navigation/userContext";

export default function Search() {
  const navigation = useNavigation();
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api`;

  const [typeList, setTypeList] = useState([]);
  const [typeBySearch, setTypeBySearch] = useState("");
  const [search, setsearch] = useState("");
  const { loggedUser, setloggedUser } = useContext(userContext);
  const isFocused = useIsFocused();
  const [usersFollow, setUsersFollow] = useState([]);

  useEffect(() => {
    if (isFocused) {
      GetUsersFollow();
    }
  }, [isFocused]);

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

  //renders the search section (upper)
  function renderSearch() {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 20,
        }}>
        <View
          style={{
            width: "100%",
            height: 44,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchRes", {
                  searchText: search,
                })
              }>
              <SearchSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right" }}
            placeholder="חפשי משתמש..."
            onChangeText={(text) => setsearch(text)}
            keyboardType="web-search"
            defaultValue=""
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            onPress={() => navigation.navigate("Filter")}>
            <FilterSvg />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //renders all the users i follow
  function renderUsers() {
    return (
      <KeyboardAwareScrollView>
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
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Header title="חיפוש משתמשים" goBack={false} />
      {renderSearch()}
      {renderUsers()}
    </SafeAreaView>
  );
}
