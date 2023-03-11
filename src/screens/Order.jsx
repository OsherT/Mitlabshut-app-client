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
  RatingComponent,
  Button,
  Line,
} from "../components";
import { AREA, COLORS, FONTS, SIZES, products } from "../constants";
import { Plus, Minus, Check, BagSvg } from "../svg";
import axios from "axios";
import { userContext } from "../navigation/userContext";

export default function Order() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { loggedUser } = useContext(userContext);
  const [ItemsinCart, setItemsinCart] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);


  useEffect(() => {
    if (isFocused) {
      getItemsData();
    }
  }, [isFocused]);

  function getItemsData() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetShopItemByUserId/UserID/" +
          loggedUser.id
      )
      .then((res) => {
        console.log(res.data.length);
        setItemsinCart(res.data);
        GetItemPhotos(res.data); // Move this line inside the then block
      })
      .catch((err) => {
        setItems("");
      });
  }
  function GetItemPhotos(items) {
    const promises = items.map((item) => {
      return axios.get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItem_Image_VideoItemById/Item_ID/" +
          item.id
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
        getItemsData();
        setItems((prevList) => prevList.filter((id) => id !== itemId));
        
      })
      .catch((err) => {
        
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
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}>
        {ItemsinCart && Array.isArray(ItemsinCart) && ItemsinCart.length > 0 ? (
          ItemsinCart.map((item, index) => {
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
                    style={{ position: "absolute", right: 12, bottom: 12 }}
                    onPress={() => RemoveFromShopList(item.id)}
                  >
                    <BagSvg color="#626262" inCart={true} />
                  </TouchableOpacity>
                
                
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
סל הקניות שלך ריק          </Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            alignSelf: "flex-start",
            paddingHorizontal: 18,
            paddingVertical: 3,
            borderRadius: 40,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}>
          <Text
            style={{
              ...FONTS.Mulish_400Regular,
              fontSize: 16,
              textTransform: "capitalize",
              lineHeight: 16 * 1.7,
              color: COLORS.black,
              paddingRight: 10,
            }}>
            Promocode applied
          </Text>
          <Check color={COLORS.green} />
        </TouchableOpacity>
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
              Subtotal
            </Text>
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                fontSize: 16,
                color: COLORS.black,
                textTransform: "capitalize",
                lineHeight: 16 * 1.2,
              }}>
              $45.98
            </Text>
          </View>
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
                color: COLORS.gray,
                textTransform: "capitalize",
                lineHeight: 16 * 1.2,
              }}>
              Discount
            </Text>
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                fontSize: 16,
                color: COLORS.gray,
                textTransform: "capitalize",
                lineHeight: 16 * 1.2,
              }}>
              -4.29
            </Text>
          </View>
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
                fontSize: 18,
                color: COLORS.black,
                textTransform: "capitalize",
                lineHeight: 16 * 1.2,
              }}>
              Total
            </Text>
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                fontSize: 18,
                color: COLORS.black,
                textTransform: "capitalize",
                lineHeight: 16 * 1.2,
              }}>
              $41.69
            </Text>
          </View>
          <Button
            title="Checkout"
            containerStyle={{ marginTop: 35 }}
            onPress={() => navigation.navigate("Checkout")}
          />
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="סל קניות" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
