import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import {
  Header,
  ContainerComponent,
  ProfileCategory,
  Line,
} from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import {
  Edit,
  OrderCategory,
  PaymentCategory,
  AdressCategory,
  PromocodesCategory,
  FAQCategory,
  SignOutCategory,
} from "../svg";
import { userContext } from "../navigation/userContext";
import { FlatList } from "react-native";
import { Image } from "react-native";
import WarningModal from "../components/WarningModal";

export default function Profile() {
  const navigation = useNavigation();
  const { loggedUser, setloggedUser } = useContext(userContext);
  const isFocused = useIsFocused();
  const [usersFollow, setUsersFollow] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");

  useEffect(() => {
    if (isFocused) {
      GetUsersFollow();
    }
  }, [isFocused]);

  const GetUsersFollow = () => {
    fetch(
      "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/GetClosetsByUserNotFollowing/UserId/" +
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
          console.log("GetUsersFollow", data);
          setUsersFollow(data);
        },
        (error) => {
          console.log("GetUsersFollow error", error);
        }
      );
  };

  // function SignOutModal() {
  //   return (
  //     <Modal
  //       isVisible={showModal}
  //       onBackdropPress={setShowModal}
  //       hideModalContentWhileAnimating={true}
  //       backdropTransitionOutTiming={0}
  //       style={{ margin: 0 }}
  //       animationIn="zoomIn"
  //       animationOut="zoomOut">
  //       <View
  //         style={{
  //           width: SIZES.width - 60,
  //           backgroundColor: COLORS.white,
  //           marginHorizontal: 30,
  //           borderRadius: 10,
  //           paddingHorizontal: 20,
  //           paddingVertical: 34,
  //         }}>
  //         <Text
  //           style={{
  //             textAlign: "center",
  //             ...FONTS.Mulish_600SemiBold,
  //             fontSize: 20,
  //             marginBottom: 26,
  //           }}>
  //           האם את בטוחה שאת רוצה{"\n"} להתנתק ?
  //         </Text>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}>
  //           <TouchableOpacity
  //             style={{
  //               width: 130,
  //               height: 40,
  //               backgroundColor: COLORS.golden,
  //               borderRadius: 20,
  //               justifyContent: "center",
  //               alignItems: "center",
  //               marginHorizontal: 7.5,
  //               borderColor: COLORS.goldenTransparent_05,
  //               borderWidth: 1,
  //             }}
  //             onPress={() => setShowModal(false)}>
  //             <Text
  //               style={{
  //                 color: COLORS.white,
  //                 ...FONTS.Mulish_600SemiBold,
  //                 fontSize: 14,
  //                 color: COLORS.red,
  //                 textTransform: "uppercase",
  //               }}>
  //               ביטול
  //             </Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={{
  //               width: 130,
  //               height: 40,
  //               backgroundColor: COLORS.white,
  //               borderRadius: 20,
  //               justifyContent: "center",
  //               alignItems: "center",
  //               marginHorizontal: 7.5,
  //               borderColor: COLORS.goldenTransparent_05,
  //               borderWidth: 1,
  //             }}
  //             onPress={() => {
  //               setShowModal(false);
  //               setloggedUser(null);
  //               navigation.navigate("SignIn");
  //             }}>
  //             <Text
  //               style={{
  //                 color: COLORS.black,
  //                 ...FONTS.Mulish_600SemiBold,
  //                 fontSize: 14,
  //                 textTransform: "uppercase",
  //               }}>
  //               אישור
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
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
              imageStyle={{ borderRadius: 40 }}></ImageBackground>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditProfile");
              }}>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 70,
                }}>
                <Edit />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_700Bold,
                fontSize: 16,
                textTransform: "capitalize",
                color: COLORS.black,
                marginBottom: 4,
                lineHeight: 16 * 1.2,
              }}>
              {loggedUser.full_name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_400Regular,
                fontSize: 14,
                color: COLORS.gray,
                lineHeight: 14 * 1.7,
              }}>
              {loggedUser.email}
            </Text>
          </TouchableOpacity>
        </ContainerComponent>
        <ContainerComponent>
          <ProfileCategory
            icon={<SignOutCategory />}
            title="התנתקי"
            containerStyle={{ marginBottom: 10 }}
            arrow={false}
            onPress={() => {
              setShowModal(true);
              setMassage(" האם את בטוחה שאת רוצה \n להתנתק ?");
            }}
          />
          {/* <ProfileCategory
            icon={<OrderCategory />}
            title="Order History"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("OrderHistory")}
          />
          <ProfileCategory
            icon={<PaymentCategory />}
            title="Payment Method"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("PaymentMethod")}
          />
          <ProfileCategory
            icon={<AdressCategory />}
            title="My Adress"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("MyAddress")}
          /> */}
          {/* <ProfileCategory
            icon={<PromocodesCategory />}
            title="My Promocodes"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("MyPromocodes")}
          />
          <ProfileCategory
            icon={<FAQCategory />}
            title="FAQ"
            containerStyle={{ marginBottom: 10 }}
            onPress={() => navigation.navigate("FAQ")}
          /> */}
        </ContainerComponent>
      </ScrollView>
    );
  }

  function renderUsersFollow() {
    return (
      <View style={{ marginBottom: 40 }}>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 16,
          }}>
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 20,
              textTransform: "capitalize",
              color: COLORS.black,
              lineHeight: 20 * 1.2,
            }}>
            ארונות במעקב...
          </Text>
        </View>
        <FlatList
          data={usersFollow}
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
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    productDetails: item,
                    productSlides: item.slides,
                  })
                }>
                <Image
                  source={{ uri: loggedUser.user_image }}
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
                    הארון של {loggedUser.full_name}
                  </Text>
                  {/* <View
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
                  </View> */}
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

  // function renderUsersFollow() {
  //   return (
  //     <View style={{ paddingHorizontal: 20 }}>
  //       <ScrollView>
  //         <View
  //           style={{
  //             position: "absolute",
  //             flexDirection: "row-reverse",
  //             justifyContent: "space-between",
  //             marginBottom: 16,
  //             // height: 350,
  //             padding: 10,
  //             // backgroundColor:"red",
  //           }}>
  //           <Text
  //             style={{
  //               ...FONTS.Mulish_700Bold,
  //               fontSize: 20,
  //               color: COLORS.black,
  //               lineHeight: 20 * 1.2,
  //             }}>
  //             עוקבת אחרי...
  //           </Text>
  //         </View>
  //         {usersFollow.map((item, index) => {
  //           return (
  //             <TouchableOpacity
  //               key={index}
  //               style={{
  //                 width: "50%",
  //                 // height: 100,
  //                 backgroundColor: COLORS.white,
  //                 marginBottom: 15,
  //                 borderRadius: 10,
  //                 flexDirection: "row",
  //               }}
  //               // לתקן שיעביר למשתמש הרצוי
  //               onPress={() =>
  //                 navigation.navigate("Closet", {
  //                   productDetails: item,
  //                   productSlides: item.slides,
  //                 })
  //               }>
  //               <View
  //                 style={{
  //                   paddingHorizontal: 15,
  //                   paddingVertical: 11,
  //                   flex: 1,
  //                 }}>
  //                 <Text
  //                   style={{
  //                     ...FONTS.Mulish_600SemiBold,
  //                     fontSize: 14,
  //                     textTransform: "capitalize",
  //                     marginBottom: 6,
  //                   }}>
  //                   {item.closet_ID}
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     color: COLORS.gray,
  //                     ...FONTS.Mulish_400Regular,
  //                     fontSize: 14,
  //                   }}>
  //                   {item.size}
  //                 </Text>
  //                 <Line />
  //                 <Text
  //                   style={{
  //                     ...FONTS.Mulish_600SemiBold,
  //                     fontSize: 14,
  //                     color: COLORS.carrot,
  //                   }}>
  //                   {usersFollow.closet_ID}
  //                 </Text>
  //               </View>
  //               <ImageBackground
  //                 source={{
  //                   uri: loggedUser.user_image,
  //                 }}
  //                 style={{
  //                   width: 100,
  //                   height: "100%",
  //                 }}
  //                 imageStyle={{ borderRadius: 10 }}></ImageBackground>
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </ScrollView>
  //     </View>
  //   );
  // }
  function handleUserChoice() {
    navigation.navigate("SignIn");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Header title="עמוד אישי" goBack={true} />
      {renderContent()}
      {renderUsersFollow()}
      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          massage={massage}
          handleSure={handleUserChoice}
        />
      )}
      {/* {<SignOutModal />} */}
    </SafeAreaView>
  );
}
