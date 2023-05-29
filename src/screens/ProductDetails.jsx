import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Share,
  Modal,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AREA, COLORS, FONTS } from "../constants";
import { Button, Header, ProfileCategory } from "../components";
import {
  AddSvg,
  Arrow,
  ArrowFive,
  ArrowFour,
  CanceledSvg,
  Check,
  Edit,
  HeartTwoSvg,
} from "../svg";
import ButtonFollow from "../components/ButtonFollow";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import ShareSvg from "../svg/ShareSvg";
import { userContext } from "../navigation/userContext";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonLogIn from "../components/ButtonLogIn";
import WarningModal from "../components/WarningModal";
import LoadingComponent from "../components/LoadingComponent";

export default function ProductDetails(props) {
  const navigation = useNavigation();
  const {
    loggedUser,
    GetItemForAlgo,
    shopScore,
    favScore,
    viewScore,
    setSelectedTab,
    setClosetId_,
    setOwner_,
    sendPushNotification,
  } = useContext(userContext);
  const item = props.route.params.item;
  const isFocused = useIsFocused();
  const [closetName, setclosetName] = useState("");
  const [user, setuser] = useState("");
  const [myitemFlag, setmyitemFlag] = useState(false);
  const [UsersItems, setUsersItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);

  //modal
  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");
  const [handleSure, setHandleSure] = useState("");
  const [itemStatus, setItemStatus] = useState(item.item_status);
  //switchoffer
  const [isModalOfferVisible, setIsModalOfferVisible] = useState(false);

  //item's info section
  const [shippingMethod, setShippingMethod] = useState(item.shipping_method);
  const [itemCtegories, setItemCtegories] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [numOfFav, setNumOfFav] = useState("");
  const [UsersShopList, setUsersShopList] = useState([]);
  const [UsersFollowingList, setUsersFollowingList] = useState([]);
  const [distance, setDistance] = useState(null);
  const [address1, setaddress1] = useState(loggedUser.address);
  const [address2, setaddress2] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //URL
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item`;
  const ApiUrl_user = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User`;

  useEffect(() => {
    if (isFocused) {
      GetClosetdata();
      getFavItems();
      getShopItems();
      GetItemCategories();
      GetItemImages();
      GetNumOfFav();
      GetUserItemsForOffer();
      setShippingMethod(item.shipping_method);

      if (address1 && address2) {
        getAddressLocations();
      }
    }
  }, [isFocused, address1, address2, itemStatus]);

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  //gets the data of the closet
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
        console.log("err in GetClosetdata", err);
      });
  }

  function getUser() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserByClosetId/Closet_ID/" +
          item.closet_ID
      )
      .then((res) => {
        setuser(res.data);
        setaddress2(res.data.address);

        if (res.data.id === loggedUser.id) {
          setmyitemFlag(true);
        } else {
          setmyitemFlag(false);
          GetItemForAlgo(item.id, viewScore, loggedUser.id);
        }
        getFollowingList();
      })
      .catch((err) => {
        console.log("err in getUser " + err);
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
          setIsLoading(false);
        },
        (error) => {
          console.log("Item_Image_Video error", error);
        }
      );
  };

  //פונקציה המאפשרת לבצע שיתוף פריט כקישור, שולחת תמונה
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "תראי איזה פריט שווה מצאתי באפליקציית מתלבשות !",
        // url: "https://example.com/page",
        url: itemImages[0], //until we'll be able to send a ling to our project
        title: "מתלבשות",
      });
    } catch (error) {
      console.error("err in onShare ", error.message);
    }
  };

  //stringify all item's categories
  const ArrayToStringCat = (dataObj) => {
    const categoryNames = dataObj.map((item) => item.category_name);
    const concatenatedString = categoryNames.join("#");
    return "#" + concatenatedString;
  };

  ////////////////////////////////////////////////
  //Fav section
  ///////////////////////////////////////////////

  //gets all the items in the user's fav list
  function getFavItems() {
    if (myitemFlag == false) {
      axios
        .get(ApiUrl_user + `/GetFavByUserID/${loggedUser.id}`)
        .then((res) => {
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
        GetItemForAlgo(item_id, favScore, loggedUser.id);
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

  ////////////////////////////////////////////////
  //shopping cart section
  ///////////////////////////////////////////////

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
        GetItemForAlgo(item_id, shopScore, loggedUser.id);
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
        console.log("err in RemoveFromShopList", err);
      });
  }

  ////////////////////////////////////////////////
  //follow section
  ///////////////////////////////////////////////

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

  //פונקציה המאפשרת לבצע מעקב אחרי ארון
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

  ////////////////////////////////////////////////
  //Google maps- distance
  ///////////////////////////////////////////////

  //gets the location of the user using his address via google maps
  const getLocationFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBjqIEpWLM9SXgDWMBohWB6eI4v5oKfDpw`
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

  //calculates the distance between 2 locations
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

  //converts to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  //sets the distance between 2 users in KM
  const getAddressLocations = async () => {
    const location1 = await getLocationFromAddress(address1);
    const location2 = await getLocationFromAddress(address2);

    if (location1 && location2) {
      const distanceInKm = calculateDistance(location1, location2);
      setDistance(distanceInKm);
    }
  };

  ////////////////////////////////////////////////
  //edit item status section
  ///////////////////////////////////////////////

  //updates item status to delete
  function handleDeletePress() {
    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${item.id}/item_status/delete`
      )
      .then((res) => {
        navigation.navigate("Closet");
        console.log("succ to delet item", item.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //updates item status to sold
  function handleSalePress() {
    console.log("in handleSalePress");

    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${item.id}/item_status/sold`
      )
      .then((res) => {
        console.log("succ to sale item", item.id);
        setItemStatus("sold");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //updates item status to active
  function handleNotSalePress() {
    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${item.id}/item_status/active`
      )
      .then((res) => {
        console.log("succ to sale item", item.id);
        setItemStatus("active");
      })
      .catch((err) => {
        console.log("err in handleNotSalePress ", err);
      });
  }

  //switch offer
  function GetUserItemsForOffer() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByClosetId/ClosetId/" +
          loggedUser.closet_id
      )
      .then((res) => {
        if (res.data === 0) {
          setUsersItems([]);
        } else {
          const activeItems = res.data.filter(
            (item) => item.item_status === "active"
          );
          console.log(activeItems);
          setUsersItems(activeItems);
          GetItemPhotos(activeItems);
        }
      })
      .catch((err) => {
        console.log("err in GetUserItemsForOffer ", err);
      });
  }

  //קבלת תמונות הפריטים
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
        console.log("error in GetItemPhotos", error);
        setMessage("קיימת שגיאה בהעלאת נתונים,\n תועברי לדף הבית");
        setShowAlertModal(true);
      });
  }
  const closeModal = () => {
    setIsModalOfferVisible(false);
  };
  const sendWhatsAppMessage = async (Myitem) => {
    console.log(Myitem, "Myitem");
    try {
      var message = `היי ${user.full_name}, ראיתי את הפריט שלך שנקרא ${item.name} באפליקציית מתלבשות. `;
      const phone = `+972${user.phone_number}`;
      message += `האם את מעוניינת להחליף אותו בעבור `;
      message += `הפריט שלי שנקרא ${Myitem.name}?`;
      const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
        message
      )}`;
      Linking.openURL(url);
    } catch (err) {
      console.log("error in get users data to buy" + err);
    }
  };
  function renderContent() {
    return (
      <View>
        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Row}>
              <View>
                {shippingMethod == 1 && (
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
                {shippingMethod == 2 && (
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
                {shippingMethod == 12 && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    ✓ משלוח ✓ איסוף עצמי
                  </Text>
                )}
              </View>

              <View style={styles.Col}>
                <View style={styles.Row}>
                  <Text style={styles.itemHeader}>{item.name}</Text>
                  <Text> </Text>
                  {myitemFlag && itemStatus != "sold" && (
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
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 13,
                    marginBottom: 5,
                  }}
                >
                  ♡ {numOfFav} אהבו פריט זה
                </Text>
              </View>
            </View>

            <Swiper style={styles.imageSwipperContainer}>
              {itemImages.map((image, index) => (
                <View key={index}>
                  <ImageBackground style={styles.image} source={{ uri: image }}>
                    {itemStatus === "sold" && (
                      <View style={styles.soldStyle}>
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 20,
                            textAlign: "center",
                          }}
                        >
                          נמכר
                        </Text>
                      </View>
                    )}
                  </ImageBackground>
                </View>
              ))}
            </Swiper>

            {!myitemFlag &&
              UsersFavList.includes(item.id) &&
              itemStatus != "sold" && (
                // render the filled heart SVG if the item ID is in the UsersFavList
                <TouchableOpacity
                  style={styles.favIcon}
                  onPress={() => RemoveFromFav(item.id)}
                >
                  <HeartTwoSvg filled={true} strokeColor="red" />
                </TouchableOpacity>
              )}

            {!myitemFlag &&
              !UsersFavList.includes(item.id) &&
              itemStatus != "sold" && (
                // render the unfilled heart SVG if the item ID is not in the UsersFavList
                <TouchableOpacity
                  style={styles.favIcon}
                  // onPress={() => AddtoFav(item.id)}
                  onPress={async () => {
                    await Promise.all([
                      AddtoFav(item.id),
                      sendPushNotification(
                        user.token,
                        "like",
                        loggedUser.full_name
                      ),
                    ]);
                  }}
                >
                  <HeartTwoSvg filled={false} strokeColor="red" />
                </TouchableOpacity>
              )}
            {itemStatus != "sold" && (
              <TouchableOpacity
                style={styles.shareIcon}
                onPress={() => {
                  onShare();
                }}
              >
                <ShareSvg></ShareSvg>
              </TouchableOpacity>
            )}

            {!myitemFlag ? (
              <View style={styles.Row}>
                <View style={styles.Row}>
                  {!UsersFollowingList.includes(item.closet_ID) && (
                    <ButtonFollow
                      title="עקבי"
                      backgroundColor={COLORS.golden}
                      textColor={COLORS.white}
                      containerStyle={{ marginBottom: 13 }}
                      onPress={async () => {
                        await Promise.all([
                          followCloset(),
                          sendPushNotification(
                            user.token,
                            "follow",
                            loggedUser.full_name
                          ),
                        ]);
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
                    setSelectedTab("Closet");
                    setClosetId_(item.closet_ID);
                    setOwner_(user);
                    //the go back takes us to the wanted closet
                    navigation.goBack();
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: user.user_image,
                    }}
                    style={styles.userImage}
                    imageStyle={{ borderRadius: 50 }}
                  />

                  {/* <Text
                    style={{
                      ...FONTS.Mulish_700Bold,
                      fontSize: 10,
                      color: COLORS.gray,
                      lineHeight: 22 * 1.2,
                      padding:3,
                    }}
                  >
                    הארון של{"   "}
                  </Text> */}
                  <Text
                    style={{
                      ...FONTS.Mulish_700Bold,
                      fontSize: 18,
                      color: COLORS.black,
                      lineHeight: 22 * 1.2,
                      padding: 2,
                    }}
                  >
                    {user.full_name}
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
                  setSelectedTab("Closet");
                  setClosetId_(item.closet_ID);
                  setOwner_(user);
                  //the go back takes us to the wanted closet
                  navigation.goBack();
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
                    fontSize: 18,
                    color: COLORS.gray,
                    lineHeight: 22 * 1.2,
                    padding: 2,
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
                  {!myitemFlag && distance !== null && (
                    <Text style={styles.descriptionHeader}>
                      {" "}
                      {distance.toFixed(2)} ק"מ
                    </Text>
                  )}
                  {myitemFlag && (
                    <Text style={styles.descriptionHeader}>
                      🏠 {"        "}
                    </Text>
                  )}

                  <Text style={styles.descriptionText}> מרחק ממך</Text>
                </View>
              </View>
            </View>
            <View style={styles.dseContainer}>
              <Text style={styles.Hdescription}>קצת על הפריט:</Text>
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

                {!UsersShopList.includes(item.id) && itemStatus != "sold" && (
                  <Button
                    title=" הוסיפי לסל קניות +"
                    containerStyle={{ marginBottom: 13 }}
                    onPress={() => {
                      AddToShopList(item.id);
                    }}
                  />
                )}
                {itemStatus != "sold" && (
                  <Button
                    title="הציעי החלפה"
                    containerStyle={{ marginBottom: 13 }}
                    onPress={() => {
                      setIsModalOfferVisible(true);
                    }}
                  />
                )}
              </View>
            )}

            {myitemFlag && itemStatus != "sold" && (
              <View>
                <ButtonLogIn
                  title="סמני כנמכר "
                  containerStyle={{ marginBottom: 13 }}
                  onPress={() => {
                    setShowModal(true);
                    setMassage("   הפריט לא יהיה זמין למכירה, \n  את בטוחה?");
                    setHandleSure(() => handleSalePress);
                  }}
                />
              </View>
            )}

            {myitemFlag && itemStatus === "sold" && (
              <View>
                <ButtonLogIn
                  title="החזירי למכירה  "
                  containerStyle={{ marginBottom: 13 }}
                  onPress={() => {
                    setShowModal(true);
                    setMassage("הפריט יהיה זמין למכירה, \n  את בטוחה?");
                    setHandleSure(() => handleNotSalePress);
                  }}
                />
              </View>
            )}

            {myitemFlag && (
              <View>
                <Button
                  title=" מחקי פריט זה  "
                  containerStyle={{ marginBottom: 13 }}
                  onPress={() => {
                    setShowModal(true);
                    setMassage("הפריט ימחק לצמיתות, \n  את בטוחה?");
                    setHandleSure(() => handleDeletePress);
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
        <Modal
          visible={isModalOfferVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.miniModalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.titleContainer}>
                  <Text style={styles.modalTitle}>החלפת פריט</Text>
                </View>
                <View>
                  <ProfileCategory
                    icon={<CanceledSvg />}
                    arrow={false}
                    onPress={closeModal}
                  />
                </View>
              </View>
              <View style={styles.headerLine} />
              {UsersItems.length != 0 ? (
                <FlatList
                  data={UsersItems}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        width: 180,
                        backgroundColor: COLORS.white,
                        justifyContent: "space-between",
                        paddingBottom: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.black,
                          ...FONTS.Mulish_600SemiBold,
                          fontSize: 15,
                          textAlign: "center",
                          paddingBottom: 10,
                        }}
                      >
                        {item.name}
                      </Text>
                      {UsersItemPhotos.filter(
                        (photo) => photo.item_ID === item.id
                      )
                        .slice(0, 1)
                        .map((photo) => {
                          return (
                            <ImageBackground
                              source={{ uri: photo.src }}
                              style={{
                                width: 150,
                                height: 150,
                              }}
                              imageStyle={{ borderRadius: 10 }}
                              key={photo.id}
                            />
                          );
                        })}
                      <TouchableOpacity
                        style={{
                          margin: 8,
                          height: 30,
                          width: 125,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: COLORS.goldenTransparent_04,
                          borderRadius: 30,
                          shadowColor: "#000000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 4,
                          paddingHorizontal: 5,
                        }}
                        onPress={() => sendWhatsAppMessage(item)}
                      >
                        <Text>הציעי החלפה</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.Mulish_600SemiBold,
                    fontSize: 15,
                    textAlign: "center",
                    padding: 70,
                  }}
                >
                  נראה שאין לך פריטים זמינים להחלפה{" "}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header flag={true} />
      {isLoading ? <LoadingComponent></LoadingComponent> : renderContent()}
      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSure={handleSure}
          massage={massage}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    // marginBottom: 13,
    // marginLeft: 15,
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
    fontSize: 18,
    textAlign: "right",
    textTransform: "capitalize",
    lineHeight: 22 * 1.2,
    color: COLORS.black,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "righ",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
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
    marginBottom: 20,
  },
  dseContainer: {
    borderRadius: 15,
    backgroundColor: COLORS.goldenTransparent_03,
    fontSize: 16,
    padding: 10,
    paddingVertical: 10,
    marginBottom: 30,
    borderRadius: 15,
  },
  Hdescription: {
    ...FONTS.Mulish_700Bold,
    textAlign: "right",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  description: {
    ...FONTS.Mulish_700Bold,
    textAlign: "right",
  },
  soldStyle: {
    height: 280,
    width: "100%",
    marginBottom: 30,
    alignSelf: "center",
    backgroundColor: COLORS.black,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "#000000",
    width: "100%",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 4,
  },
  miniModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginBottom: 10,
  },
});
