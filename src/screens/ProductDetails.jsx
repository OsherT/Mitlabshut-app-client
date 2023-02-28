import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES } from "../constants";
import { Button } from "../components";
import {
  ArrowFive,
  BackSvg,
  Check,
  Edit,
  HeartTwoSvg,
  HeartSvg,
  RatingSvg,
} from "../svg";
import ButtonFollow from "../components/ButtonFollow";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SharetSvg from "../svg/ShareSvg";
import ShareSvg from "../svg/ShareSvg";

export default function ProductDetails(props) {
  const navigation = useNavigation();
  // const route = useRoute();
  const item = props.route.params.item;
  const [follow, setFollow] = useState(false);
  const [shippingMethod, setShippingMethod] = useState(item.shipping_method);

  const followCloset = () => {
    Alert.alert("follow");
  };
  const unfollowCloset = () => {
    Alert.alert("unfollow");
  };

  function renderSlide() {
    return (
      <View style={{ flex: 1, backgroundColor: "#EFEDE6" }}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackSvg />
          </TouchableOpacity>

          <TouchableOpacity>
            <HeartTwoSvg />
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
                {/* 21 זה גם משלוח וגם איסוף עצמי */}
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
            <ImageBackground
              style={styles.image}
              source={{
                uri: "https://images.asos-media.com/products/asos-design-long-sleeve-blouse-with-pocket-detail-in-ivory/14020990-1-ivory?$n_640w$&wid=513&fit=constrain",
              }}>
              <TouchableOpacity
                style={{ left: 12, top: 250 }}
                onPress={() => RemoveFromFav(item.id)}>
                <HeartSvg filled={false} />
              </TouchableOpacity>
              {/* 
              <TouchableOpacity style={{ left: 12, top: 300 }}>
                <ShareSvg size={24} />
              </TouchableOpacity> */}
            </ImageBackground>

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
              <Text style={styles.description}> {item.description}</Text>
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
    // borderColor: COLORS.goldenTransparent_03,
    // borderBottomWidth: 2,
  },
  line: {
    borderColor: COLORS.goldenTransparent_03,
    borderWidth: 1,
    marginBottom: 20,
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
