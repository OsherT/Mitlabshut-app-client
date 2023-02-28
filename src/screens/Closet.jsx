import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../navigation/userContext";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  FlatList,
} from "react-native";
import axios from "axios";
import { Edit, Fail } from "../svg";
import { BagSvg, HeartSvg, Facebook } from "../svg";
import { Header, ContainerComponent, ProfileCategory } from "../components";
import { COLORS, products, FONTS } from "../constants";
import MainLayout from "./MainLayout";
// import Navigation from "../navigation/AppNavigation";
import { useNavigation } from "@react-navigation/native";
import { FilledHeartSvg } from "../svg";

export default function Closet() {
  const { loggedUser } = useContext(userContext);
  const [ClosetDesc, setClosetDesc] = useState("");
  const [ClosetData, setClosetData] = useState("");
  const [UsersItems, setUsersItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [UsersShopList, setUsersShopList] = useState([]);
  //להוסיף כפתור הוספת פריט
  const navigation = useNavigation();

  useEffect(() => {
    GetClosetDescription();
    GetClosetItems();
    GetItemPhotos();
    getFavItems();
    getShopItems;
    return () => {};
  }, [UsersShopList, UsersFavList]);

  function GetClosetDescription() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/" +
          loggedUser.closet_id
      ) //לשנות כשדנה עושה החזרת הדיסקריפשן לפי איידי
      .then((res) => {
        setClosetData(res.data[0]);
        setClosetDesc(res.data[0].description);
      })
      .catch((err) => {
        alert("cant take");
        console.log(err);
      });
  }
  function GetClosetItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/ClosetId/" +
          loggedUser.closet_id
      )
      .then((res) => {
        setUsersItems(res.data);
      })
      .catch((err) => {
        alert("cant take items");
        console.log(err);
      });
  }
  function GetItemPhotos() {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item_Image_Video")
      .then((res) => {
        setUsersItemPhotos(res.data);
      })
      .catch((err) => {
        alert("cant take photos");
        console.log(err);
      });
  }
  function renderUserContent() {
    return (
      <View
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
              imageStyle={{ borderRadius: 40 }}>
              <View
                style={{
                  position: "absolute",
                  right: 3,
                  bottom: 3,
                }}>
                <Edit />
              </View>
            </ImageBackground>
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
              {ClosetDesc}
            </Text>
          </TouchableOpacity>
        </ContainerComponent>
      </View>
    );
  }
  ///handle fav list
  function getFavItems() {
    var Email = loggedUser.email.replace("%40", "@");
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserFavList/User_Email/" +
          Email
      )
      .then((res) => {
        const tempUsersFavList = res.data.map(({ item_ID }) => item_ID);
        setUsersFavList(tempUsersFavList);
      })
      .catch((err) => {
        alert("cant get fav");
        console.log(err);
      });
  }
  function AddtoFav(item_id) {
    var newFav = {
      item_ID: item_id,
      user_Email: loggedUser.email,
    };
    axios
      .post(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserFavList",
        newFav
      )
      .then((res) => {
        alert("added");
        setUsersFavList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        alert("cant add to fav");
        console.log(err);
        // console.log(newFav);
        // console.log(UsersFavList);
        // console.log(
        //   "פה " + UsersFavList.find((obj) => obj.item_ID === 15) !== undefined
        // );
      });
  }
  function RemoveFromFav(itemId) {
    var Email = loggedUser.email.replace("%40", "@");

    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserFavList/Item_ID/${itemId}/User_Email/${Email}`
      )
      .then((res) => {
        setUsersFavList((prevList) => prevList.filter((id) => id !== itemId));
        alert("removed " + itemId);
      })
      .catch((err) => {
        alert("cant remove from fav");
        console.log(err);
        console.log(newFav);
      });
  }
  ///handle shop list
  function getShopItems() {
    var Email = loggedUser.email.replace("%40", "@");
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserShopList/User_Email/" +
          Email
      )
      .then((res) => {
        const tempUsersShopList = res.data.map(({ item_ID }) => item_ID);
        setUsersShopList(tempUsersShopList);
        console.log(tempUsersShopList);
      })
      .catch((err) => {
        alert("cant get shop list");
        console.log(err);
      });
  }
  function AddToShopList(item_id) {
    var newitemInBag = {
      item_ID: item_id,
      user_Email: loggedUser.email,
    };
    axios
      .post(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserShopList",
        newitemInBag
      )
      .then((res) => {
        alert("added");
        setUsersShopList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        alert("cant add to shop list");
        console.log(err);
      });
  }
  function RemoveFromShopList(itemId) {
    setUsersShopList((prevList) => prevList.filter((id) => id !== itemId));
    alert("removed from shop list " + itemId);

    // axios
    // .delete(
    //   "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserFavList",
    //   newFav
    // )
    // .then((res) => {
    //   alert("added");
    //   setUsersFavList((prevList) => [
    //     ...prevList,
    //     { isFavorite: true, item_ID: item_id },
    //   ]);
    // })
    // .catch((err) => {
    //   alert("cant add to fav");
    //   console.log(err);
    //   console.log(newFav);
    // });
  }
  ///render items
  function renderClothes() {
    return (
      <FlatList
        data={UsersItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "47.5%",
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
            onPress={() => {

              console.log(item.id);
              navigation.navigate("ProductDetails", {
                item: item,
                closet: ClosetData,
                closet_id: loggedUser.closet_id,
                slides: item.slides,
              });
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
          >
            {UsersItemPhotos.filter((photo) => photo.item_ID === item.id)
              .slice(0, 1)
              .map((photo) => {
                return (
                  <ImageBackground
                    source={{ uri: photo.src }}
                    style={{
                      width: "100%",
                      height: 128,
                    }}
                    imageStyle={{ borderRadius: 10 }}
                    key={photo.ID}>
                    {UsersFavList.includes(item.id) && (
                      // render the filled heart SVG if the item ID is in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => RemoveFromFav(item.id)}>
                        <HeartSvg filled={true} />
                      </TouchableOpacity>
                    )}
                    {!UsersFavList.includes(item.id) && (
                      // render the unfilled heart SVG if the item ID is not in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => AddtoFav(item.id)}>
                        <HeartSvg filled={false} />
                      </TouchableOpacity>
                    )}
                  </ImageBackground>
                );
              })}
            <View
              style={{
                paddingHorizontal: 12,
                paddingBottom: 15,
                paddingTop: 12,
              }}>
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "capitalize",
                  lineHeight: 14 * 1.2,
                  color: COLORS.black,
                  marginBottom: 6,
                  textAlign: "right",
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 14,
                  textAlign: "right",
                }}>
                מידה: {item.size}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#E9E9E9",
                  width: "75%",
                  marginVertical: 7,
                }}
              />
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  color: COLORS.black,
                  //marginLeft: 70,
                  textAlign: "left",
                }}>
                ₪ {item.price}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 12,
                bottom: 12,
              }}>
              <BagSvg />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      {/* <Header title="הארון של`{}`" goBack={false} /> */}
      {renderUserContent()}
      {renderClothes()}
      {/* <MainLayout /> */}
    </SafeAreaView>
  );
}
