import React, { useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import { userContext } from "./userContext";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";
import Home from "../screens/Home";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import AccountCreated from "../screens/AccountCreated";
import RessetPasswordNotice from "../screens/RessetPasswordNotice";
import MainLayout from "../screens/MainLayout";
import EditProfile from "../screens/EditProfile";
import CartIsEmpty from "../screens/CartIsEmpty";
import Order from "../screens/Order";
import Filter from "../screens/Filter";
import ProductDetails from "../screens/ProductDetails";
import Closet from "../screens/Closet";
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
import SearchUsersFollow from "../screens/SearchUsersFollow";
import SearchAllUsers from "../screens/SearchAllUsers";

const Stack = createStackNavigator();

export default function Navigation() {
  const [selectedTab, setSelectedTab] = useState("Home");

  //user
  const [loggedUser, setloggedUser] = useState("");
  const [owner_, setOwner_] = useState("");

  //filter
  const [searchText_, setSearchText_] = useState("");
  const [sorted_, setSorted_] = useState("");
  const [type_, setType_] = useState("");

  //clost info
  const [closetDesc, setclosetDesc] = useState("");
  const [closetName, setclosetName] = useState("");
  const [closetId_, setClosetId_] = useState("");

  //flag
  const [flag_, setFlag_] = useState(false);

  //scores for algo
  const shopScore = 8;
  const favScore = 6;
  const viewScore = 4;

  //push notification
  async function sendPushNotification(expoPushToken, action, from) {
    var bodyMessage;
    if (action === "follow") {
      bodyMessage = `${from} התחילה לעקוב אחרייך 😊 \n כנסי לאפליקציה ותתעדכני `;
    }
    if (action === "like") {
      bodyMessage = `${from} עשתה לייק לפריט שלך ❤️ \n כנסי לאפליקציה ותתעדכני `;
    }
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "מתלבשות",
      body: bodyMessage,
      data: { someData: "goes here" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  //Token creator for push notification
  async function registerForPushNotificationsAsync() {
    console.log("in registerForPushNotificationsAsync ");
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  //קבלת הפריט עבור האלגוריתם
  function GetItemForAlgo(itemId, score, loggedUser_id) {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemById/Id/0" +
          itemId
      )
      .then((res) => {
        getItemCategories_ForAlgorithm(
          itemId,
          score,

          loggedUser_id,
          res.data[0].type
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //קבלת הקטגוריות לפריט בשביל האלגוריתם
  const getItemCategories_ForAlgorithm = (
    item_id,
    score,
    loggedUser_id,
    item_type
  ) => {
    axios
      .get(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemCategortById/Item_ID/${item_id}`
      )
      .then((res) => {
        const itemCategories = res.data.map((item) => item.category_name);
        algorithmFunc(item_id, score, loggedUser_id, item_type, itemCategories);
      })
      .catch((err) => {
        console.log("cant get categories", err);
      });
  };

  //על כל פעולה שהגדרנו- לייק לפריט, הוספת פריט לסל קניות וצפייה בפריט מעדכנים את טבלת הניקוד
  const algorithmFunc = (score, loggedUser_id, item_type, itemCategories) => {
    itemCategories.map((category_name) => {
      axios
        .post(
          `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/SmartAlgoStepOne/category_name/${hebrewToUrlEncoded(
            category_name
          )}/item_type_name/${hebrewToUrlEncoded(
            item_type
          )}/score/${score}/user_id/${loggedUser_id}`
        )
        .then((res) => {
          console.log("succ in algo");
        })
        .catch((err) => {
          console.log("err in algo", err);
        });
    });

    itemCategories.splice(0, itemCategories.length);
  };

  //Encode the Ebrew
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
          shopScore,
          favScore,
          viewScore,
          selectedTab,
          setSelectedTab,
          closetId_,
          setClosetId_,
          owner_,
          setOwner_,
          type_,
          setType_,
          searchText_,
          setSearchText_,
          flag_,
          setFlag_,
          sorted_,
          setSorted_,
          sendPushNotification,
          registerForPushNotificationsAsync,
        }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShown: false,
          }}
          initialRouteName="LogIn">
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen
            name="SearchUsersFollow"
            component={SearchUsersFollow}
          />
          <Stack.Screen name="WishList" component={WishList} />
          <Stack.Screen name="UploadItem" component={UploadItem} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="SearchRes" component={SearchRes} />
          <Stack.Screen name="SearchAllUsers" component={SearchAllUsers} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="ItemsByCtegory" component={ItemsByCtegory} />
          <Stack.Screen
            name="PasswordHasBeenResetScreen"
            component={PasswordHasBeenResetScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Closet" component={Closet} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="CartIsEmpty" component={CartIsEmpty} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="EditItem"
            component={EditItem}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="MainLayout"
            component={MainLayout}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="OrderSuccessful"
            component={OrderSuccessful}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="ItemUpdateSucc" component={ItemUpdateSucc} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="RessetPasswordNotice"
            component={RessetPasswordNotice}
          />
          <Stack.Screen
            name="AccountCreated"
            component={AccountCreated}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          {/* NOT IN USE */}

          {/* <Stack.Screen name="NewPassword" component={NewPassword} /> */}
          {/* <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} /> */}
          {/* <Stack.Screen
            name="VerifyPhoneNumber"
            component={VerifyPhoneNumber}
          /> */}
          {/* <Stack.Screen name="OrderHistory" component={OrderHistory} /> */}
          {/* <Stack.Screen name="NewCard" component={NewCard} /> */}
          {/* <Stack.Screen name="MyAddress" component={MyAddress} /> */}
          {/* <Stack.Screen name="NewAddress" component={NewAddress} /> */}
          {/* <Stack.Screen name="SelectSize" component={SelectSize} /> */}
          {/* <Stack.Screen name="MyPromocodes" component={MyPromocodes} /> */}
          {/* <Stack.Screen name="SelectColor" component={SelectColor} /> */}
          {/* <Stack.Screen name="TrackYourOrder" component={TrackYourOrder} /> */}
          {/* <Stack.Screen name="FAQ" component={FAQ} /> */}
          {/* <Stack.Screen name="Reviews" component={Reviews} /> */}
          {/* <Stack.Screen
            name="PaymentMethodCheckout"
            component={PaymentMethodCheckout}
          /> */}
          {/* <Stack.Screen name="Checkout" component={Checkout} /> */}
          {/* <Stack.Screen name="ShippingDetails" component={ShippingDetails} /> */}
          {/* <Stack.Screen name="PaymentMethod" component={PaymentMethod} /> */}
          {/* <Stack.Screen name="OrderFailed" component={OrderFailed} /> */}
        </Stack.Navigator>
        <FlashMessage position="top" />
      </userContext.Provider>
    </NavigationContainer>
  );
}
