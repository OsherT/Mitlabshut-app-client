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
import { ContainerComponent, Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg, Empty } from "../svg";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import { ScrollView } from "react-native-gesture-handler";

//מציג את תוצאות החיפוש לפי קטגוריה או מותג
export default function SearchRes(props) {
  const navigation = useNavigation();
  const {
    loggedUser,
    GetItemForAlgo,
    shopScore,
    favScore,
    searchText_,
    setSearchText_,
    setSelectedTab,
    setType_,
  } = useContext(userContext);
  const searchText = searchText_;

  const isFocused = useIsFocused();
  const [nextSearch, setnextSearch] = useState("");
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [itemsByNameList, setItemsByNameList] = useState([]);
  const [itemsBySearch, setitemsBySearch] = useState([]);
  const [itemsImageByType, setItemsImageByType] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [UsersShopList, setUsersShopList] = useState([]);
  const [noRes, setNoRes] = useState(true);

  // const searchText = props.route.params.searchText;

  useEffect(() => {
    if (brandsList && categoriesList && itemsByNameList) {
      GetSearcResults();
    }
  }, [brandsList, categoriesList, itemsByNameList]);

  useEffect(() => {
    if (isFocused) {
      GetBrandsList();
      GetCategoriesList();
      GetItemsNamesList();
      getShopItems();
      getFavItems();
    }
  }, [isFocused, searchText]);

  const GetBrandsList = () => {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetBrand")
      .then((res) => {
        setBrandsList(res.data.map((item) => item.brand_name));
      })
      .catch((err) => {
        console.log("cant get barnd", err);
      });
  };

  const GetCategoriesList = () => {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetCategory")
      .then((res) => {
        setCategoriesList(res.data.map((item) => item.category_name));
      })
      .catch((err) => {
        console.log("cant get categories", err);
      });
  };

  const GetItemsNamesList = () => {
    axios
      .get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByUserID/UserId/${loggedUser.id}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data);
          setItemsByNameList(res.data.map((item) => item.name));
        } else {
          console.log("no items names");
        }
      })
      .catch((err) => {
        console.log("err in GetAllItemsNames", err);
      });
  };

  //get the items by the search text
  function GetSearcResults() {
    if (brandsList && categoriesList && itemsByNameList) {
      if (brandsList.includes(searchText)) {
        axios
          .get(
            `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByBrand/Brand/${searchText}/UserId/${loggedUser.id}`
          )
          .then((res) => {
            setitemsBySearch(res.data);
            GetItemPhotos(res.data);
            setNoRes(false);
          })
          .catch((err) => {
            console.log("err in GetSearcResults 1", err);
          });
      } else if (categoriesList.includes(searchText)) {
        const categoriesURL = hebrewToUrlEncoded(searchText);
        axios
          .get(
            `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByCategory/Category_name/${categoriesURL}/UserId/${loggedUser.id}`
          )
          .then((res) => {
            setitemsBySearch(res.data);
            GetItemPhotos(res.data);
            setNoRes(false);
          })
          .catch((err) => {
            console.log("err in GetSearcResults 2", err);
          });
      } else if (itemsByNameList.every((item) => item.includes(searchText))) {
        axios
          .get(
            `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByItemName/ItemName/${searchText}/UserId/${loggedUser.id}`
          )
          .then((res) => {
            if (res.data.length > 0) {
              setitemsBySearch(res.data);
              GetItemPhotos(res.data);
              setNoRes(false);
            } else {
              console.log("no name");
            }
          })
          .catch((err) => {
            console.log("err in GetItemByName", err);
          });
      }
    }
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
        setItemsImageByType(photos);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function hebrewToUrlEncoded(hebrewStr) {
    const utf8EncodedStr = unescape(encodeURIComponent(hebrewStr));
    let encodedStr = "";
    for (let i = 0; i < utf8EncodedStr.length; i++) {
      // Get the UTF-8 code unit for the character
      const charCode = utf8EncodedStr.charCodeAt(i);
      // Convert the code unit to its hexadecimal representation
      const hexStr = charCode.toString(16).toUpperCase();
      // Add a percent sign before the hexadecimal representation
      encodedStr += "%" + hexStr;
    }
    return encodedStr;
  }

  ///handle fav list
  function getFavItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetFavByUserID/" +
          loggedUser.id
      )
      .then((res) => {
        if (res.data == "No items yet") {
          setUsersFavList("");
        } else {
          const tempUsersFavList = res.data.map(({ item_id }) => item_id);
          setUsersFavList(tempUsersFavList);
        }
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
        GetItemForAlgo(item_id, favScore, loggedUser.id);
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
  //handle shop list
  function getShopItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetShopByUserID/UserID/" +
          loggedUser.id
      )
      .then((res) => {
        if (res.data == "No items yet") {
          setUsersShopList("");
        } else {
          const tempUsersShopList = res.data.map(({ item_id }) => item_id);
          setUsersShopList(tempUsersShopList);
        }
      })
      .catch((err) => {
        console.log("cant get shop list", err);
      });
  }

  function AddToShopList(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostShopItem/ItemID/${item_id}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        getShopItems();
        setUsersShopList((prevList) => [...prevList, { item_id }]);
        GetItemForAlgo(item_id, shopScore, loggedUser.id);
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
        setUsersShopList((prevList) => prevList.filter((id) => id !== itemId));
      })
      .catch((err) => {
        alert("cant add to fav");
        console.log(err);
        // console.log(newFav);
      });
  }

  //need to do shearch by categories
  function renderSearch() {
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
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setSelectedTab("SearchRes");
                setSearchText_(nextSearch);
              }}>
              <SearchSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right",paddingRight:15 }}
            placeholder="חפשי פריט (קטגוריה/ מותג/ שם פריט)..."
            onChangeText={(text) => {
              setnextSearch(text);
              setNoRes(true);
            }}
            onSubmitEditing={({ nativeEvent }) => {
              setSelectedTab("SearchRes");
              setSearchText_(nativeEvent.text);
            }}
            keyboardType="default"
            returnKeyType="search"
            defaultValue={searchText}
          />
          {/* <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            onPress={() => {
              // navigation.navigate("Filter", { type: "null" })
              setSelectedTab("Filter");
              setType_(null);
            }}>
            <FilterSvg />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }

  function renderItems() {
    return (
      <FlatList
        data={itemsBySearch}
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
                    key={photo.id}>
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
                  textAlign: "left",
                }}>
                ₪ {item.price}
              </Text>
            </View>
            {UsersShopList.includes(item.id) && (
              // render the filled heart SVG if the item ID is in the UsersFavList
              <TouchableOpacity
                style={{ position: "absolute", right: 12, bottom: 12 }}
                onPress={() => RemoveFromShopList(item.id)}>
                <BagSvg color="#626262" inCart={true} />
              </TouchableOpacity>
            )}
            {!UsersShopList.includes(item.id) && (
              // render the unfilled heart SVG if the item ID is not in the UsersFavList
              <TouchableOpacity
                style={{ position: "absolute", right: 12, bottom: 12 }}
                onPress={() => AddToShopList(item.id)}>
                <BagSvg color="#D7BA7B" inCart={false} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
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
            לא נמצאו תוצאות התואמות את החיפוש שלך{" "}
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => setSelectedTab("Search")}
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
              <FilterSvg filled={true} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#333",
                  marginLeft: 8,
                }}>
                חזרה לחיפוש
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
      <Header title={searchText} />
      {!noRes && renderSearch()}
      {!noRes ? renderItems() : noSearchResults()}
    </SafeAreaView>
  );
}
