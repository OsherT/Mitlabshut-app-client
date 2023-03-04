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
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Line, Header, RatingComponent } from "../components";
import { COLORS, products, FONTS } from "../constants";
import { FilterSvg, SearchSvg, BagSvg, HeartSvg } from "../svg";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Search() {
  const navigation = useNavigation();
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/`;

  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    getTypeList();
    return () => {};
  }, []);

  const getTypeList = () => {
    axios
      .get(ApiUrl + `Item_type`)
      .then((res) => {
        setTypeList(res.data);
        console.log("typeList", typeList);
      })
      .catch((err) => {
        console.log("err in typeList ", err);
      });
  };

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
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <SearchSvg />
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right" }}
            placeholder="חפשי פריט..."
            onChangeText={(text) => setType(text)}
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
  }

  function renderTyps() {
    return (
      <KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          {typeList.map((type, index) => {
            return (
              type.item_type_name && (
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
                  // onPress={() =>
                  //   navigation.navigate("ItemsByCtegory", {
                  //     // productDetails: item,
                  //     // productSlides: item.slides,
                  //     type: type,
                  //   })                  }
                >
                  <ImageBackground
                    // source={type.item_type_image}
                    source={{
                      uri: "https://myjeans.co.il/wp-content/uploads/2022/05/WhatsApp-Image-2022-05-02-at-14.00.27-1.jpeg",
                    }}
                    style={{
                      width: 100,
                      height: "100%",
                    }}
                    imageStyle={{ borderRadius: 10 }}></ImageBackground>
                  <View
                    style={{
                      padding: 35,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_600SemiBold,
                        fontSize: 25,
                        textTransform: "capitalize",
                        marginBottom: 6,
                        textAlign: "right",
                      }}>
                      {type.item_type_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            );
          })}
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Header title="חיפוש פריט" goBack={false} />
      {renderSearch()}
      {renderTyps()}
      {/* {renderContent()} */}
    </SafeAreaView>
  );
}
