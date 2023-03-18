import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { FilterSvg, SearchSvg} from "../svg";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Search() {
  const navigation = useNavigation();
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api`;

  const [typeList, setTypeList] = useState([]);
  const [typeBySearch, setTypeBySearch] = useState("");
  const [search, setsearch] = useState("");

  //renders the types when the page finishes to load
  useEffect(() => {
    getTypeList();
    return () => {};
  }, []);
  //gets the types list
  const getTypeList = () => {
    axios
      .get(ApiUrl + `/Item/GetItem_type`)
      .then((res) => {
        setTypeList(res.data);

        console.log("typeList", typeList);
      })
      .catch((err) => {
        console.log("err in typeList ", err);
      });
  };

  //renders the search section (upper)
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchRes", {
                  searchText: search,
                })
              }>
              <SearchSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right" }}
            placeholder="חפשי פריט..."
            onChangeText={(text) => setsearch(text)}
            keyboardType="web-search"
            defaultValue=""
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

  //renders the main content
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
                    height: 150,
                    backgroundColor: COLORS.white,
                    marginBottom: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("ItemsByCtegory", {
                      type: type.item_type_name,
                    })
                  }>
                  <ImageBackground
                    source={{
                      uri: type.item_type_image,
                    }}
                    style={{
                      width: 220,
                      height: "97%",
                      margin: 5,
                    }}
                    imageStyle={{ borderRadius: 10 }}></ImageBackground>
                  <View
                    style={{
                      padding: 35,
                      paddingTop: 65,
                      flex: 1,
                      alignContent: "center",
                    }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_400Regular,
                        fontSize: 20,
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
      <Header title="חיפוש פריט" />
      {renderSearch()}
      {renderTyps()}
    </SafeAreaView>
  );
}
