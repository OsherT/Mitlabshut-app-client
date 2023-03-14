import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../svg";
import axios from "axios";
import { userContext } from "../navigation/userContext";

export default function ItemsByCtegory(props) {
  const navigation = useNavigation();
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;
  const { loggedUser } = useContext(userContext);
  const isFocused = useIsFocused();

  const [itemsByType, setItemsByType] = useState([]);
  const [itemsImageByType, setItemsImageByType] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);

  const type = props.route.params.type;

  useEffect(() => {
    if (isFocused) {
      getItemsByType();
      getFavItems();
      GetItemPhotos();
    }
  }, [isFocused]);

  const getItemsByType = () => {
    axios
      .get(ApiUrl + `Item/GetItemByType/Type/${type}`)
      .then((res) => {
        setItemsByType(res.data);
      })
      .catch((err) => {
        console.log("err in itemsByType ", err);
      });
  };

  const GetItemPhotos = () => {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages")
      .then((res) => {
        console.log("res.data", res.data);
        setItemsImageByType(res.data);
      })
      .catch((err) => {
        alert("cant take photos");
        console.log(err);
      });
  };

  function getFavItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetFavItemByUserId/User_ID/" +
          loggedUser.id
      )
      .then((res) => {
        const tempUsersFavList = res.data.map(({ item_ID }) => item_ID);
        setUsersFavList(tempUsersFavList);
      })
      .catch((err) => {
        console.log("cant get fav", err);
      });
  }

  function AddtoFav(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostFavItem/Item_ID/${item_id}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        setUsersFavList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        // alert("cant add to fav");
        console.log("cant add to fav", err);
      });
  }

  function RemoveFromFav(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteFavItem/Item_ID/${itemId}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        setUsersFavList((prevList) => prevList.filter((id) => id !== itemId));
      })
      .catch((err) => {
        // alert("");
        console.log("cant remove from getFavItems", err);
      });
  }

  //need to do shearch by categories
  function renderSearch() {
    // if (!itemsByType) {
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
                navigation.navigate("ItemsByCtegory", {
                  type: typeBySearch,
                })
              }>
              <SearchSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right" }}
            placeholder="חפשי פריט..."
            onChangeText={(text) => setTypeBySearch(text)}
            keyboardType="web-search"
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
    // }
  }

  function renderItems() {
    // if (!itemsByType) {
    return (
      <View>
        <FlatList
          data={itemsByType}
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
              onPress={() => {
                console.log(item.id);
                navigation.navigate("ProductDetails", {
                  item: item,
                });
              }}>
              {itemsImageByType
                .filter((photo) => photo.item_ID === item.id)
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
                      {/* //update when the add to fav works good//////////////////////////////////////////////////// */}
                      {UsersFavList.includes(item.id) && (
                        // render the filled heart SVG if the item ID is in the UsersFavList
                        <TouchableOpacity
                          style={{ left: 12, top: 12 }}
                          onPress={() => RemoveFromFav(item.id)}>
                          <HeartSvg filled={true} />
                        </TouchableOpacity>
                      )}
                      {!UsersFavList.includes(item.id) && (
                        // render the unfilled heart SVG if the item ID is not in the UsersFavList */}
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
      </View>
    );
    // } else {
    //   return <OrderFailed></OrderFailed>;
    // }
  }

  // function renderHeader() {
  //   if (!itemsByType) {
  //     return <Header title={type} goBack={false} />;
  //   }
  // }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Header title={type} goBack={true} onPress={() => navigation.goBack()} />

      {renderSearch()}
      {renderItems()}
    </SafeAreaView>
  );
}
