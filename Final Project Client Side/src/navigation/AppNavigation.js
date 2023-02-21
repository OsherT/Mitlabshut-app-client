import React from "react";
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
    ProductDetails,
    SelectSize,
    SelectColor,
    Reviews,
    TrackYourOrder,
    NewAddress,
    NewCard,
} from "../screens";

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerShown: false,
                }}
                initialRouteName="OnBoarding"
            >
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="OrderHistory" component={OrderHistory} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="NewCard" component={NewCard} />
                <Stack.Screen name="MyAddress" component={MyAddress} />
                <Stack.Screen name="NewAddress" component={NewAddress} />
                <Stack.Screen name="SelectSize" component={SelectSize} />
                <Stack.Screen name="MyPromocodes" component={MyPromocodes} />
                <Stack.Screen name="SelectColor" component={SelectColor} />
                <Stack.Screen
                    name="TrackYourOrder"
                    component={TrackYourOrder}
                />
                <Stack.Screen name="FAQ" component={FAQ} />
                <Stack.Screen name="Reviews" component={Reviews} />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                />
                <Stack.Screen
                    name="PaymentMethodCheckout"
                    component={PaymentMethodCheckout}
                />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen
                    name="ShippingDetails"
                    component={ShippingDetails}
                />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="CartIsEmpty" component={CartIsEmpty} />
                <Stack.Screen name="Filter" component={Filter} />
                <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="OrderFailed" component={OrderFailed} />
                <Stack.Screen name="MainLayout" component={MainLayout} />
                <Stack.Screen
                    name="OrderSuccessful"
                    component={OrderSuccessful}
                />
                <Stack.Screen
                    name="RessetPasswordNotice"
                    component={RessetPasswordNotice}
                />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen
                    name="ConfirmationCode"
                    component={ConfirmationCode}
                />
                <Stack.Screen
                    name="VerifyPhoneNumber"
                    component={VerifyPhoneNumber}
                />
                <Stack.Screen
                    name="AccountCreated"
                    component={AccountCreated}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />
                <Stack.Screen name="SignIn" component={SignIn} />
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}
