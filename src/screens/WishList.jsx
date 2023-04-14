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
import { Button, ContainerComponent, Header, Line } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { BagSvg, Empty } from "../svg";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import { Swipeable } from "react-native-gesture-handler";
import LoadingComponent from "../components/LoadingComponent";


export default function WishList() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { loggedUser, GetItemForAlgo, shopScore, setSelectedTab } =
    useContext(userContext);
  const [Items, setItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [shopList, setshopList] = useState([]);
  const [swipeableRef, setSwipeableRef] = useState(null);
  const closeSwipeable = () => {
    swipeableRef && swipeableRef.close();
  };
  const [isLoading, setIsLoading] = useState(true);

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
        if (res.data === 0) {
          console.log("user dont have items on wishlist");
          setItems("");
          setIsLoading(false);
        } else {
          setItems(res.data);
          GetItemPhotos(res.data);
        }
      })
      .catch((err) => {
        setItems("");
        console.log("err in getItemsData", err);
      });
  }

  function getShopItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetShopByUserID/UserID/" +
          loggedUser.id
      )
      .then((res) => {
        if (res.data == "No items yet") {
          setshopList("");
        } else {
          const tempUsersShopList = res.data.map(({ item_id }) => item_id);
          setshopList(tempUsersShopList);
        }
      })
      .catch((err) => {
        console.log("cant get shop list", err);
      });
  }

  function GetItemPhotos(items) {
    // pass the items array as a parameter
    const promises = items.map((item) => {
      // use the passed items array
      return axios.get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages/GetItem_Image_VideoItemById/Item_ID/" +
          item.id
      );
    });
    Promise.all(promises)
      .then((responses) => {
        const photos = responses.flatMap((response) => response.data);
        setUsersItemPhotos(photos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("err in GetItemPhotos", error);
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
        GetItemForAlgo(item_id, shopScore, loggedUser.id);
      })
      .catch((err) => {
        console.log("err in AddToShopList", err);
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
        console.log("err in RemoveFromShopList", err);
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
        }}
        showsHorizontalScrollIndicator={false}>
        {Items && Array.isArray(Items) && Items.length > 0 ? (
          Items.map((item, index) => {
            return (
              <Swipeable
                ref={(ref) => setSwipeableRef(ref)}
                key={index}
                onSwipeableClose={closeSwipeable}
                renderRightActions={() => (
                  <TouchableOpacity
                    style={{
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: COLORS.carrot,
                      justifyContent: "center",
                      alignItems: "flex-end",
                      padding: 20,
                    }}
                    onPress={() => RemoveFromFav(item.id)}>
                    <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                      הסירי
                    </Text>
                  </TouchableOpacity>
                )}>
                <TouchableOpacity
                  key={index}
                  style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: COLORS.white,
                    marginBottom: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                    elevation: 5, // Add this line for Android compatibility
                  }}
                  onPress={() => {
                    if (
                      item.item_status !== "sold" &&
                      item.item_status !== "delete"
                    ) {
                      navigation.navigate("ProductDetails", {
                        item: item,
                      });
                    }
                  }}
                  disabled={
                    item.item_status === "sold" || item.item_status === "delete"
                  }>
                  {UsersItemPhotos.filter((photo) => photo.item_ID === item.id)
                    .slice(0, 1)
                    .map((photo) => {
                      return (
                        <ImageBackground
                          source={{ uri: photo.src }}
                          style={{
                            width: 100,
                            height: 100,
                          }}
                          imageStyle={{ borderRadius: 10 }}
                          key={photo.id}></ImageBackground>
                      );
                    })}
                  {item.item_status === "sold" ||
                  item.item_status === "delete" ? (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        opacity: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: "1",
                      }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}>
                        לא זמין
                      </Text>
                    </View>
                  ) : null}
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
                  
                  </TouchableOpacity>
                  {shopList.includes(item.id) && (
                    // render the filled heart SVG if the item ID is in the UsersFavList
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        right: 12,
                        bottom: 12,
                        zIndex: 2,
                      }}
                      onPress={() => RemoveFromShopList(item.id)}>
                      <BagSvg color="#626262" inCart={true} />
                    </TouchableOpacity>
                  )}
                  {!shopList.includes(item.id) && (
                    // render the unfilled heart SVG if the item ID is not in the UsersFavList
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        right: 12,
                        bottom: 12,
                        zIndex: 2,
                      }}
                      onPress={() => AddToShopList(item.id)}>
                      <BagSvg color="#D7BA7B" inCart={false} />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </Swipeable>
            );
          })
        ) : (
          <ScrollView
            contentContainerStyle={{
              top:-55,
              flexGrow: 1,
              paddingHorizontal: 20,
              justifyContent: "center",
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
                רשימת המועדפים שלך ריקה!
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
                נראה שאין לך עדיין פריטים שאהבת{" "}
              </Text>
              <Button
                title="מצאי פריטים חדשים"
                onPress={() => {
                  setSelectedTab("Search");
                }}
              />
            </ContainerComponent>
          </ScrollView>
        )}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        ...AREA.AndroidSafeArea,
        backgroundColor: "none",
        showsVerticalScrollIndicator: false,
      }}>
      <Header title="רשימת מועדפים" />
      {isLoading ? <LoadingComponent></LoadingComponent> : renderContent()}
    </SafeAreaView>
  );
}
