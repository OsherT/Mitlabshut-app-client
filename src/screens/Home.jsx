import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  LogBox,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AREA, COLORS, FONTS } from "../constants";
import { Header, ProfileCategory } from "../components";
import { SearchSvg, SignOutCategory } from "../svg";
import { userContext } from "../navigation/userContext";
import axios from "axios";
import ButtonFollow from "../components/ButtonFollow";
import WarningModal from "../components/WarningModal";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {
    loggedUser,
    setSelectedTab,
    setClosetId_,
    setOwner_,
    sendPushNotification,
  } = useContext(userContext);
  const ApiUrl_user = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User`;

  //users
  const [RecoUsers, setRecoUsers] = useState([]);
  const [UsersFollowingList, setUsersFollowingList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  //modal
  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");

  //general
  const [greeting, setGreeting] = useState("");
  const [Sentence, setSentence] = useState([]);

  //map
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (isFocused) {
      GreetingComponent();
      getFollowingList();
      GetAllUsers();
      GetRecommendedClosets();
      GetSentences();
    }
  }, [isFocused]);

  //map use effect

  useEffect(() => {
    (async () => {
      // Check for location permissions
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});

      // Set map region to current location with zoom level
      let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0901, // Adjust this value for desired zoom level
        longitudeDelta: 0.0741, // Adjust this value for desired zoom level
      };
      setRegion(region);
    })();
  }, []);

  //פונקציה הבודקת איזו שעה ובהתאם לכך מתאימה את הברכה
  function GreetingComponent() {
    const now = new Date();
    const currentHour = now.getHours();
    let newGreeting = "";

    if (currentHour >= 6 && currentHour < 12) {
      newGreeting = "בוקר טוב";
    } else if (currentHour >= 12 && currentHour < 17) {
      newGreeting = "צהריים טובים";
    } else if (currentHour >= 17 && currentHour < 21) {
      newGreeting = "ערב טוב";
    } else {
      newGreeting = "לילה טוב";
    }

    setGreeting(newGreeting);
  }
  //מרנדרת את הברכה המכילה שם תמונה ואופציה להתנתקות
  function RenderGreeting() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
          backgroundColor: COLORS.white,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
          <ProfileCategory
            icon={<SignOutCategory />}
            arrow={false}
            onPress={() => {
              setShowModal(true);
              setMassage(" האם את בטוחה שאת רוצה \n להתנתק ?");
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 18,
              textTransform: "capitalize",
              color: COLORS.black,
              lineHeight: 20 * 1.2,
              marginRight: 3,
            }}>
            {loggedUser.full_name}!
          </Text>
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 23,
              textTransform: "capitalize",
              color: COLORS.gray,
              lineHeight: 20 * 1.2,
            }}>
            {greeting},
          </Text>
          {loggedUser.user_image && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTab("Profile");
              }}>
              <Image
                source={{ uri: loggedUser.user_image }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 50,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
  //קבלת כל המשפטים מהשרת
  function GetSentences() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetSentences"
      )
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setSentence(res.data[randomIndex].content);
      })
      .catch((err) => {
        console.log("err in GetSentences", err);
      });
  }
  //רינדור המשפטים באופן רנדומלי
  function RenderSentences() {
    if (Sentence !== null) {
      return (
        <View
          style={{
            borderWidth: 0,
            borderRadius: 10,
            padding: 30,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 20,
            overflow: "hidden",
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "italic",
              textAlign: "center",
              margin: 20,
              color: "#333",
            }}>
            "{Sentence}"
          </Text>
        </View>
      );
    }
  }
  //קבלת הארונות המומלצים לפי האלגוריתם
  function GetRecommendedClosets() {
    axios
      .get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/cheackStep3/User_ID/${loggedUser.id}?closetID=${loggedUser.closet_id}`
      )
      .then((res) => {
        GetUsersData1(res.data);
      })
      .catch((err) => {
        console.log("err in GetRecommendedClosets", err);
      });
  }
  //קבלת היוזרים עבור הארונות המומלצים
  function GetUsersData1(closets) {
    const promises = closets.map((closet) =>
      axios.get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserByClosetId/Closet_ID/${closet.closet_ID}`
      )
    );

    Promise.all(promises)
      .then((responses) => {
        const users = responses.flatMap((res) => res.data);
        setRecoUsers(users);
      })
      .catch((err) => {
        console.log("err in GetUsersData1", err);
      });
  }
  //קבלת הארונות שאני עוקבת אחריהם
  function getFollowingList() {
    axios
      .get(ApiUrl_user + `/GetClosetByUserID/User_ID/${loggedUser.id}`)
      .then((res) => {
        if (res.data === "No closets yet") {
          setUsersFollowingList([]);
        } else {
          const tempUsersFollowList = res.data.map(
            ({ closet_id }) => closet_id
          );
          setUsersFollowingList(tempUsersFollowList);
        }
      })
      .catch((err) => {
        console.log("cant get following list", err);
      });
  }
  //מעקב אחרי ארון
  const followCloset = (closetID) => {
    axios
      .post(
        ApiUrl_user +
          `/PostFollowingCloset/User_ID/${loggedUser.id}/Closet_ID/${closetID}`
      )
      .then((res) => {
        setUsersFollowingList((prevList) => [...prevList, { closetID }]);
        getFollowingList();
      })
      .catch((err) => {
        console.log("cant follow", err);
      });
  };
  //הוררדת מעקב אחרי ארון
  const unfollowCloset = (closetID) => {
    axios
      .delete(
        ApiUrl_user + `/Delete/Closet_ID/${closetID}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        setUsersFollowingList((prevList) =>
          prevList.filter((id) => id !== closetID)
        );
        getFollowingList();
      })
      .catch((err) => {
        console.log("cant unfollow", err);
      });
  };
  //קבלת כל המשתמשים
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
          setAllUsers(data);
        },
        (error) => {
          console.log("GetAllUsers error", error);
        }
      );
  };
  //התנתקות מהאפליקציה
  function LogOut() {
    navigation.navigate("LogIn");
  }
  //רינדור הארונות המומלצים שקיבלנו מהאלגוריתם עם כפתור המאפשר לעקוב אחריהם
  function renderRecommendedClosets() {
    return (
      <View
        style={{
          marginTop: 20,
          alignItems: "flex-end",
          borderRadius: 25,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Add this line for Android compatibility
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 10,
          }}>
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 16,
              textTransform: "capitalize",
              color: COLORS.black,
              lineHeight: 20 * 1.2,
            }}>
            ארונות מומלצים במיוחד בשבילך
          </Text>
        </View>
        <FlatList
          data={RecoUsers}
          horizontal={true}
          keyExtractor={(user) => user.id}
          renderItem={({ item: user, index }) => {
            return (
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: 180,
                  backgroundColor: COLORS.white,
                  marginRight: 15,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setSelectedTab("Closet");
                  setClosetId_(user.closet_id);
                  setOwner_(user);
                }}>
                <Image
                  source={{ uri: user.user_image }}
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                  }}>
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 15,
                      textTransform: "capitalize",
                      color: COLORS.black,
                      marginBottom: 5,
                      textAlign: "center",
                    }}>
                    הארון של {user.full_name}
                  </Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    {!UsersFollowingList.includes(user.closet_id) && (
                      <ButtonFollow
                        title="עקבי"
                        backgroundColor={COLORS.golden}
                        textColor={COLORS.white}
                        containerStyle={{ marginBottom: 13 }}
                        onPress={async () => {
                          await Promise.all([
                            followCloset(user.closet_id),
                            sendPushNotification(
                              user.token,
                              "follow",
                              loggedUser.full_name
                            ),
                          ]);
                        }}
                      />
                    )}
                    {UsersFollowingList.includes(user.closet_id) && (
                      <ButtonFollow
                        title="הסירי עוקב"
                        backgroundColor={COLORS.goldenTransparent_03}
                        textColor={COLORS.black}
                        containerStyle={{ marginBottom: 13 }}
                        onPress={() => {
                          unfollowCloset(user.closet_id);
                        }}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  //רינדור כל המשתמשים באפליקציה
  function renderAllUsers() {
    return (
      <View
        style={{
          marginTop: 25,
          alignItems: "flex-end",
          borderRadius: 25,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Add this line for Android compatibility
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab("SearchAllUsers");
            }}>
            <Text
              style={{
                ...FONTS.Mulish_700Bold,
                fontSize: 16,
                textTransform: "capitalize",
                color: COLORS.black,
                lineHeight: 20 * 1.2,
              }}>
              חברות קהילה חדשות... <SearchSvg />
            </Text>
          </TouchableOpacity>
        </View>

        {allUsers.length > 0 ? (
          <FlatList
            data={allUsers}
            horizontal={true}
            keyExtractor={(user) => user.closet_id}
            renderItem={({ item: user, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: 105,
                    marginRight: 15,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setSelectedTab("Closet");
                    setClosetId_(user.closet_id);
                    setOwner_(user);
                  }}>
                  <View
                    style={{
                      height: 106,
                      borderRadius: 90,
                      backgroundColor: COLORS.white,
                      paddingTop: 3,
                      paddingHorizontal: 3,
                    }}>
                    <Image
                      source={{ uri: user.user_image }}
                      style={{
                        width: "100%",
                        height: 100,
                        borderRadius: 90,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                    }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_600SemiBold,
                        fontSize: 15,
                        textTransform: "capitalize",
                        color: COLORS.black,
                        textAlign: "center",
                      }}>
                      {user.full_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 14,
              color: COLORS.black,
              lineHeight: 20 * 1.2,
              textAlign: "center",
            }}>
            אין משתמשים כרגע{" "}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          ...AREA.AndroidSafeArea,
          backgroundColor: "none",
        }}>
        <Header goBack={false} />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}>
          {RenderGreeting()}
          {renderAllUsers()}
          {RenderSentences()}
          {renderRecommendedClosets()}
          {showModal && (
            <WarningModal
              showModal={showModal}
              setShowModal={setShowModal}
              massage={massage}
              handleSure={LogOut}
            />
          )}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapStyle}
              region={region}
              showsUserLocation={true}>
              {region && <Marker coordinate={region} />}
            </MapView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    margin: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
  mapStyle: {
    flex: 1,
  },
});
