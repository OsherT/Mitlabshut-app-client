import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import {
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  AccountCreated,
  VerifyPhoneNumber,
  ConfirmationCode,
  NewPassword,
  RessetPasswordNotice,
  MainLayout,
  EditProfile,
  OrderFailed,
  CartIsEmpty,
  Order,
  Checkout,
  ShippingDetails,
  PaymentMethod,
  OrderHistory,
  PaymentMethodCheckout,
  MyAddress,
  FAQ,
  MyPromocodes,
  Filter,
  SelectSize,
  SelectColor,
  Reviews,
  TrackYourOrder,
  NewAddress,
  NewCard,
} from "../screens";
import Home from "../screens/Home";
import ProductDetails from "../screens/ProductDetails";
import Closet from "../screens/Closet";
import { userContext } from "./userContext";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import UploadItem from "../screens/UploadItem";
import EditItem from "../screens/EditItem";
import OrderSuccessful from "../screens/OrderSuccessful";
import ItemUpdateSucc from "../screens/ItemUpdateSucc";
import ItemsByCtegory from "../screens/ItemsByCtegory";
import WishList from "../screens/WishList";
import PasswordHasBeenResetScreen from "../screens/RessetPasswordNotice";
import SearchRes from "../screens/SearchRes";
import axios from "axios";

const Stack = createStackNavigator();

export default function Navigation() {
  const [itemCategories, setitemCategories] = useState([]);
  const [loggedUser, setloggedUser] = useState("");
  const [closetDesc, setclosetDesc] = useState("");
  const [closetName, setclosetName] = useState("");


  function GetItemForAlgo(itemId, score, closetId, loggedUser_id) {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemById/Id/0" +
          itemId
      )
      .then((res) => {
        getItemCategories_ForAlgorithm(
          itemId,
          score,
          closetId,
          loggedUser_id,
          res.data[0].type
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getItemCategories_ForAlgorithm = (
    item_id,
    score,
    closetId,
    loggedUser_id,
    item_type
  ) => {
    axios
      .get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemCategortById/Item_ID/${item_id}`
      )
      .then((res) => {
        const itemCategories = res.data.map((item) => item.category_name);
        algorithmFunc(item_id, score, closetId, loggedUser_id, item_type,itemCategories);
      })
      .catch((err) => {
        console.log("cant get categories", err);
      });
  };

  const algorithmFunc = (
    item_id,
    score,
    closetId,
    loggedUser_id,
    item_type,
    itemCategories
  ) => {
    itemCategories.map((category_name) => {
      console.log(`https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/SmartAlgoStepOne/category_name/${hebrewToUrlEncoded(
        category_name
      )}/item_type_name/${item_type}/score/${score}/user_id/${loggedUser_id}`);
      axios
        .post(
          `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/SmartAlgoStepOne/category_name/${hebrewToUrlEncoded(
            category_name
          )}/item_type_name/${hebrewToUrlEncoded(item_type)}/score/${score}/user_id/${loggedUser_id}`
        )
        .then((res) => {
          console.log("yay");
        })
        .catch((err) => {
          console.log("nay", err);
        });
    });

    itemCategories.splice(0, itemCategories.length);
  };

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

  return (
    <NavigationContainer>
      <userContext.Provider
        value={{
          loggedUser,
          setloggedUser,
          closetDesc,
          setclosetDesc,
          closetName,
          setclosetName,
          getItemCategories_ForAlgorithm,
          GetItemForAlgo,
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShown: false,
          }}
          initialRouteName="SignIn"
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="WishList" component={WishList} />
          <Stack.Screen name="UploadItem" component={UploadItem} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SearchRes" component={SearchRes} />

          <Stack.Screen name="NewCard" component={NewCard} />
          <Stack.Screen name="MyAddress" component={MyAddress} />
          <Stack.Screen name="NewAddress" component={NewAddress} />
          <Stack.Screen name="SelectSize" component={SelectSize} />
          <Stack.Screen name="MyPromocodes" component={MyPromocodes} />
          <Stack.Screen name="SelectColor" component={SelectColor} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TrackYourOrder" component={TrackYourOrder} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="ItemsByCtegory" component={ItemsByCtegory} />
          <Stack.Screen
            name="PasswordHasBeenResetScreen"
            component={PasswordHasBeenResetScreen}
          />
          <Stack.Screen
            name="PaymentMethodCheckout"
            component={PaymentMethodCheckout}
          />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Closet" component={Closet} />
          <Stack.Screen name="ShippingDetails" component={ShippingDetails} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="CartIsEmpty" component={CartIsEmpty} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="EditItem" component={EditItem} />
          <Stack.Screen name="OrderFailed" component={OrderFailed} />
          <Stack.Screen name="MainLayout" component={MainLayout} />
          <Stack.Screen name="OrderSuccessful" component={OrderSuccessful} />
          <Stack.Screen name="ItemUpdateSucc" component={ItemUpdateSucc} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="RessetPasswordNotice"
            component={RessetPasswordNotice}
          />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
          <Stack.Screen
            name="VerifyPhoneNumber"
            component={VerifyPhoneNumber}
          />
          <Stack.Screen name="AccountCreated" component={AccountCreated} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </userContext.Provider>
    </NavigationContainer>
  );
}
