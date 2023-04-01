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
import { Header, ContainerComponent, ProfileCategory } from "../components";
import { COLORS, FONTS } from "../constants";
import { Edit, SignOutCategory } from "../svg";
import { userContext } from "../navigation/userContext";
import { FlatList } from "react-native";
import { Image } from "react-native";
import WarningModal from "../components/WarningModal";

export default function Profile() {
  const navigation = useNavigation();
  const { loggedUser, setSelectedTab } = useContext(userContext);
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
          <TouchableOpacity
            onPress={() => {
              setSelectedTab("Closet");
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
              imageStyle={{ borderRadius: 40 }}></ImageBackground>

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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}>
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 120,
              }}>
              <Edit />
            </View>
          </TouchableOpacity>
        </ContainerComponent>

        {renderUsersFollow()}

        <ContainerComponent>
          <ProfileCategory
            icon={<SignOutCategory />}
            title="התנתקי"
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
          />
          <ProfileCategory
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
            marginBottom: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Users");
            }}>
            <Text
              style={{
                ...FONTS.Mulish_700Bold,
                fontSize: 20,
                color: COLORS.black,
                lineHeight: 20 * 1.2,
              }}>
              ארונות במעקב...
            </Text>
          </TouchableOpacity>
        </View>

        {usersFollow.length > 0 ? (
          <FlatList
            data={usersFollow}
            horizontal={true}
            keyExtractor={(user) => user.id}
            renderItem={({ item: user, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: 170,
                    backgroundColor: COLORS.white,
                    marginRight: 15,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("Closet", {
                      closetId: user.closet_id,
                      owner: user,
                      // productSlides: item.slides,
                    })
                  }>
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
            אין ארונות במעקב עדיין
          </Text>
        )}
      </View>
    );
  }

  function handleUserChoice() {
    navigation.navigate("SignIn");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Add this line for Android compatibility
      }}>
      <Header title="עמוד אישי" goBack={false} />
      {renderContent()}
      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          massage={massage}
          handleSure={handleUserChoice}
        />
      )}
    </SafeAreaView>
  );
}
