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
  OrderSuccessful,
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

const Stack = createStackNavigator();

export default function Navigation() {

  const [loggedUser, setloggedUser] = useState("");

  return (
    <NavigationContainer>
      <userContext.Provider value={{ loggedUser, setloggedUser }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShown: false,
          }}
          initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="UploadItem" component={UploadItem} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="SignUp" component={SignUp} />
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
