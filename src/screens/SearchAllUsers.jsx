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
import { ContainerComponent, Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { Empty, FilterSvg, SearchSvg } from "../svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userContext } from "../navigation/userContext";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchAllUsers() {
  const navigation = useNavigation();
  const [searchName, setSearchName] = useState("");
  const { loggedUser, setSelectedTab, setClosetId_, setOwner_ } =
    useContext(userContext);
  const isFocused = useIsFocused();
  //   const [usersFollow, setUsersFollow] = useState([]);
  const [noRes, setNoRes] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (isFocused || searchName == "") {
      GetAllUsers();
      setNoRes(false);
    }
  }, [isFocused, searchName]);

  const GetAllUsers = () => {
    fetch(
      "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetAllUsersNotThisOne/UserID/" +
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
          console.log("data", data);
          setAllUsers(data);
        },
        (error) => {
          console.log("GetAllUsers error", error);
        }
      );
  };

  //returns the search res
  const SearchUserByName = () => {
    axios
      .get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserByFullName/FullName/${searchName}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        if (res.data != 0) {
          const tempArray = res.data.filter((d) => {
            return allUsers.some((u) => u.id === d.id);
          });
          setAllUsers(tempArray);
        } else {
          console.log("NO RES");
          setNoRes(true);
        }
      })
      .catch((err) => {
        console.log("SearchUserByName error", err);
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
        {allUsers.length > 0 && (
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
                    SearchUserByName();
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
              onSubmitEditing={({ nativeEvent }) => {
                if (searchName != "") {
                  SearchUserByName();
                  setSearchName(nativeEvent.text);
                }
              }}
              keyboardType="default"
              returnKeyType="search"
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
        {allUsers.length > 0 ? (
          <View style={{ paddingHorizontal: 20 }}>
            {allUsers.map((user, index) => {
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
                  onPress={() => {
                    setSelectedTab("Closet");
                    setClosetId_(user.closet_id);
                    setOwner_(user);
                  }}>
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
            אין משתמשות פעילות{" "}
          </Text>
        )}
      </KeyboardAwareScrollView>
    );
  }

  //shows no res when there is no data to show
  function noSearchResults() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          alignItems: "center",
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <View style={{ alignSelf: "center", marginBottom: 35 }}>
            <Empty />
          </View>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.H2,
              textTransform: "capitalize",
              color: COLORS.black,
              lineHeight: 22 * 1.2,
              marginBottom: 18,
            }}>
            לא קיים מידע
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_400Regular,
              fontSize: 16,
              color: COLORS.gray,
              paddingHorizontal: 50,
              marginBottom: 30,
            }}>
            לא נמצאו משתמשים התואמים את החיפוש שלך{" "}
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => setSelectedTab("Home")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
                paddingHorizontal: 4,
                marginBottom: 15,
                backgroundColor: "#F2F2F2",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#E5E5E5",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#333",
                  marginLeft: 8,
                }}>
                חזרה לדף הבית
              </Text>
            </TouchableOpacity>
          </View>
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Header title=" משתמשות " goBack={false} flag={false} />
      {renderSearch()}
      {!noRes ? renderUsers() : noSearchResults()}
    </SafeAreaView>
  );
}
