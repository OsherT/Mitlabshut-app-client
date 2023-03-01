import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../constants";
import { Button } from "../components";
import { BackSvg, HeartSvg, HeartTwoSvg } from "../svg";
import ButtonFollow from "../components/ButtonFollow";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import ShareSvg from "../svg/ShareSvg";
import { userContext } from "../navigation/userContext";
import axios from "axios";

export default function ProductDetails(props) {
  const item = props.route.params.item;

  const navigation = useNavigation();
  const { loggedUser } = useContext(userContext);
  const [follow, setFollow] = useState(false);
  const [shippingMethod] = useState(item.shipping_method);
  const [itemCtegories, setItemCtegories] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [fav, setFav] = useState(false);

  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  useEffect(() => {
    GetItemCategories();
    GetItemImages();
    getFavItems();
  }, []);

  const followCloset = () => {
    Alert.alert("follow");
  };
  const unfollowCloset = () => {
    Alert.alert("unfollow");
  };
  const GetItemCategories = () => {
    fetch(ApiUrl + `Item_in_category/Item_ID/${item.id}`, {
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
    fetch(ApiUrl + `Item_Image_Video/Item_ID/${item.id}`, {
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
          setItemImages(data.map((item) => item.src));
        },
        (error) => {
          console.log("Item_Image_Video error", error);
        }
      );
  };
  const getFavItems = () => {
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
        console.log(err);
      });
  };
  const AddtoFav = (item_id) => {
    var newFav = {
      item_ID: item_id,
      user_Email: loggedUser.email,
    };
    axios
      .post(ApiUrl + "UserFavList", newFav)
      .then((res) => {
        alert("added");
        setUsersFavList((prevList) => [...prevList, { item_id }]);
        setFav(true);
      })
      .catch((err) => {
        alert("cant add to fav");
        console.log(err);
      });
  };
  const RemoveFromFav = (itemId) => {
    var Email = loggedUser.email.replace("%40", "@");

    axios
      .delete(ApiUrl + `UserFavList/Item_ID/${itemId}/User_Email/${Email}`)
      .then((res) => {
        setUsersFavList((prevList) => prevList.filter((id) => id !== itemId));
        setFav(false);

        alert("removed " + itemId);
      })
      .catch((err) => {
        alert("cant remove from fav");
        console.log(err);
        console.log("newFav", newFav);
      });
  };

  //stringify all item's categories
  const ArrayToStringCat = (dataObj) => {
    const categoryNames = dataObj.map((item) => item.category_name);
    const concatenatedString = categoryNames.join("#");
    return concatenatedString;
  };

  function renderSlide() {
    return (
      <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackSvg />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderColor: COLORS.goldenTransparent_03,
            borderWidth: 2,
            paddingTop: 100,
          }}></View>
      </View>
    );
  }

  function renderContent() {
    return (
      <View>
        {/* {renderDots()} */}
        {/* <View style={styles.container} /> */}

        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.Row}>
              <View>
                {/* 12 זה גם משלוח וגם איסוף עצמי */}
                {(shippingMethod == 1 || shippingMethod == 12) && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      marginBottom: 5,
                    }}>
                    ✓ איסוף עצמי
                  </Text>
                )}
                {(shippingMethod == 2 || shippingMethod == 12) && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 13,
                      marginBottom: 5,
                    }}>
                    ✓ משלוח
                  </Text>
                )}
              </View>

              <View style={styles.Col}>
                <Text style={styles.itemHeader}>{item.name}</Text>
                <Text
                  style={{ textAlign: "right", fontSize: 13, marginBottom: 5 }}>
                  ♡ 17 אהבו פריט זה
                </Text>
              </View>
            </View>

            <Swiper style={styles.imageSwipperContainer}>
              {itemImages.map((image, index) => (
                <ImageBackground
                  key={index}
                  style={styles.image}
                  source={{ uri: image }}>
                  {/* in fav list */}
                  {UsersFavList.includes(item.id) && (
                    <TouchableOpacity
                      style={styles.favIcon}
                      onPress={() => RemoveFromFav(item.id)}>
                      <HeartTwoSvg filled={true} />
                    </TouchableOpacity>
                  )}
                  {/* not in fav list */}
                  {!UsersFavList.includes(item.id) && (
                    <TouchableOpacity
                      style={styles.favIcon}
                      onPress={() => AddtoFav(item.id)}>
                      <HeartTwoSvg filled={false} />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity style={styles.shareIcon}>
                    <ShareSvg></ShareSvg>
                  </TouchableOpacity>
                </ImageBackground>
              ))}
            </Swiper>

            <View style={styles.Row}>
              <View>
                {!follow && (
                  <Button
                    title="עקבי                            "
                    containerStyle={{ marginBottom: 13 }}
                    onPress={() => {
                      setFollow(true);
                      followCloset();
                    }}
                  />
                )}
              </View>
              <View>
                {follow && (
                  <ButtonFollow
                    title="עוקבת                          "
                    containerStyle={{ marginBottom: 13 }}
                    onPress={() => {
                      setFollow(false);
                      unfollowCloset();
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}>
                <ImageBackground
                  source={{
                    // uri: loggedUser.user_image,
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Angelina_Jolie_%2848462859552%29_%28cropped%29.jpg/800px-Angelina_Jolie_%2848462859552%29_%28cropped%29.jpg",
                  }}
                  style={styles.userImage}
                  imageStyle={{ borderRadius: 40 }}></ImageBackground>
                <Text> </Text>
                <Text> </Text>
                <Text
                  style={{
                    ...FONTS.Mulish_700Bold,
                    fontSize: 16,
                    color: COLORS.gray,
                    lineHeight: 22 * 1.2,
                  }}>
                  הארון של
                </Text>
                <Text> </Text>
                <Text
                  style={{
                    ...FONTS.Mulish_700Bold,
                    fontSize: 16,
                    color: COLORS.black,
                    lineHeight: 22 * 1.2,
                  }}>
                  דנוש
                </Text>
              </View>
            </View>
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
                    {" "}
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
                  <Text style={styles.descriptionHeader}> 23 ק"מ (ידני)</Text>
                  <Text style={styles.descriptionText}> מרחק ממך</Text>
                </View>
              </View>
            </View>
            <View></View>
            <View style={styles.dseContainer}>
              <Text style={styles.description}>
                {ArrayToStringCat(itemCtegories)}
                {"\n"} {item.description}
              </Text>
            </View>
            <View>
              <Button
                title="+ הוסיפי לסל קניות"
                containerStyle={{ marginBottom: 13 }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
      {renderSlide()}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  topIcons: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    paddingHorizontal: 20,
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width,
    marginBottom: 30,
  },
  favIcon: {
    position: "absolute",
    left: 12,
    top: 190,
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
    top: 235,
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
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
    top: -50,
  },
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

  contentContainer: {
    paddingVertical: 30,
    paddingTop: 10,
    // backgroundColor: COLORS.white,
    backgroundColor: "#EFEDE6",
    width: "100%",
    paddingHorizontal: 30,
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
