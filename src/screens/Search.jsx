import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import { COLORS, FONTS } from "../constants";
import { SearchSvg } from "../svg";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userContext } from "../navigation/userContext";

export default function Search() {
  const navigation = useNavigation();
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api`;
  const { setSelectedTab, setSearchText_, setType_, setFlag_, setSorted_ } =
    useContext(userContext);
  const isFocused = useIsFocused();
  const [typeList, setTypeList] = useState([]);
  const [search, setsearch] = useState("");

  //renders the types when the page finishes to load
  useEffect(() => {
    if (isFocused) {
      getTypeList();
    }
    return () => {};
  }, []);

  //gets the types list
  const getTypeList = () => {
    axios
      .get(ApiUrl + `/Item/GetItem_type`)
      .then((res) => {
        setTypeList(res.data);
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
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                if (search !== "") {
                  setSelectedTab("SearchRes");
                  setSearchText_(search);
                }
              }}>
              <SearchSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ flex: 1, textAlign: "right", paddingRight: 15 }}
            placeholder="חפשי פריט (קטגוריה/ מותג/ שם פריט)..."
            defaultValue=""
            keyboardType="default"
            returnKeyType="search"
            onChangeText={(text) => setsearch(text)}
            onSubmitEditing={({ nativeEvent }) => {
              if (search !== "") {
                setSelectedTab("SearchRes");
                setSearchText_(nativeEvent.text);
              }
            }}
          />
        </View>
      </View>
    );
  }

  //renders the main content
  function renderTyps() {
    return (
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}>
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
                  onPress={() => {
                    setSelectedTab("ItemsByCtegory");
                    setSearchText_(search);
                    setType_(type.item_type_name);
                    setSorted_(null);
                    setFlag_(false);
                  }}>
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
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Add this line for Android compatibility
      }}>
      <Header title="חיפוש פריט" goBack={false} />
      {renderSearch()}
      {renderTyps()}
    </SafeAreaView>
  );
}
