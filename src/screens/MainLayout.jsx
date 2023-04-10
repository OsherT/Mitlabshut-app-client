import { View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Home from "./Home";
import Search from "./Search";
import WishList from "./WishList";
import Profile from "./Profile";
import Closet from "./Closet";
import {
  HomeTab,
  SearchTab,
  WishListTab,
  ProfileTab,
  TabElement,
  Bag,
} from "../svg";
import { COLORS } from "../constants";
import { userContext } from "../navigation/userContext";
import Order from "./Order";
import SearchUsersFollow from "./SearchUsersFollow";
import ItemsByCtegory from "./ItemsByCtegory";
import SearchRes from "./SearchRes";
import Filter from "./Filter";
import SearchAllUsers from "./SearchAllUsers";
import EditProfile from "./EditProfile";
import { Image } from "react-native";

//shows the navbar of the application
export default function MainLayout() {
  const { loggedUser, selectedTab, setSelectedTab, setOwner_, setClosetId_ } =
    useContext(userContext);
    const closetIcon = `https://firebasestorage.googleapis.com/v0/b/mitlabshut-final.appspot.com/o/AppImages%2FclosetIcon.png?alt=media&token=948c5dad-d3a8-4aa9-97c9-f6fc9eeb0d32`;

  //the tabs of the navbar
  const tabs = [
    {
      id: "1",
      screen: "Home",
      icon: (
        <HomeTab
          color={selectedTab == "Home" ? COLORS.golden : COLORS.lightGray}
        />
      ),
    },
    {
      id: "2",
      screen: "Search",
      icon: (
        <SearchTab
          color={selectedTab == "Search" ? COLORS.golden : COLORS.lightGray}
        />
      ),
    },
    {
      id: "3",
      screen: "Closet",
      icon: (
        <View
          style={{
            width: 60,
            height: 60,
            borderWidth: 1,
            borderColor: "#BBA36B",
            top: -19,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              width: 54,
              height: 54,
              backgroundColor: COLORS.golden,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
                        source={{ uri: closetIcon }}
                        style={{ width: 40, height: 40, borderRadius: 10 ,paddingBottom:40}}
                      />
          </View>
        </View>
      ),
    },
    {
      id: "4",
      screen: "WishList",
      icon: (
        <WishListTab
          color={selectedTab == "WishList" ? COLORS.golden : COLORS.lightGray}
        />
      ),
    },
    {
      id: "5",
      screen: "Profile",
      icon: (
        <ProfileTab
          color={selectedTab == "Profile" ? COLORS.golden : COLORS.lightGray}
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.goldenTransparent_01 }}>
      {/* all the pages we navigate in our app */}
      {selectedTab == "Home" && <Home />}
      {selectedTab == "Search" && <Search />}
      {selectedTab == "Closet" && <Closet />}
      {selectedTab == "WishList" && <WishList />}
      {selectedTab == "Profile" && <Profile />}
      {selectedTab == "Order" && <Order />}
      {selectedTab == "SearchUsersFollow" && <SearchUsersFollow />}
      {selectedTab == "SearchRes" && <SearchRes />}
      {selectedTab == "ItemsByCtegory" && <ItemsByCtegory />}
      {selectedTab == "Filter" && <Filter />}
      {selectedTab == "SearchAllUsers" && <SearchAllUsers />}
      {selectedTab == "EditProfile" && <EditProfile />}

      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 68,
        }}>
        <TabElement />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 28,
          backgroundColor: COLORS.white,
          paddingBottom: 10,
        }}>
        {tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.screen == "Closet") {
                  setSelectedTab(item.screen);
                  setClosetId_(loggedUser.closet_id);
                  setOwner_(loggedUser);
                } else {
                  setSelectedTab(item.screen);
                }
              }}>
              <View>{item.icon}</View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
