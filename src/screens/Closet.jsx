import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../navigation/userContext";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  FlatList,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Edit } from "../svg";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../svg";
import { Header, ContainerComponent, ProfileCategory } from "../components";
import { COLORS, products, FONTS } from "../constants";
import MainLayout from "./MainLayout";

export default function Closet() {
  const { loggedUser} = useContext(userContext);
  const [ClosetDesc, setClosetDesc] = useState("");
  const [UsersItems, setUsersItems] = useState([]);
  useEffect(() => {
    ClosetDescription();
    ClosetItems();
    return () => {};
  }, []);

  function ClosetDescription() {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet") //לשנות כשדנה עושה החזרת הדיסקריפשן לפי איידי
      .then((res) => {
        setClosetDesc(
          res.data.map((x) => {
            if (x.id === loggedUser.closet_id) return x.description;
          })
        );
      })
      .catch((err) => {
        alert("cant take");
        console.log(err);
      });
  }
  function ClosetItems() {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/ClosetId/"+loggedUser.closet_id) 
      .then((res) => {
        setUsersItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert("cant take items");
        console.log(err);
      });
  }
  function renderUserContent() {
    return (
      <View
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <ImageBackground
              source={{
                uri: loggedUser.user_image,
              }}
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 15,
              }}
              imageStyle={{ borderRadius: 40 }}
            >
              <View
                style={{
                  position: "absolute",
                  right: 3,
                  bottom: 3,
                }}
              >
                <Edit />
              </View>
            </ImageBackground>
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
              {loggedUser.full_name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_400Regular,
                fontSize: 14,
                color: COLORS.gray,
                lineHeight: 14 * 1.7,
              }}
            >
              {ClosetDesc}
            </Text>
          </TouchableOpacity>
        </ContainerComponent>
      </View>
    );
  }
  function renderClothes() {
    return (
      <FlatList
        data={products}
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
            onPress={() =>
              navigation.navigate("ProductDetails", {
                productDetails: item,
                productSlides: item.slides,
              })
            }
          >
            <ImageBackground
              source={item.photo_480x384}
              style={{
                width: "100%",
                height: 128,
              }}
              imageStyle={{ borderRadius: 10 }}
            >
              <TouchableOpacity style={{ left: 12, top: 12 }}>
                <HeartSvg />
              </TouchableOpacity>
            </ImageBackground>
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
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 14,
                }}
              >
                Size: {item.size}
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
                  color: COLORS.carrot,
                }}
              >
                {item.price}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 12,
                bottom: 12,
              }}
            >
              <BagSvg />
            </TouchableOpacity>
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
      {/* <Header title="הארון של`{}`" goBack={false} /> */}
      {renderUserContent()}
      {renderClothes()}
      {/* <MainLayout /> */}
    </SafeAreaView>
  );
}
