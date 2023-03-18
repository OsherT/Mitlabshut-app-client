import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AREA, COLORS, FONTS, SIZES } from "../constants";
import { Button, Header } from "../components";
import { Edit, HeartTwoSvg } from "../svg";
import ButtonFollow from "../components/ButtonFollow";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import ShareSvg from "../svg/ShareSvg";
import { userContext } from "../navigation/userContext";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonLogIn from "../components/ButtonLogIn";

export default function ProductDetails(props) {
  const navigation = useNavigation();
  const { loggedUser } = useContext(userContext);
  const item = props.route.params.item;
  const isFocused = useIsFocused();
  const [closetName, setclosetName] = useState("");
  const [user, setuser] = useState("");
  const [myitemFlag, setmyitemFlag] = useState(false);

  //item's info section
  const [shippingMethod] = useState(item.shipping_method);
  const [itemCtegories, setItemCtegories] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [numOfFav, setNumOfFav] = useState("");
  const [UsersShopList, setUsersShopList] = useState([]);
  const [UsersFollowingList, setUsersFollowingList] = useState([]);
  const [distance, setDistance] = useState(null);
  const [address1, setaddress1] = useState(loggedUser.address);
  const [address2, setaddress2] = useState("");

  //URL
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item`;
  const ApiUrl_user = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User`;

  useEffect(() => {
    if (isFocused) {
      GetClosetdata();
      getUser();
      getFavItems();
      getShopItems();
      GetItemCategories();
      GetItemImages();
      GetNumOfFav();
      if (address1 && address2) {
        getAddressLocations();
      }
    }
  }, [isFocused, address1, address2]);

  function GetClosetdata() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/Get/" +
          item.closet_ID
      )
      .then((res) => {
        setclosetName(res.data[0].user_name);
      })
      .catch((err) => {
        alert("cant take description");
        console.log(err);
      });
  }
  function getUser() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserByClosetId/Closet_ID/" +
          item.closet_ID
      )
      .then((res) => {
        setuser(res.data[0]);
        setaddress2(res.data[0].address);

        if (res.data[0].id === loggedUser.id) {
          setmyitemFlag(true);
          
        } else {
          setmyitemFlag(false);
          
        }
        getFollowingList();
      })
      .catch((err) => {
        console.log("cant take user" + err);
      });
  }

  const GetItemCategories = () => {
    fetch(ApiUrl + `/GetItemCategortById/Item_ID/${item.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          setItemCtegories(data);
        },
        (error) => {
          console.log("Item_in_category error", error);
        }
      );
  };

  const GetItemImages = () => {
    fetch(
      "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages/GetItem_Image_VideoItemById/Item_ID/" +
        item.id,
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
          setItemImages(data.map((item) => item.src));
        },
        (error) => {
          console.log("Item_Image_Video error", error);
        }
      );
  };

  //gets all the items in the user's fav list
  function getFavItems() {
    console.log("flag" + myitemFlag);
    if (myitemFlag == false) {
      axios
        .get(ApiUrl_user + `/GetFavByUserID/${loggedUser.id}`)
        .then((res) => {
          console.log("fav" + res.data);
          if (res.data == "No items yet") {
            setUsersFavList("");
          } else {
            const tempUsersFavList = res.data.map(({ item_id }) => item_id);
            setUsersFavList(tempUsersFavList);
          }
        })
        .catch((err) => {
          console.log("cant get fav", err); //
        });
    }
  }

  //adds item in the user's fav list
  function AddtoFav(item_id) {
    axios
      .post(
        ApiUrl_user + `/PostFavItem/Item_ID/${item_id}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        GetNumOfFav();
      })
      .catch((err) => {
        console.log("cant add to fav", err);
      });
  }

  //removes item in the user's fav list
  function RemoveFromFav(itemId) {
    axios
      .delete(
        ApiUrl_user +
          `/DeleteFavItem/Item_ID/${itemId}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        GetNumOfFav();
      })
      .catch((err) => {
        console.log("cant remove from fav", err);
      });
  }

  //shows the num of users that like the item
  const GetNumOfFav = () => {
    fetch(ApiUrl + `/GetItemFavByItemId/Item_ID/${item.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          setNumOfFav(data);
        },
        (error) => {
          console.log("setNumOfFav error", error);
        }
      );
  };

  //gets all the items in the user's shop list
  function getShopItems() {
    if (myitemFlag == false) {
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
          console.log("cant get shop list", err); //
        });
    }
  }

  //adds item in the user's shopping list
  function AddToShopList(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostShopItem/ItemID/${item_id}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        getShopItems();
        setUsersShopList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        console.log("cant add to shop list", err);
      });
  }

  //removs item from user's shopping list
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
      });
  }

  //stringify all item's categories
  const ArrayToStringCat = (dataObj) => {
    const categoryNames = dataObj.map((item) => item.category_name);
    const concatenatedString = categoryNames.join("#");
    return "#" + concatenatedString;
  };

  //מביא את רשימת העוקבים של היוזר כדי לדעת איזה כפתור עוקב להציג
  function getFollowingList() {
    if (myitemFlag == false) {
      axios
        .get(ApiUrl_user + `/GetClosetByUserID/User_ID/${loggedUser.id}`)
        .then((res) => {
          if (res.data == "No closets yet") {
            setUsersFollowingList("");
          } else {
            const tempUsersFollowList = res.data.map(
              ({ closet_id }) => closet_id
            );
            setUsersFollowingList(tempUsersFollowList);
          }
        })
        .catch((err) => {
          console.log("cant get following list", err);
        });
    }
  }

  const followCloset = () => {
    axios
      .post(
        ApiUrl_user +
          `/PostFollowingCloset/User_ID/${loggedUser.id}/Closet_ID/${item.closet_ID}`
      )
      .then((res) => {
        var closet_ID = item.closet_ID;
        setUsersFollowingList((prevList) => [...prevList, { closet_ID }]);
        getFollowingList();
      })
      .catch((err) => {
        console.log("cant follow", err);
      });
  };
  //check whay returns err when unfollow
  const unfollowCloset = () => {
    axios
      .delete(
        ApiUrl_user +
          `/Delete/Closet_ID/${item.closet_ID}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        var closet_ID = item.closet_ID;
        setUsersFollowingList((prevList) =>
          prevList.filter((id) => id !== closet_ID)
        );
        getFollowingList();
      })
      .catch((err) => {
        console.log("cant unfollow", err);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "תראי איזה פריט שווה מצאתי !",
        url: "https://example.com/page",
        title: "מתלבשות",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getLocationFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDarVyeqmQSsTsH9SzyEksCaIciizHroe0`
      );

      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.warn(
          `Google Maps API error: ${response.data.status}+${address}`
        );
      }
    } catch (error) {
      console.error("בעיה בדיסטנס" + error);
    }
  };
  const calculateDistance = (location1, location2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(location2.latitude - location1.latitude);
    const dLon = toRadians(location2.longitude - location1.longitude);
    const lat1 = toRadians(location1.latitude);
    const lat2 = toRadians(location2.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  const getAddressLocations = async () => {

    const location1 = await getLocationFromAddress(address1);
    const location2 = await getLocationFromAddress(address2);

    if (location1 && location2) {
      const distanceInKm = calculateDistance(location1, location2);
      setDistance(distanceInKm);
    }
  };

  //need to delete and fix the view
  // function renderSlide() {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
  //       <View style={styles.topIcons}>
  //         <TouchableOpacity onPress={() => navigation.goBack()}>
  //           <BackSvg />
  //         </TouchableOpacity>
  //       </View>
  //       <View
  //         style={{
  //           borderColor: COLORS.goldenTransparent_03,
  //           borderWidth: 2,
  //           paddingTop: 100,
  //         }}></View>
  //     </View>
  //   );
  // }

  function renderContent() {
    return (
      <View>
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.Row}>
              <View>
                {/* 12 זה גם משלוח וגם איסוף עצמי*/}
                {(shippingMethod == 1 || shippingMethod == 12) && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    ✓ איסוף עצמי
                  </Text>
                )}
                {(shippingMethod == 2 || shippingMethod == 12) && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    ✓ משלוח
                  </Text>
                )}
              </View>

              <View style={styles.Col}>
                <View style={styles.Row}>
                  <Text style={styles.itemHeader}>{item.name}</Text>
                  <Text> </Text>
                  {myitemFlag && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("EditItem", {
                          item: item,
                          itemImages: itemImages,
                          itemCtegories: itemCtegories,
                        });
                      }}
                    >
                      <Edit />
                    </TouchableOpacity>
                  )}
                </View>
                {numOfFav > 0 && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    ♡ {numOfFav} אהבו פריט זה
                  </Text>
                )}
              </View>
            </View>
            <Swiper style={styles.imageSwipperContainer}>
              {itemImages.map((image, index) => (
                <ImageBackground
                  key={index}
                  style={styles.image}
                  source={{ uri: image }}
                ></ImageBackground>
              ))}
            </Swiper>
            {!myitemFlag && UsersFavList.includes(item.id) && (
              // render the filled heart SVG if the item ID is in the UsersFavList
              <TouchableOpacity
                style={styles.favIcon}
                onPress={() => RemoveFromFav(item.id)}
              >
                <HeartTwoSvg filled={true} strokeColor="red" />
              </TouchableOpacity>
            )}
            {!myitemFlag && !UsersFavList.includes(item.id) && (
              // render the unfilled heart SVG if the item ID is not in the UsersFavList
              <TouchableOpacity
                style={styles.favIcon}
                onPress={() => AddtoFav(item.id)}
              >
                <HeartTwoSvg filled={false} strokeColor="red" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.shareIcon}
              onPress={() => {
                onShare();
              }}
            >
              <ShareSvg></ShareSvg>
            </TouchableOpacity>

            {!myitemFlag ? (
              <View style={styles.Row}>
                <View style={styles.Row}>
                  {!UsersFollowingList.includes(item.closet_ID) && (
                    <ButtonFollow
                      title="עקבי"
                      backgroundColor={COLORS.golden}
                      textColor={COLORS.white}
                      containerStyle={{ marginBottom: 13 }}
                      onPress={() => {
                        followCloset();
                      }}
                    />
                  )}
                  {UsersFollowingList.includes(item.closet_ID) && (
                    <ButtonFollow
                      title="הסירי עוקב"
                      backgroundColor={COLORS.goldenTransparent_03}
                      textColor={COLORS.black}
                      containerStyle={{ marginBottom: 13 }}
                      onPress={() => {
                        unfollowCloset();
                      }}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("Closet", {
                      closetId: item.closet_ID,
                      owner: user,
                    });
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: user.user_image,
                    }}
                    style={styles.userImage}
                    imageStyle={{ borderRadius: 40 }}
                  ></ImageBackground>

                  <Text
                    style={{
                      ...FONTS.Mulish_700Bold,
                      fontSize: 16,
                      color: COLORS.gray,
                      lineHeight: 22 * 1.2,
                    }}
                  >
                    הארון של
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      ...FONTS.Mulish_700Bold,
                      fontSize: 16,
                      color: COLORS.black,
                      lineHeight: 22 * 1.2,
                    }}
                  >
                    {closetName}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("Closet", {
                    closet: item.closet_ID,
                    owner: user,
                  });
                }}
              >
                <ImageBackground
                  source={{
                    uri: user.user_image,
                  }}
                  style={styles.userImage}
                  imageStyle={{ borderRadius: 40 }}
                ></ImageBackground>

                <Text
                  style={{
                    ...FONTS.Mulish_700Bold,
                    fontSize: 16,
                    color: COLORS.gray,
                    lineHeight: 22 * 1.2,
                  }}
                >
                  הארון שלי{" "}
                </Text>
                <Text> </Text>
              </TouchableOpacity>
            )}
            <View style={styles.line}></View>
            <View style={styles.Row}>
              <View style={styles.Col}>
                <View>
                  <Text style={styles.descriptionHeader}>₪ {item.price} </Text>
                  <Text style={styles.descriptionText}> מחיר</Text>
                </View>
                <View>
                  <Text style={styles.descriptionHeader}> {item.size}</Text>
                  <Text style={styles.descriptionText}> מידה</Text>
                </View>
              </View>

              <View style={styles.Col}>
                <View>
                  <Text style={styles.descriptionHeader}>
                    {item.use_condition}
                  </Text>
                  <Text style={styles.descriptionText}> מצב פריט</Text>
                </View>

                <View>
                  <Text style={styles.descriptionHeader}> {item.brand}</Text>
                  <Text style={styles.descriptionText}> מותג </Text>
                </View>
              </View>
              <View style={styles.Col}>
                <View>
                  <Text style={styles.descriptionHeader}> {item.color}</Text>
                  <Text style={styles.descriptionText}> צבע</Text>
                </View>
                <View>
                  {distance !== null ? (
                    <Text style={styles.descriptionHeader}>
                      {" "}
                      {distance.toFixed(2)} km
                    </Text>
                  ) : (
                    <Text>Loading...</Text>
                  )}
                  <Text style={styles.descriptionText}> מרחק ממך</Text>
                </View>
              </View>
            </View>
            <View style={styles.dseContainer}>
              <Text style={styles.description}>
                {ArrayToStringCat(itemCtegories)}
                {","} {item.description}
              </Text>
            </View>
            {!myitemFlag && (
              <View>
                {UsersShopList.includes(item.id) && (
                  <ButtonLogIn
                    title="- הסירי מסל קניות"
                    containerStyle={{ marginBottom: 13 }}
                    onPress={() => {
                      RemoveFromShopList(item.id);
                    }}
                  />
                )}
                {!UsersShopList.includes(item.id) && (
                  <Button
                    title="+ הוסיפי לסל קניות"
                    containerStyle={{ marginBottom: 13 }}
                    onPress={() => {
                      AddToShopList(item.id);
                    }}
                  />
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    // <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
    //   {/* //need to delete and fix the view */}
    //   {renderSlide()}
    //   {renderContent()}
    // </View>
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // topIcons: {
  //   // position: "absolute",
  //   top: 0,
  //   zIndex: 1,
  //   paddingHorizontal: 20,
  //   marginTop: 45,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: SIZES.width,
  //   // marginBottom: 30,
  // },
  // dot: {
  //   width: 10,
  //   height: 10,
  //   marginHorizontal: 5,
  //   borderRadius: 5,
  //   borderWidth: 2,
  //   top: -50,
  // },
  // container: {
  //   width: SIZES.width,
  //   height: 15,
  //   borderTopLeftRadius: 15,
  //   borderTopRightRadius: 15,
  //   position: "absolute",
  //   top: -15,
  //   // backgroundColor: COLORS.white,
  //   zIndex: 9,
  //   // backgroundColor: "#EFEDE6",
  // },

  favIcon: {
    position: "absolute",
    left: 12,
    top: 235,
    zIndex: 1,
    width: 38,
    height: 38,
    paddingLeft: 9,
    paddingTop: 11,
    backgroundColor: "white",
    borderRadius: 45,
  },
  shareIcon: {
    position: "absolute",
    left: 12,
    top: 280,
    zIndex: 1,
    width: 38,
    height: 38,
    paddingLeft: 9,
    paddingTop: 8,
    backgroundColor: "white",
    borderRadius: 45,
  },
  line: {
    borderColor: COLORS.goldenTransparent_03,
    borderWidth: 1,
    marginBottom: 20,
  },
  imageSwipperContainer: {
    height: 290,
    marginBottom: 30,
  },
  image: {
    // width: SIZES.width,
    height: 280,
    marginBottom: 30,
  },
  userImage: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginBottom: 15,
    marginLeft: 15,
  },
  contentContainer: {
    paddingVertical: 30,
    paddingTop: 10,
    backgroundColor: COLORS.white,
    width: "100%",
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  itemHeader: {
    ...FONTS.Mulish_700Bold,
    fontSize: 25,
    textAlign: "right",
    textTransform: "capitalize",
    lineHeight: 22 * 1.2,
    color: COLORS.black,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "space-between",
  },
  Col: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionHeader: {
    ...FONTS.Mulish_700Bold,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22 * 1.2,
    color: COLORS.black,
  },
  descriptionText: {
    ...FONTS.Mulish_400Regular,
    textAlign: "center",
    textTransform: "capitalize",
    lineHeight: 22 * 1.2,
    color: COLORS.gray,
    fontSize: 10,
    marginBottom: 30,
  },
  dseContainer: {
    height: 100,
  },
  description: {
    ...FONTS.Mulish_700Bold,
    backgroundColor: COLORS.goldenTransparent_03,
    fontSize: 14,
    textAlign: "right",
    padding: 5,
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 15,
  },
});
