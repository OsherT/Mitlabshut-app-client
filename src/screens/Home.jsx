import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { promo, SIZES, COLORS, products, FONTS, AREA } from "../constants";
import { RatingComponent, Line, Header, ProfileCategory } from "../components";
import { BagSvg, HeartSvg, SignOutCategory } from "../svg";
import { userContext } from "../navigation/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import ButtonFollow from "../components/ButtonFollow";
import Quote from "../svg/Quote";
import WarningModal from "../components/WarningModal";
import PushNotification from "./PushNotification";

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { loggedUser, setSelectedTab, setClosetId_, setOwner_ } =
    useContext(userContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [RecoUsers, setRecoUsers] = useState([]);
  const [OtherClosets, setOtherClosets] = useState([]);
  const ApiUrl_user = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User`;
  const [UsersFollowingList, setUsersFollowingList] = useState([]);
  const [CombainedArray, setCombainedArray] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [Sentence, setSentence] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");

  ////////push/////////
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //       // פה נעשה את הפעולה שנרצה לאחר שהמשתמש לחץ על ההתרא, לדוגמא ניווט לארון של היוזר שעקב אחריו
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);

  //       // פה נעשה את הפעולה שנרצה לאחר שהמשתמש לחץ על ההתרא, לדוגמא ניווט לארון של היוזר שעקב אחריו
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  ///////push//////////

  useEffect(() => {
    if (isFocused) {
      GreetingComponent();
      getFollowingList();
      GetRecommendedClosets();
      GetSentences();
    }
  }, [isFocused]);

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
  function RenderGreeting() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
          backgroundColor: COLORS.white,
          borderRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Add this line for Android compatibility
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
              //marginTop:10
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

              //marginTop:10
            }}>
            {greeting},
          </Text>
          {loggedUser.user_image && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTab("Closet");
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
        console.log(err);
      });
  }

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
            marginTop: 30,
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

  function GetRecommendedClosets() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/cheackStep3/User_ID/" +
          loggedUser.id
      )
      .then((res) => {
        GetUsersData1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
        console.log(err);
      });
  }
  function getFollowingList() {
    axios
      .get(ApiUrl_user + `/GetClosetByUserID/User_ID/${loggedUser.id}`)
      .then((res) => {
        if (res.data == "No closets yet") {
          setUsersFollowingList("");
        } else {
          const tempUsersFollowList = res.data.map(
            ({ closet_id }) => closet_id
          );
          //console.log(tempUsersFollowList);
          setUsersFollowingList(tempUsersFollowList);
        }
      })
      .catch((err) => {
        console.log("cant get following list", err);
      });
  }
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

  //handle the sign out
  function handleUserChoice() {
    navigation.navigate("SignIn");
  }

  function renderBestSellers() {
    return (
      <View
        style={{
          marginTop: 30,
          alignItems: "flex-end",
          //backgroundColor: COLORS.goldenTransparent_03,

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
            marginTop: 10,
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
                }}
                >
                <Image
                  source={{ uri: user.user_image }}
                  style={{
                    width: "100%",
                    height: 180,
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
                        onPress={() => {
                          followCloset(user.closet_id);
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

  //   function updateCurrentSlideIndex(e) {
  //     const contentOffsetX = e.nativeEvent.contentOffset.x;
  //     const currentIndex = Math.round(contentOffsetX / SIZES.width);
  //     setCurrentSlideIndex(currentIndex);
  //   }
  //   //render the sliders dots
  //   function renderDots() {
  //     return (
  //       <View>
  //         <View
  //           style={{
  //             alignItems: "center",
  //             justifyContent: "center",
  //             flexDirection: "row",
  //           }}
  //         >
  //           {promo.map((_, index) => {
  //             return (
  //               <View
  //                 key={index}
  //                 style={[
  //                   styles.dot,
  //                   currentSlideIndex == index && {
  //                     width: 22,
  //                   },
  //                 ]}
  //               />
  //             );
  //           })}
  //         </View>
  //       </View>
  //     );
  //   }

  //   //the big image in the page
  //   function renderSlide() {
  //     return (
  //       <View
  //         style={{
  //           borderBottomLeftRadius: 20,
  //           borderBottomRightRadius: 20,
  //           overflow: "hidden",
  //         }}
  //       >
  //         <FlatList
  //           data={promo}
  //           keyExtractor={(item) => item.id.toString()}
  //           horizontal={true}
  //           pagingEnabled={true}
  //           showsHorizontalScrollIndicator={false}
  //           onMomentumScrollEnd={updateCurrentSlideIndex}
  //           renderItem={({ item, index, separators }) => (
  //             <View key={item.key} style={{ width: SIZES.width, height: 356 }}>
  //               <ImageBackground
  //                 source={item.photo_1125x1068}
  //                 style={{ width: "100%", height: "100%" }}
  //               ></ImageBackground>
  //             </View>
  //           )}
  //         />
  //       </View>
  //     );
  //   }

  //   function renderFeaturedProducts() {
  //     return (
  //       <View style={{ paddingHorizontal: 20 }}>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-between",
  //             marginBottom: 16,
  //           }}
  //         >
  //           <Text
  //             style={{
  //               ...FONTS.Mulish_700Bold,
  //               fontSize: 20,
  //               textTransform: "capitalize",
  //               color: COLORS.black,
  //               lineHeight: 20 * 1.2,
  //             }}
  //           >
  //             Featured Products
  //           </Text>
  //         </View>
  //         {products.map((item, index) => {
  //           return (
  //             item.featuredProducts === true && (
  //               <TouchableOpacity
  //                 key={index}
  //                 style={{
  //                   width: "100%",
  //                   height: 100,
  //                   backgroundColor: COLORS.white,
  //                   marginBottom: 15,
  //                   borderRadius: 10,
  //                   flexDirection: "row",
  //                 }}
  //                 onPress={() =>
  //                   navigation.navigate("ProductDetails", {
  //                     productDetails: item,
  //                     productSlides: item.slides,
  //                   })
  //                 }
  //               >
  //                 <ImageBackground
  //                   source={item.photo_300x300}
  //                   style={{
  //                     width: 100,
  //                     height: "100%",
  //                   }}
  //                   imageStyle={{ borderRadius: 10 }}
  //                 >
  //                   <RatingComponent
  //                     item={item}
  //                     containerStyle={{
  //                       bottom: 2,
  //                       left: 2,
  //                       borderBottomLeftRadius: 10,
  //                       borderTopRightRadius: 10,
  //                     }}
  //                     onPress={() => navigation.navigate("Reviews")}
  //                   />
  //                 </ImageBackground>
  //                 <View
  //                   style={{
  //                     paddingHorizontal: 15,
  //                     paddingVertical: 11,
  //                     flex: 1,
  //                   }}
  //                 >
  //                   <Text
  //                     style={{
  //                       ...FONTS.Mulish_600SemiBold,
  //                       fontSize: 14,
  //                       textTransform: "capitalize",
  //                       marginBottom: 6,
  //                     }}
  //                   >
  //                     {item.name}
  //                   </Text>
  //                   <Text
  //                     style={{
  //                       color: COLORS.gray,
  //                       ...FONTS.Mulish_400Regular,
  //                       fontSize: 14,
  //                     }}
  //                   >
  //                     {item.size}
  //                   </Text>
  //                   <Line />
  //                   <Text
  //                     style={{
  //                       ...FONTS.Mulish_600SemiBold,
  //                       fontSize: 14,
  //                       color: COLORS.carrot,
  //                     }}
  //                   >
  //                     {item.price}
  //                   </Text>
  //                 </View>
  //                 <TouchableOpacity
  //                   style={{
  //                     position: "absolute",
  //                     width: 30,
  //                     height: 30,
  //                     right: 15,
  //                     bottom: 11,
  //                     justifyContent: "center",
  //                     alignItems: "center",
  //                   }}
  //                   onPress={() => {
  //                     showMessage({
  //                       message: `${item.name} has been added`,
  //                       type: "info",
  //                     });
  //                   }}
  //                 >
  //                   <BagSvg />
  //                 </TouchableOpacity>
  //                 <TouchableOpacity
  //                   style={{
  //                     position: "absolute",
  //                     width: 30,
  //                     height: 30,
  //                     right: 15,
  //                     top: 8,
  //                     justifyContent: "center",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <HeartSvg />
  //                 </TouchableOpacity>
  //               </TouchableOpacity>
  //             )
  //           );
  //         })}
  //       </View>
  //     );
  //   }

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        top: 50,
      }}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}>
      {/* {renderSlide()}
      {renderDots()} */}
      {RenderGreeting()}
      {RenderSentences()}
      {renderBestSellers()}
      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          massage={massage}
          handleSure={handleUserChoice}
        />
      )}
      {/* <PushNotification></PushNotification>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      /> */}
      {/* {renderFeaturedProducts()} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.black,
    marginTop: 20,
    marginBottom: 40,
  },
});
