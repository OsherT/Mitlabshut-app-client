import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, ContainerComponent, Button } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import axios from "axios";
import { userContext } from "../navigation/userContext";

export default function Filter() {
  const {
    loggedUser,
    type_,
    setType_,
    setFlag_,
    setSorted_,
    setSelectedTab,
  } = useContext(userContext);
  const ApiUrl = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item`;
//selected
  const [size, setSize] = useState("null");
  const [selectColor, setSelectColor] = useState("null");
  const [productCat, setProductCat] = useState("null");
  const [productBrand, setProductBrand] = useState("null");
  const [maxVal, setmaxVal] = useState(-1);
  const [minVal, setminVal] = useState(-1);

//lists
  const [brandsList, setBrandsList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const type = type_;

  useEffect(() => {
    GetColorsList();
    GetSizesList();
    GetCategoriesList();
    GetBrandsList();
  }, []);
//פונקציה הממירה סטרינג בעברית לקוד URL
  function hebrewToUrlEncoded(hebrewStr) {
    const utf8EncodedStr = unescape(encodeURIComponent(hebrewStr));
    let encodedStr = "";
    for (let i = 0; i < utf8EncodedStr.length; i++) {
      // Get the UTF-8 code unit for the character
      const charCode = utf8EncodedStr.charCodeAt(i);
      // Convert the code unit to its hexadecimal representation
      const hexStr = charCode.toString(16).toUpperCase();
      // Add a percent sign before the hexadecimal representation
      encodedStr += "%" + hexStr;
    }
    return encodedStr;
  }
//קבלת הפריטים בהתאם לסינון 
  function SortItems() {
    if (
      productBrand == "null" &&
      selectColor == "null" &&
      productCat == "null" &&
      minVal == -1 &&
      maxVal == -1 &&
      size == "null"
    ) {
      setSelectedTab("ItemsByCtegory");
      setType_(type);//לא נבחר כלום לכן חוזרים לדף פריט
    } else {
      let url = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByUserIdAndFilters/UserId/${
        loggedUser.id
      }?ItemType=${hebrewToUrlEncoded(type)}&`;

      url +=
        productBrand !== "null"
          ? `&ItemBrand=${productBrand}&`
          : "ItemBrand=null&";
      url +=
        selectColor !== "null"
          ? `&ItemColor=${hebrewToUrlEncoded(selectColor)}&`
          : "ItemColor=null&";
      url += size !== "null" ? `&ItemSize=${size}&` : "ItemSize=null&";
      url +=
        productCat !== "null"
          ? `&ItemCategory=${hebrewToUrlEncoded(productCat)}&`
          : "ItemCategory=null&";
      url += `MinPrice=${minVal}&MaxPrice=${maxVal}`;//יצירת הקישור לטובת הגט

      axios
        .get(url)
        .then((res) => {
          if (res.data !== 0 && type) {
            setSelectedTab("ItemsByCtegory");
            setType_(type);
            setSorted_(res.data);
            setFlag_(false);//חזרה לדף הקטגוריה עם הפריטים העונים על הסינון
          } else {
            setSelectedTab("ItemsByCtegory");
            setType_(type);
            setSorted_(null);
            setFlag_(true);
          }
        })
        .catch((err) => {
          console.log("err in SortItems ", err);
        });
    }
  }
//קבלת המידע הנדרש לטובת הסינון
//קבלת רשימת הצבעים
  const GetColorsList = () => {
    fetch(ApiUrl + "/GetColor", {
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
          setColorsList(
            data.map((item) => ({ value: item.color_name, color: item.color }))
          );
        },
        (error) => {
          console.log("colors error", error);
        }
      );
  };
//קבלת רשימת המידות
  const GetSizesList = () => {
    fetch(ApiUrl + "/GetItem_size", {
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
          setSizesList(data.map((item) => ({ value: item.size_name })));
        },
        (error) => {
          console.log("size error", error); //
        }
      );
  };
//קבלת רשימת הקטגוריות
  const GetCategoriesList = () => {
    fetch(ApiUrl + "/GetCategory", {
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
          var categoryOptions = data.map((item) => item.category_name);
          setCategoriesList(
            categoryOptions.map((category) => ({
              value: category,
            }))
          );
        },
        (error) => {
          console.log("category error", error);
        }
      );
  };
//קבלת רשימת המותגים
  const GetBrandsList = () => {
    fetch(ApiUrl + "/GetBrand", {
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
          setBrandsList(data.map((item) => ({ value: item.brand_name })));
        },
        (error) => {
          console.log("barnd error", error);
        }
      );
  };
  //רינדור אופציות הסינון 
  function renderContent() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent>
          <Text
            style={{
              ...FONTS.Mulish_600SemiBold,
              fontSize: 16,
              marginBottom: 14,
              color: COLORS.black,
              alignSelf: "flex-end",
            }}>
            מידה
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sizesList.map((item, index) => {
                const isSelected = size === item.value;
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 40,
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 20,
                      borderColor: isSelected
                        ? COLORS.golden
                        : COLORS.goldenTransparent_05,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 11,
                      backgroundColor: isSelected
                        ? COLORS.golden
                        : COLORS.white,
                    }}
                    onPress={() => {
                      setSize(isSelected ? null : item.value);
                    }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_600SemiBold,
                        fontSize: 12,
                        color: isSelected ? COLORS.white : COLORS.black,
                      }}>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <Text
            style={{
              ...FONTS.Mulish_600SemiBold,
              fontSize: 16,
              marginBottom: 14,
              color: COLORS.black,
              alignSelf: "flex-end",
            }}>
            צבע
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {colorsList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 34,
                      height: 34,
                      backgroundColor: item.color,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 14,
                      borderWidth: selectColor === item.value ? 3 : 0.3,
                      borderColor: COLORS.golden,
                    }}
                    onPress={() =>
                      setSelectColor(item.value)
                    }></TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <Text
            style={{
              ...FONTS.Mulish_600SemiBold,
              fontSize: 16,
              marginBottom: 14,
              color: COLORS.black,
              alignSelf: "flex-end",
            }}>
            מחיר
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}>
            <View
              style={{
                width: 90,
                height: 30,
                borderRadius: 15,
                borderColor: COLORS.goldenTransparent_05,
                borderWidth: 1,
                marginRight: 10,
                marginLeft: 10,
              }}>
              <TextInput
                placeholder="₪ 1500"
                textAlign={"center"}
                style={{ marginTop: 5 }}
                keyboardType="numeric"
                onChangeText={(text) => setmaxVal(Number(text))}
              />
            </View>
            <Text
              style={{
                marginRight: 8,
                ...FONTS.Mulish_400Regular,
                fontSize: 14,
                color: COLORS.black,
                marginRight: 10,
              }}>
              מקסימום
            </Text>
            <View
              style={{
                width: 90,
                height: 30,
                borderRadius: 15,
                borderColor: COLORS.goldenTransparent_05,
                borderWidth: 1,
                marginLeft: 10,
              }}>
              <TextInput
                placeholder="₪ 0"
                textAlign={"center"}
                style={{ marginTop: 5 }}
                keyboardType="numeric"
                onChangeText={(text) => setminVal(Number(text))}
              />
            </View>
            <Text
              style={{
                margin: 10,
                ...FONTS.Mulish_400Regular,
                fontSize: 14,
                color: COLORS.black,
              }}>
              מינימום
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                fontSize: 16,
                marginBottom: 14,
                color: COLORS.black,
                alignSelf: "flex-end",
              }}>
              קטגוריות
            </Text>
            <View
              style={{
                marginBottom: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                flexDirection: "row-reverse",
              }}>
              {categoriesList.map((item, index) => (
                <TouchableOpacity
                  style={{
                    marginBottom: 8,
                    marginRight: 8,
                    borderRadius: 50,
                    borderColor:
                      productCat == item
                        ? COLORS.golden
                        : COLORS.goldenTransparent_05,
                    borderWidth: 1,
                    backgroundColor:
                      productCat == item.value
                        ? COLORS.golden
                        : COLORS.transparent,
                  }}
                  key={item.value}
                  onPress={() => {
                    if (productCat === item.value) {
                      setProductCat(null);
                    } else {
                      setProductCat(item.value);
                    }
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 6,
                      textTransform: "uppercase",
                      fontSize: 12,
                      ...FONTS.Mulish_600SemiBold,
                      color: productCat == index ? COLORS.white : COLORS.black,
                    }}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text
              style={{
                ...FONTS.Mulish_600SemiBold,
                fontSize: 16,
                marginBottom: 14,
                color: COLORS.black,
                alignSelf: "flex-end",
              }}>
              מותגים ורשתות
            </Text>
            <View
              style={{
                marginBottom: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                flexDirection: "row-reverse",
              }}>
              {brandsList.map((item, index) => (
                <TouchableOpacity
                  style={{
                    marginBottom: 8,
                    marginRight: 8,
                    borderRadius: 50,
                    borderColor:
                      productBrand == item
                        ? COLORS.golden
                        : COLORS.goldenTransparent_05,
                    borderWidth: 1,
                    backgroundColor:
                      productBrand == item.value
                        ? COLORS.golden
                        : COLORS.transparent,
                  }}
                  key={item.value}
                  setProductBrand
                  onPress={() => {
                    if (productBrand === item.value) {
                      setProductBrand(null);
                    } else {
                      setProductBrand(item.value);
                    }
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 6,
                      textTransform: "uppercase",
                      fontSize: 12,
                      ...FONTS.Mulish_600SemiBold,
                      color:
                        productBrand == index ? COLORS.white : COLORS.black,
                    }}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Button title="חיפוש" onPress={() => SortItems()} />
        </ContainerComponent>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
      <Header title="סינון" />
      {renderContent()}
    </SafeAreaView>
  );
}
