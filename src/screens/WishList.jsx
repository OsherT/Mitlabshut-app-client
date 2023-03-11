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
import { Header, Line } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { BagSvg } from "../svg";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import TrashCanIcon from "../svg/TrashCanIcon";

export default function WishList() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { loggedUser } = useContext(userContext);
  const [Items, setItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [shopList, setshopList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getItemsData();
      getShopItems();
    }
  }, [isFocused]);

  function getItemsData() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetFavItemByUserId/User_ID/" +
          loggedUser.id
      )
      .then((res) => {
        setItems(res.data);
        GetItemPhotos(res.data);
      })
      .catch((err) => {
        setItems("");
      });
  }
  function getShopItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetShopByUserID/UserID/" +
          loggedUser.id
      )
      .then((res) => {
        const tempUsersShopList = res.data.map(({ item_id }) => item_id);
        setshopList(tempUsersShopList);
      })
      .catch((err) => {
        // alert();
        console.log("cant get shop list", err);
      });
  }
  function GetItemPhotos(items) {
    // pass the items array as a parameter
    const promises = items.map((item) => {
      // use the passed items array
      return axios.get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItem_Image_VideoItemById/Item_ID/" +
          item.id
      );
    });
    Promise.all(promises)
      .then((responses) => {
        const photos = responses.flatMap((response) => response.data);
        console.log(photos);
        setUsersItemPhotos(photos);
      })
      .catch((error) => {
        alert("cant take photos");
        console.log(error);
      });
  }
  function RemoveFromFav(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteFavItem/Item_ID/${itemId}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getItemsData();
      })
      .catch((err) => {
        console.log("cant remove from getFavItems", err);
      });
  }
  function AddToShopList(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostShopItem/ItemID/${item_id}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        getShopItems();
        setshopList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        alert("cant add to shop list");
        console.log(err);
      });
  }
  function RemoveFromShopList(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteShopItem/ItemID/${itemId}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        getShopItems();
        setshopList((prevList) => prevList.filter((id) => id !== itemId));
      })
      .catch((err) => {
        alert("cant add to fav");
        console.log(err);
        // console.log(newFav);
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
        showsHorizontalScrollIndicator={false}
      >
        {Items && Array.isArray(Items) && Items.length > 0 ? (
          Items.map((item, index) => {
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
                }}
              >
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
                        imageStyle={{ borderRadius: 10 }}
                      ></ImageBackground>
                    );
                  })}
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 9,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      textTransform: "capitalize",
                      marginBottom: 6,
                      lineHeight: 14 * 1.2,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: COLORS.gray }}>{item.size}</Text>
                  <Line />
                  <Text
                    style={{
                      ...FONTS.Mulish_600SemiBold,
                      fontSize: 14,
                      color: COLORS.carrot,
                    }}
                  >
                    ₪ {item.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 15,
                    top: 9,
                  }}
                  onPress={() => RemoveFromFav(item.id)}
                >
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                   <TrashCanIcon width={24} height={24} color="#000" />
                  </Text>
                  {/* <FavoriteSvg/>  */}
                </TouchableOpacity>
                {shopList.includes(item.id) && (
                  // render the filled heart SVG if the item ID is in the UsersFavList
                  <TouchableOpacity
                    style={{ position: "absolute", right: 12, bottom: 12 }}
                    onPress={() => RemoveFromShopList(item.id)}
                  >
                    <BagSvg color="#626262" inCart={true} />
                  </TouchableOpacity>
                )}
                {!shopList.includes(item.id) && (
                  // render the unfilled heart SVG if the item ID is not in the UsersFavList
                  <TouchableOpacity
                    style={{ position: "absolute", right: 12, bottom: 12 }}
                    onPress={() => AddToShopList(item.id)}
                  >
                    <BagSvg color="#D7BA7B" inCart={false} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_700Bold,
              fontSize: 16,
              textTransform: "capitalize",
              color: COLORS.black,
              marginBottom: 4,
              lineHeight: 16 * 1.2,
            }}
          >
            לא קיימים פריטים מועדפים
          </Text>
        )}
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
