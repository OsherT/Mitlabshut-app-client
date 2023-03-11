import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Header, Line, } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { BagSvg } from "../svg";
import axios from "axios";
import { userContext } from "../navigation/userContext";

export default function WishList() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { loggedUser } = useContext(userContext);
  const [UsersItems, setUsersItems] = useState([]);
  const [Items,setItems]=useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);   
  const [UsersFavListObj, setUsersFavListObj] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getFavItems();
      getItemsData();  
      //GetClosetItems();
      GetItemPhotos();
      usersFavItemsObj();
      // console.log("IsFocused:", isFocused);
      // console.log("UsersFavListObj", UsersFavListObj);
      // console.log("UsersItemPhotos", UsersItemPhotos);
    }
  }, [isFocused]);
  function getFavItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetFavByUserID/" +
          loggedUser.id
      )
      .then((res) => {
        const tempUsersFavList = res.data.map(({ item_id }) => item_id);
        setUsersFavList(tempUsersFavList);
        console.log("tempUsersFavList"+tempUsersFavList);
      })
      .catch((err) => {
        console.log("cant get fav", err);
      });
  }

  function getItemsData(){
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetFavItemByUserId/User_ID/" +
          loggedUser.id
      )
      .then((res) => {
        setItems(res.data);
        console.log("itemsss"+res.data[0].type);
      })
      .catch((err) => {
        console.log("cant get fav", err);
      });
  }

  // function GetClosetItems() {
  //   axios
  //     .get(
  //       "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByClosetId/ClosetId/" +
  //         loggedUser.closet_id
  //     )
  //     .then((res) => {
  //       setUsersItems(res.data);
  //     })
  //     .catch((err) => {
  //       alert("cant take items");
  //       console.log(err);
  //     });
  // }

  function GetItemPhotos() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemImageVideo"
      )
      .then((res) => {
        setUsersItemPhotos(res.data);
      })
      .catch((err) => {
        alert("cant take photos");
        console.log(err);
      });
  }

  //filter the items that not in fav list and creat new obj array of fav items only--> delete after dana will create the correct get
  const usersFavItemsObj = () => {
    const myFavItems = UsersItems.filter((item) =>
      UsersFavList.includes(item.id)
    ).map((item) => ({ ...item }));
    setUsersFavListObj(myFavItems);
  };

  function RemoveFromFav(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteFavItem/Item_ID/${itemId}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        setUsersFavList((prevList) => prevList.filter((id) => id !== itemId));
        isFocused = true;
      })
      .catch((err) => {
        console.log("cant remove from getFavItems", err);
      });
  }

  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
          backgroundColor: "#E9E9E9",
        }}
        showsHorizontalScrollIndicator={false}>
        {UsersFavListObj.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                width: "100%",
                height: 100,
                backgroundColor: COLORS.white,
                marginBottom: 15,
                borderRadius: 10,
                flexDirection: "row",
              }}
              onPress={() => {
                navigation.navigate("ProductDetails", {
                  item: item,
                });
              }}>
              {UsersItemPhotos.filter((photo) => photo.item_ID === item.id)
                .slice(0, 1)
                .map((photo) => {
                  return (
                    <ImageBackground
                      source={{ uri: photo.item_Src }}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                      imageStyle={{ borderRadius: 10 }}></ImageBackground>
                  );
                })}

              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 9,
                  flex: 1,
                }}>
                <Text
                  style={{
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 14,
                    textTransform: "capitalize",
                    marginBottom: 6,
                    lineHeight: 14 * 1.2,
                  }}>
                  {item.name}
                </Text>

                <Text style={{ color: COLORS.gray }}>{item.size}</Text>
                <Line />
                <Text
                  style={{
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 14,
                    color: COLORS.carrot,
                  }}>
                  ₪ {item.price}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  top: 9,
                }}
                onPress={() => RemoveFromFav(item.id)}>
                <Text
                  style={{
                    color: "red",
                  }}>
                  DELETE
                </Text>
                {/* <FavoriteSvg/>  */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 15,
                  bottom: 9,
                }}>
                <BagSvg />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  return (  
    <SafeAreaView style={{ ...AREA.AndroidSafeArea, backgroundColor: "none" }}>
      <Header title="רשימת מועדפים" />
      {renderContent()}
    </SafeAreaView>
  );
}
