import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../navigation/userContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  FlatList,
} from "react-native";
import axios from "axios";
import { Edit } from "../svg";
import { BagSvg, HeartSvg, Plus } from "../svg";
import { ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import ProfileNumbers from "../components/ProfileNumbers";
import ButtonFollow from "../components/ButtonFollow";

export default function Closet(props) {
  const { loggedUser, setclosetDesc, setclosetName, closetName, closetDesc } =
    useContext(userContext);
  const { route } = props;
  const closetId = route?.params?.closetId || loggedUser.closet_id;
  const owner = route?.params?.owner || loggedUser;
  const [UsersItems, setUsersItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [UsersShopList, setUsersShopList] = useState([]);
  const [ClosetFollowers, setClosetFollowers] = useState([]);
  const [myClosetFlag, setMyClosetFlag] = useState(false);
  const [UsersFollowingList, setUsersFollowingList] = useState([]);
  const ApiUrl_user = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User`;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setMyClosetFlag(loggedUser.closet_id === closetId);
      GetClosetDescription();
      GetClosetFollowers_num();
      GetClosetItems();
      getShopItems();
      getFavItems();
      getFollowingList();
    }
  }, [isFocused, ClosetFollowers]);

  function GetClosetDescription() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/Get/" +
          closetId
      )
      .then((res) => {
        setclosetName(res.data[0].user_name);
        setclosetDesc(res.data[0].description);
      })
      .catch((err) => {
        //alert("cant take description");
        console.log(err);
      });
  }
  function GetClosetFollowers_num() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetCountFollowingUsers/Closet_ID/" +
          closetId
      )
      .then((res) => {
        setClosetFollowers(res.data);
      })
      .catch((err) => {
        setClosetFollowers("0");
        //alert("cant take followers");
        console.log(err);
      });
  }
  function GetClosetItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByClosetId/ClosetId/" +
          closetId
      )
      .then((res) => {
        setUsersItems(res.data);
        GetItemPhotos(res.data); // move the call here
      })
      .catch((err) => {
        //alert("cant take items");
        console.log(err);
      });
  }
  function GetItemPhotos(items) {
    // pass the items array as a parameter
    const promises = items.map((item) => {
      // use the passed items array
      return axios.get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages/GetItem_Image_VideoItemById/Item_ID/" +
          item.id
      );
    });

    Promise.all(promises)
      .then((responses) => {
        const photos = responses.flatMap((response) => response.data);
        setUsersItemPhotos(photos);
      })
      .catch((error) => {
        //alert("cant take photos");
        console.log(error);
      });
  }

  function renderUserContent() {
    return (
      <View
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
          justifyContent: "center", // add this style
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          {myClosetFlag && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: -20,
                }}
              >
                <Edit />
              </View>
            </TouchableOpacity>
          )}
          {myClosetFlag && UsersItems.length > 0 && (
            <View
              style={{
                position: "absolute",
                right: 34,
                bottom: 170,
              }}
            >
              {addItemButton()}
            </View>
          )}
          <ImageBackground
            source={{
              uri: owner.user_image ? owner.user_image : loggedUser.user_image,
            }}
            style={{
              width: 80,
              height: 80,
              alignSelf: "center",
              marginBottom: 15,
            }}
            imageStyle={{ borderRadius: 40 }}
          ></ImageBackground>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_700Bold,
              fontSize: 16,
              textTransform: "capitalize",
              color: COLORS.black,
              marginBottom: 10,
              lineHeight: 16 * 1.2,
            }}
          >
            הארון של {closetName}
          </Text>
          <ProfileNumbers
            followers={ClosetFollowers}
            posts={UsersItems.length}
          />
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_400Regular,
              fontSize: 14,
              color: COLORS.gray,
              lineHeight: 14 * 1.7,
              marginTop: 10,
            }}
          >
            {closetDesc}
          </Text>
          {myClosetFlag == false ? (
            <View
              style={{
                //flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {!UsersFollowingList.includes(owner.closet_id) && (
                <ButtonFollow
                  title="עקבי"
                  backgroundColor={COLORS.golden}
                  textColor={COLORS.white}
                  containerStyle={{ marginTop: 17, marginBottom: -14 }}
                  onPress={() => {
                    followCloset();
                  }}
                />
              )}
              {UsersFollowingList.includes(owner.closet_id) && (
                <ButtonFollow
                  title="הסירי עוקב"
                  backgroundColor={COLORS.goldenTransparent_03}
                  textColor={COLORS.black}
                  containerStyle={{ marginTop: 17, marginBottom: -14 }}
                  onPress={() => {
                    unfollowCloset();
                  }}
                />
              )}
            </View>
          ) : (
            <Text> </Text>
          )}
        </ContainerComponent>
      </View>
    );
  }
  ///handle fav list
  function getFavItems() {
    if (myClosetFlag == false) {
      axios
        .get(
          "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetFavByUserID/" +
            loggedUser.id
        )
        .then((res) => {
          if (res.data == "No items yet") {
            setUsersFavList("");
          } else {
            const tempUsersFavList = res.data.map(({ item_id }) => item_id);
            setUsersFavList(tempUsersFavList);
          }
        })
        .catch((err) => {
          console.log("cant get fav", err);
        });
    }
  }
  function AddtoFav(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostFavItem/Item_ID/${item_id}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        setUsersFavList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        // alert("cant add to fav");
        console.log("cant add to fav", err);
      });
  }
  function RemoveFromFav(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteFavItem/Item_ID/${itemId}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        setUsersFavList((prevList) => prevList.filter((id) => id !== itemId));
      })
      .catch((err) => {
        // alert("");
        console.log("cant remove from getFavItems", err);
      });
  }
  //handle shop list
  function getShopItems() {
    if (myClosetFlag == false) {
      axios
        .get(
          "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetShopByUserID/UserID/" +
            loggedUser.id
        )
        .then((res) => {
          if (res.data == "No items yet") {
            setUsersShopList("");
          } else {
            const tempUsersShopList = res.data.map(({ item_id }) => item_id);
            setUsersShopList(tempUsersShopList);
          }
        })
        .catch((err) => {
          console.log("cant get shop list", err);
        });
    } else console.log("");
  }
  function AddToShopList(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostShopItem/ItemID/${item_id}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        getShopItems();
        setUsersShopList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        alert("cant add to shop list");
        console.log(err);
      });
  }
  function RemoveFromShopList(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteShopItem/ItemID/${itemId}/UserID/${loggedUser.id}`
      )
      .then((res) => {
        setUsersShopList((prevList) => prevList.filter((id) => id !== itemId));
      })
      .catch((err) => {
        alert("cant add to fav");
        console.log(err);
        // console.log(newFav);
      });
  }

  //handle Follow button
  function getFollowingList() {
    axios
      .get(ApiUrl_user + `/GetClosetByUserID/User_ID/${loggedUser.id}`)
      .then((res) => {
        if (res.data != "No closets yet") {
          const tempUsersFollowList = res.data.map(
            ({ closet_id }) => closet_id
          );
          setUsersFollowingList(tempUsersFollowList);
        }
      })
      .catch((err) => {
        console.log("cant get following list", err);
      });
  }
  const followCloset = () => {
    axios
      .post(
        ApiUrl_user +
          `/PostFollowingCloset/User_ID/${loggedUser.id}/Closet_ID/${owner.closet_id}`
      )
      .then((res) => {
        var closet_id = owner.closet_id;
        setUsersFollowingList((prevList) => [...prevList, { closet_id }]);
        getFollowingList();
        GetClosetFollowers_num();
      })
      .catch((err) => {
        console.log("cant follow", err);
      });
  };
  const unfollowCloset = () => {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/Delete/Closet_ID/${owner.closet_id}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        var closet_id = owner.closet_id;
        setUsersFollowingList((prevList) =>
          prevList.filter((id) => id !== closet_id)
        );
        getFollowingList();
        GetClosetFollowers_num();
      })
      .catch((err) => {
        console.log("cant unfollow");
      });
  };
  ///render items
  function renderClothes() {
    return (
      <FlatList
        data={UsersItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "47.5%",
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
            onPress={() => {
              navigation.navigate("ProductDetails", {
                item: item,
              });
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
          >
            {UsersItemPhotos.filter((photo) => photo.item_ID === item.id)
              .slice(0, 1)
              .map((photo) => {
                return (
                  <ImageBackground
                    source={{ uri: photo.src }}
                    style={{
                      width: "100%",
                      height: 128,
                    }}
                    imageStyle={{ borderRadius: 10 }}
                     key={photo.id}
                  >
                    {!myClosetFlag && UsersFavList.includes(item.id) && (
                      // render the filled heart SVG if the item ID is in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => RemoveFromFav(item.id)}
                      >
                        <HeartSvg filled={true} />
                      </TouchableOpacity>
                    )}
                    {!myClosetFlag && !UsersFavList.includes(item.id) && (
                      // render the unfilled heart SVG if the item ID is not in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => AddtoFav(item.id)}
                      >
                        <HeartSvg filled={false} />
                      </TouchableOpacity>
                    )}
                  </ImageBackground>
                );
              })}
            <View
              style={{
                paddingHorizontal: 12,
                paddingBottom: 15,
                paddingTop: 12,
              }}
            >
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "capitalize",
                  lineHeight: 14 * 1.2,
                  color: COLORS.black,
                  marginBottom: 6,
                  textAlign: "right",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 14,
                  textAlign: "right",
                }}
              >
                מידה: {item.size}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#E9E9E9",
                  width: "75%",
                  marginVertical: 7,
                }}
              />
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  color: COLORS.black,
                  textAlign: "left",
                }}
              >
                ₪ {item.price}
              </Text>
            </View>
            {!myClosetFlag && UsersShopList.includes(item.id) && (
              // render the filled heart SVG if the item ID is in the UsersFavList
              <TouchableOpacity
                style={{ position: "absolute", right: 12, bottom: 12 }}
                onPress={() => RemoveFromShopList(item.id)}
              >
                <BagSvg color="#626262" inCart={true} />
              </TouchableOpacity>
            )}
            {!myClosetFlag && !UsersShopList.includes(item.id) && (
              // render the unfilled heart SVG if the item ID is not in the UsersFavList
              <TouchableOpacity
                style={{ position: "absolute", right: 12, bottom: 12 }}
                onPress={() => AddToShopList(item.id)}
              >
                <BagSvg color="#D7BA7B" inCart={false} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
    );
  }
  function renderMessage() {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.Mulish_700Bold,
            fontSize: 16,
            textTransform: "capitalize",
            color: COLORS.black,
            marginBottom: 4,
            lineHeight: 16 * 1.2,
          }}
        >
          הארון ריק
        </Text>
        <View
          style={{
            //position: "absolute",
            left: 180,
            top: 10,
          }}
        >
          {addItemButton()}
        </View>
      </View>
    );
  }
  function addItemButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UploadItem");
        }}
      >
        <View style={{ height: 48, width: 24 }}>
          <Plus />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ ...AREA.AndroidSafeArea, backgroundColor: "none" }}
      >
        <Header onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }}>
          {renderUserContent()}
          {UsersItems.length > 0 && renderClothes()}
          {UsersItems.length == 0 && renderMessage()}
        </View>
      </SafeAreaView>
    </View>
  );
}
