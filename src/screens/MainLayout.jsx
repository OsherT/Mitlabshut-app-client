import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Home from "./Home";
import Search from "./Search";
import WishList from "./WishList";
import Closet from "./Closet";
import {
  HomeTab,
  SearchTab,
  WishListTab,
  ProfileTab,
  TabElement,
  Bag,
  BagSvg,
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
import LocationPinIcon from "../svg/LocationPinIcon";
import Map from "./Map";
import Profile from "./Profile";

//shows the navbar of the application
export default function MainLayout() {
  const { loggedUser, selectedTab, setSelectedTab, setOwner_, setClosetId_ } =
    useContext(userContext);
  const closetIconGolden = `https://firebasestorage.googleapis.com/v0/b/mitlabshut-final.appspot.com/o/AppImages%2FclosetIcon_Golden.png?alt=media&token=41bc061c-9a63-48c1-a611-0a77a8b6082f`;
  const closetIconGrey =
    "https://firebasestorage.googleapis.com/v0/b/mitlabshut-final.appspot.com/o/AppImages%2FclosetIcon_lightGrey.png?alt=media&token=f4c5e8bf-b25b-4822-b886-4e9b15a2fe8a";
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
      screen: "Map",
      icon: (
        <View
          style={{
            width: 60,
            height: 60,
            borderWidth: 1,
            borderColor: "#BBA36B",
            top: -19,
            alignSelf: "center",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 54,
              height: 54,
              backgroundColor: COLORS.golden,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocationPinIcon></LocationPinIcon>
          </View>
        </View>
      ),
    },
    {
      id: "4",
      screen: "Closet",
      icon: (
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: selectedTab === "Closet" ? closetIconGolden : closetIconGrey,
            }}
            style={{
              width: 35,
              height: 35,
            }}
          />
        </View>
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
      {selectedTab == "Map" && <Map />}
      {selectedTab == "WishList" && <WishList />}
      {selectedTab == "Closet" && <Closet />}
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
        }}
      >
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
        }}
      >
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
              }}
            >
              <View>{item.icon}</View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = {
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
};
