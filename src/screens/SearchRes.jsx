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

export default function SearchRes(props) {
  const navigation = useNavigation();
  const { loggedUser,GetItemForAlgo} = useContext(userContext);
  const isFocused = useIsFocused();
  const [search, setsearch] = useState("");
  const [nextSearch, setnextSearch] = useState("");

  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [itemsBySearch, setitemsBySearch] = useState([]);
  const [itemsImageByType, setItemsImageByType] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [UsersShopList, setUsersShopList] = useState([]);
  const searchText = props.route.params.searchText;

  useEffect(() => {
    if (brandsList && categoriesList) {
      GetSearcResults();
    }
  }, [brandsList, categoriesList]);
  
  useEffect(() => {
    if (isFocused) {
      GetBrandsList();
      GetCategoriesList();
      getShopItems();
      getFavItems();
    }
  }, [isFocused,searchText]);
  

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

  function GetSearcResults() {
    if (brandsList && categoriesList) {
      if (brandsList.includes(searchText)) {
        axios
          .get(
            `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByBrand/Brand/${searchText}/UserId/${loggedUser.id}`
          )
          .then((res) => {
            setitemsBySearch(res.data);
            GetItemPhotos(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    if (categoriesList.includes(searchText)) {
      const categoriesURL = hebrewToUrlEncoded(searchText);
      axios
        .get(
          `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByCategory/Category_name/${categoriesURL}/UserId/${loggedUser.id}`
        )
        .then((res) => {
          setitemsBySearch(res.data);
          GetItemPhotos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
        GetItemForAlgo(item_id,4,loggedUser.id);
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
        GetItemForAlgo(item_id,8,loggedUser.id);
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
    // if (!itemsBySearch) {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 44,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchRes", {
                  searchText: nextSearch,
                })
              }
            >
              <SearchSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right" }}
            placeholder="חפשי פריט..."
            onChangeText={(text) => setnextSearch(text)}
            keyboardType="web-search"
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            onPress={() => navigation.navigate("Filter")}
          >
            <FilterSvg />
          </TouchableOpacity>
        </View>
      </View>
    );
    // }
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
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
            onPress={() => {
              navigation.navigate("ProductDetails", {
                item: item,
              });
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
          >
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
                    key={photo.id}
                  >
                    {UsersFavList.includes(item.id) && (
                      // render the filled heart SVG if the item ID is in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => RemoveFromFav(item.id)}
                      >
                        <HeartSvg filled={true} />
                      </TouchableOpacity>
                    )}
                    {!UsersFavList.includes(item.id) && (
                      // render the unfilled heart SVG if the item ID is not in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => AddtoFav(item.id)}
                      >
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
              }}
            >
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "capitalize",
                  lineHeight: 14 * 1.2,
                  color: COLORS.black,
                  marginBottom: 6,
                  textAlign: "right",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 14,
                  textAlign: "right",
                }}
              >
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
                }}
              >
                ₪ {item.price}
              </Text>
            </View>
            {UsersShopList.includes(item.id) && (
              // render the filled heart SVG if the item ID is in the UsersFavList
              <TouchableOpacity
                style={{ position: "absolute", right: 12, bottom: 12 }}
                onPress={() => RemoveFromShopList(item.id)}
              >
                <BagSvg color="#626262" inCart={true} />
              </TouchableOpacity>
            )}
            {!UsersShopList.includes(item.id) && (
              // render the unfilled heart SVG if the item ID is not in the UsersFavList
              <TouchableOpacity
                style={{ position: "absolute", right: 12, bottom: 12 }}
                onPress={() => AddToShopList(item.id)}
              >
                <BagSvg color="#D7BA7B" inCart={false} />
              </TouchableOpacity>
            )}
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
      }}
    >
      <Header
        title={searchText}
        goBack={true}
        onPress={() => navigation.goBack()}
      />

      {renderSearch()}
      {renderItems()}
    </SafeAreaView>
  );
}
