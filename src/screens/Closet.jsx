import React, { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../navigation/userContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Edit } from "../svg";
import { BagSvg, HeartSvg, Plus } from "../svg";
import { ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import ProfileNumbers from "../components/ProfileNumbers";
import ButtonFollow from "../components/ButtonFollow";
import { StyleSheet } from "react-native";
import WarningModal from "../components/WarningModal";

export default function Closet(props) {
  const {
    loggedUser,
    setclosetDesc,
    setclosetName,
    closetName,
    closetDesc,
    GetItemForAlgo,
    shopScore,
    favScore,
  } = useContext(userContext);
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [ModalItem, setModalItem] = useState("");
  const buttonRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [massage, setMassage] = useState("");

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

  function handleOptionsMenuPress() {
    const buttonWidth = 20;
    const buttonHeight = 20;
    const modalWidth = 120;
    const modalHeight = 120;
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      const modalX = Math.min(
        screenWidth - modalWidth,
        Math.max(0, pageX - modalWidth / 2 + width / 2)
      );
      const modalY = Math.min(
        screenHeight - modalHeight,
        Math.max(0, pageY + height + 10)
      );

      setModalPosition({
        x: modalX,
        y: modalY,
      });
      setModalVisible(true);
    });
  }

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
        if (res.data === "No items yet") {
          setUsersItems([]);
          GetItemPhotos([]);
        } else {
          setUsersItems(res.data);
          GetItemPhotos(res.data);
        }
      })
      .catch((err) => {
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
        GetItemForAlgo(item_id, favScore, loggedUser.id);
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
        GetItemForAlgo(item_id, shopScore, loggedUser.id);
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

  function renderModal() {
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000099",
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              padding: 16,
            }}
          >
            {ModalItem.item_status != "sold" && (
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  textAlign: "center",
                }}
                onPress={handleEditPress}
              >
                <Text style={{ textAlign: "center" }}>עריכת פריט</Text>
              </TouchableOpacity>
            )}
            {ModalItem.item_status === "sold" ? (
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  textAlign: "center",
                }}
                onPress={() => {
                  setShowModal(true);
                  setUserChoice(handleNotSalePress);
                  setMassage("הפריט יהיה זמין למכירה \n  את בטוחה?");
              }}>
                <Text style={{ textAlign: "center" }}> החזרי למכירה</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  textAlign: "center",
                }}
                onPress={() => {
                  setShowModal(true);
                  setUserChoice(handleSalePress);
                  setMassage("הפריט לא יהיה זמין למכירה \n  את בטוחה?");
              }}>
                <Text style={{ textAlign: "center" }}>סמני כנמכר</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                textAlign: "center",
              }}
              onPress={() => {
                setShowModal(true);
                setUserChoice(handleDeletePress);
                setMassage("הפריט ימחק לצמיתות \n  את בטוחה?");
              }}
              // onPress={() => setShowModal(true)}
            >
              <Text style={{ textAlign: "center" }}>מחקי את הפריט</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function handleEditPress() {
    setModalVisible(false);
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemCategortById/Item_ID/" +
          ModalItem.id
      )
      .then((res1) => {
        axios
          .get(
            "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/ItemImages/GetItem_Image_VideoItemById/Item_ID/" +
              ModalItem.id
          )
          .then((res2) => {
            navigation.navigate("EditItem", {
              item: ModalItem,
              itemImages: res2.data.map((item) => item.src),
              itemCtegories: res1.data,
            });
          })
          .catch((err) => {
            console.log("cant take images", err);
          });
      })
      .catch((err) => {
        console.log("cant take categories", err);
      });
  }

  function handleSalePress() {
    setModalVisible(false);

    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${ModalItem.id}/item_status/sold`
      )
      .then((res) => {
        GetClosetItems();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNotSalePress() {
    setModalVisible(false);

    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${ModalItem.id}/item_status/active`
      )
      .then((res) => {
        GetClosetItems();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeletePress() {
    setModalVisible(false);
    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${ModalItem.id}/item_status/delete`
      )
      .then((res) => {
        GetClosetItems();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  
  function handleUserChoice() {
    if (showModal && typeof userChoice === "function") {
      userChoice();
    }
  }

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
                    {item.item_status === "sold" && (
                      <View
                        style={{
                          backgroundColor: COLORS.black,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          opacity: 0.5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 20,
                            textAlign: "center",
                          }}
                        >
                          נמכר
                        </Text>
                      </View>
                    )}
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
                    {/* Render the edit/mark as sold/delete icon */}
                    {myClosetFlag && (
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          right: 12,
                          top: 12,
                          width: 20,
                          height: 20,
                          backgroundColor: COLORS.goldenTransparent_05,
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        ref={buttonRef}
                        onPress={() => {
                          handleOptionsMenuPress();
                          setModalItem(item);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: COLORS.white,
                            width: 3,
                            height: 3,
                            borderRadius: 1,
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: COLORS.white,
                            width: 3,
                            height: 3,
                            borderRadius: 1,
                            marginTop: 2,
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: COLORS.white,
                            width: 3,
                            height: 3,
                            borderRadius: 1,
                            marginTop: 2,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                    {renderModal()}
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
          {UsersItems.length !== 0 ? renderClothes() : renderMessage()}
          {showModal && (
            <WarningModal
              showModal={showModal}
              setShowModal={setShowModal}
              handleSure={handleUserChoice}
              massage={massage}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
