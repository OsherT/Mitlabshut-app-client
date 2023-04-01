import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Header,
  ContainerComponent,
  Button,
  Line,
} from "../components";
import { AREA, COLORS, FONTS} from "../constants";
import axios from "axios";
import { userContext } from "../navigation/userContext";
import { Swipeable } from "react-native-gesture-handler";
import WhatsAppSvg from "../svg/WhatsAppSvg";
import { Linking } from "react-native";

export default function Order() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { loggedUser } = useContext(userContext);
  
  const [ItemsinCart, setItemsinCart] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [ItemsData, setItemsData] = useState([]);
  const [sumTotal, setsumTotal] = useState("");
  const [swipeableRef, setSwipeableRef] = useState(null);

  const closeSwipeable = () => {
    swipeableRef && swipeableRef.close();
  };
  
  useEffect(() => {
    if (isFocused) {
      getShopItems();
    }
  }, [isFocused]);

  function getShopItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetShopByUserID/UserID/" +
          loggedUser.id
      )
      .then((res) => {
        getItemsData(res.data);
        setItemsinCart(res.data);
        GetItemPhotos(res.data);
      })
      .catch((err) => {
        setItemsinCart("");
      });
  }
  function getItemsData(items) {
    const promises = items.map((item) => {
      return axios.get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemById/Id/" +
          item.item_id
      );
    });

    Promise.all(promises)
      .then((responses) => {
        const Items = responses.flatMap((response) => response.data);
        setItemsData(Items);
        calSum(Items);
      })
      .catch((error) => {
        alert("cant take items");
        console.log(error);
      });
  }
  function GetItemPhotos(items) {
    const promises = items.map((item) => {
      return axios.get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages/GetItem_Image_VideoItemById/Item_ID/" +
          item.item_id
      );
    });

    Promise.all(promises)
      .then((responses) => {
        const photos = responses.flatMap((response) => response.data);
        setUsersItemPhotos(photos);
      })
      .catch((error) => {
        alert("cant take photos");
        console.log(error);
      });
  }
  function RemoveFromShopList(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteShopItem/ItemID/${itemId}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        getShopItems();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function calSum(Items) {
    let totalPrice = 0;
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].item_status === "active") {
        totalPrice += Items[i].price;
      }
    }
    setsumTotal(totalPrice);
  }
  function sendWhatsAppMessage() {
    const message = "Hello, this is a test message!";
    const phone = "+9720542550772";

    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url);
  }
  function renderContent() {
    return ( 
      <View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingVertical: 25,
          }}
          showsHorizontalScrollIndicator={false}>
          {ItemsinCart &&
          Array.isArray(ItemsinCart) &&
          ItemsinCart.length > 0 ? (
            ItemsData.map((item, index) => {
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
                      onPress={() => RemoveFromShopList(item.id)}>
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
                      elevation: 5,
                    }}
                    onPress={() => {
                      navigation.navigate("ProductDetails", {
                        item: item,
                      });
                    }}
                    disabled={
                      item.item_status === "sold" ||
                      item.item_status === "delete"
                    }>
                    {UsersItemPhotos.filter(
                      (photo) => photo.item_ID === item.id
                    )
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
                    {/* <TouchableOpacity
                    style={{ position: "absolute", right: 12, bottom: 12 ,zIndex:2}}
                    onPress={() => RemoveFromShopList(item.id)}
                  >
                    <BagSvg color="#626262" inCart={true} />
                  </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{ margin: 25 }}
                      onPress={sendWhatsAppMessage}>
                      <WhatsAppSvg />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Swipeable>
              );
            })
          ) : (<ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 25,
            }}
            showsHorizontalScrollIndicator={false}
        >
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
                    }}
                >
                    הסל שלך ריק!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Mulish_400Regular,
                        fontSize: 16,
                        color: COLORS.gray,
                        paddingHorizontal: 50,
                        marginBottom: 30,
                    }}
                >
                   נראה שאין לך פריטים בסל הקניות 
                </Text>
                <Button title="שוטטי בבזאר" />
            </ContainerComponent>
        </ScrollView>
            // <Text
            //   style={{
            //     textAlign: "center",
            //     ...FONTS.Mulish_700Bold,
            //     fontSize: 16,
            //     textTransform: "capitalize",
            //     color: COLORS.black,
            //     marginBottom: 4,
            //     lineHeight: 16 * 1.2,
            //   }}>
            //   סל הקניות שלך ריק{" "}
            // </Text>
          )}
        </ScrollView>
        {ItemsinCart.length > 0 ? (
          <ContainerComponent>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 16,
                  color: COLORS.black,
                  textTransform: "capitalize",
                  lineHeight: 16 * 1.2,
                }}>
                ₪ {sumTotal}
              </Text>
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 16,
                  color: COLORS.black,
                  textTransform: "capitalize",
                  lineHeight: 16 * 1.2,
                }}>
                סה"כ
              </Text>
            </View>

            <Button
              title="רכשי"
              containerStyle={{ marginTop: 25 }}
              onPress={() => navigation.navigate("Checkout")}
            />
          </ContainerComponent>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
//   function renderCartIsEmpty() {
//     return (
//         <ScrollView
//             contentContainerStyle={{
//                 flexGrow: 1,
//                 paddingHorizontal: 20,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 paddingVertical: 25,
//             }}
//             showsHorizontalScrollIndicator={false}
//         >
//             <ContainerComponent>
//                 <View style={{ alignSelf: "center", marginBottom: 35 }}>
//                     <Empty />
//                 </View>
//                 <Text
//                     style={{
//                         textAlign: "center",
//                         ...FONTS.H2,
//                         textTransform: "capitalize",
//                         color: COLORS.black,
//                         lineHeight: 22 * 1.2,
//                         marginBottom: 18,
//                     }}
//                 >
//                     Your cart is empty!
//                 </Text>
//                 <Text
//                     style={{
//                         textAlign: "center",
//                         ...FONTS.Mulish_400Regular,
//                         fontSize: 16,
//                         color: COLORS.gray,
//                         paddingHorizontal: 50,
//                         marginBottom: 30,
//                     }}
//                 >
//                     Looks like you haven't made your order yet.
//                 </Text>
//                 <Button title="shop now" />
//             </ContainerComponent>
//         </ScrollView>
//     );
// }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="סל קניות" />
      {renderContent()}
    </SafeAreaView>
  );
}
