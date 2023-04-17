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
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Edit } from "../svg";
import { BagSvg, HeartSvg, Plus } from "../svg";
import { ContainerComponent, Header } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import ProfileNumbers from "../components/ProfileNumbers";
import ButtonFollow from "../components/ButtonFollow";
import WarningModal from "../components/WarningModal";
import LoadingComponent from "../components/LoadingComponent";

export default function Closet(props) {
  const {
    loggedUser,
    setclosetDesc,
    setclosetName,
    closetDesc,
    GetItemForAlgo,
    shopScore,
    favScore,
    closetId_,
    owner_,
    setSelectedTab,
    sendPushNotification,
  } = useContext(userContext);
  const { route } = props;
  const closetId = closetId_ || route?.params?.closetId || loggedUser.closet_id;
  const owner = owner_ || route?.params?.owner || loggedUser;
  const ApiUrl_user = `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User`;
  const navigation = useNavigation();

  //user
  const [UsersItems, setUsersItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [UsersShopList, setUsersShopList] = useState([]);
  const [ClosetFollowers, setClosetFollowers] = useState([]);
  const [UsersFollowingList, setUsersFollowingList] = useState([]);

  //modal
  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");
  const [handleSure, setHandleSure] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [ModalItem, setModalItem] = useState("");
  const itemRefs = useRef({}); // Ref for FlatList items
  const buttonRef = useRef(null); // Ref for TouchableOpacity button

  //flag
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [myClosetFlag, setMyClosetFlag] = useState(false);

  useEffect(() => {
    if (isFocused) {
      console.log("loggedUser closet", loggedUser);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setMyClosetFlag(loggedUser.closet_id === closetId);
      GetClosetDescription();
      GetClosetItems();
      getShopItems();
      getFavItems();
      getFollowingList();
    }
  }, [isFocused, ClosetFollowers, closetId_, owner_, loggedUser]);

  //פונקציה המחשבת את המיקום שהמודל אמור להיפתח בלחיצה על ה3 נקודות
  function handleOptionsMenuPress(buttonX, buttonY, buttonWidth, buttonHeight) {
    const modalHeight = 120;

    const modalX = buttonX + buttonWidth / 2 - buttonWidth / 3; // position modal to the right of the button
    const modalY = buttonY + buttonHeight / 2 - modalHeight / 1.3; // center modal vertically

    setModalPosition({
      x: modalX,
      y: modalY,
    });
    setModalVisible(true);
  }

  // קבלת פרטי הארון המוצג
  function GetClosetDescription() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/Get/" +
          closetId
      )
      .then((res) => {
        setclosetName(res.data[0].user_name);
        setclosetDesc(res.data[0].description);
        GetClosetFollowers_num();
      })
      .catch((err) => {
        console.log("err in GetClosetDescription ", err);
      });
  }

  //קבלת מספר העוקבים לארון המוצג
  function GetClosetFollowers_num() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetCountFollowingUsers/Closet_ID/" +
          closetId
      )
      .then((res) => {
        setClosetFollowers(res.data);
        setIsLoadingUserData(false);
      })
      .catch((err) => {
        console.log("err in GetClosetFollowers_num", err);
      });
  }

  //קבלת הפריטים המוצגים בארון
  function GetClosetItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByClosetId/ClosetId/" +
          closetId
      )
      .then((res) => {
        if (res.data === 0) {
          setUsersItems([]);
          GetItemPhotos([]);
        } else {
          setUsersItems(res.data);
          GetItemPhotos(res.data);
        }
      })
      .catch((err) => {
        console.log("err in GetClosetItems ", err);
      });
  }

  //קבלת תמונות הפריטים
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in GetItemPhotos", error);
        setMessage("קיימת שגיאה בהעלאת נתונים,\n תועברי לדף הבית");
        setShowAlertModal(true);
      });
  }

  //הצגת פרטי הארון
  function renderUserContent() {
    return (
      <View
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
          justifyContent: "center",
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          {/* {myClosetFlag && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditProfile");
              }}>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: -20,
                }}>
                <Edit />
              </View>
            </TouchableOpacity>
          )} */}

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
            imageStyle={{ borderRadius: 40 }}></ImageBackground>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_700Bold,
              fontSize: 16,
              textTransform: "capitalize",
              color: COLORS.black,
              marginBottom: 10,
              lineHeight: 16 * 1.2,
            }}>
            הארון של {owner.full_name ? owner.full_name : loggedUser.full_name}
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
            }}>
            {closetDesc}
          </Text>
          {myClosetFlag == false ? (
            <View
              style={{
                alignItems: "center",
              }}>
              {!UsersFollowingList.includes(owner.closet_id) && ( //אם הארון המוצג שייך למשתמשת אחרת מרונדר כפתור עקבי או הסירי עוקב בהתאם
                <ButtonFollow
                  title="עקבי"
                  backgroundColor={COLORS.golden}
                  textColor={COLORS.white}
                  containerStyle={{ marginTop: 17, marginBottom: -14 }}
                  onPress={async () => {
                    await Promise.all([
                      followCloset(),
                      sendPushNotification(
                        owner.token,
                        "follow",
                        loggedUser.full_name
                      ),
                    ]);
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
            <View>
              {myClosetFlag &&
                UsersItems.length > 0 && ( //אם הארון המוצג שייך למשתמשת המחוברת יוצג כפתור הוספת פריט
                  <View
                    style={{
                      width: 100,
                      alignSelf: "center",
                      marginTop: 15,
                    }}>
                    {addItemButton()}
                  </View>
                )}
            </View>
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
    } else console.log("my closet ,getShopItems function");
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
        console.log("cant add to shop list", err);
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
        console.log("cant add to fav", err);
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

  //רינדור המודל בלחיצה על ה3 נקודות לטובת עריכה\ מחיקה\ סימון כנמכר של פריט
  function renderModal() {
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        //position={modalPosition}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000099",
          }}
          onPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              padding: 16,
              position: "absolute", // set position to absolute
              left: modalPosition.x, // set left position based on modalPosition.x
              top: modalPosition.y, // set top position based on modalPosition.y
            }}>
            {ModalItem.item_status != "sold" && (
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  textAlign: "center",
                }}
                onPress={handleEditPress}>
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
                  setModalVisible(false);
                  setShowModal(true);
                  setMassage("הפריט יהיה זמין למכירה \n  את בטוחה?");
                  setHandleSure(() => handleNotSalePress);
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
                  setModalVisible(false);
                  setShowModal(true);
                  setMassage("הפריט לא יהיה זמין למכירה \n  את בטוחה?");
                  setHandleSure(() => handleSalePress);
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
                setModalVisible(false);
                setShowModal(true);
                setMassage("הפריט ימחק לצמיתות \n  את בטוחה?");
                setHandleSure(() => handleDeletePress);
              }}>
              <Text style={{ textAlign: "center" }}>מחקי את הפריט</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  //כאשר המשתמש לוחץ על עריכה מעביר לדף עריכת פריט
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

  //כאשר המשתמש לוחץ על מכירה- משנה את סטטוס הפריט לנמכר
  function handleSalePress() {
    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${ModalItem.id}/item_status/sold`
      )
      .then((res) => {
        GetClosetItems();
      })
      .catch((err) => {
        console.log("err in handleSalePress");
      });
  }

  //כאשר הפריט נמצא בסטטוס נמכר הוא יכול להסיר את מצב נמכר ולהחזיר אותו למצב פעיל
  function handleNotSalePress() {
    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${ModalItem.id}/item_status/active`
      )
      .then((res) => {
        GetClosetItems();
      })
      .catch((err) => {
        console.log("err in handleNotSalePress");
      });
  }

  //כאשר המשתמש לחץ על מחיקת פריט, סטטוס הפריט הופך לנמחק
  function handleDeletePress() {
    axios
      .put(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/updateItemSaleStatus/item_ID/${ModalItem.id}/item_status/delete`
      )
      .then((res) => {
        GetClosetItems();
      })
      .catch((err) => {
        console.log("err in handleDeletePress", err);
      });
  }

  //רינדור הפריטים בהתאם לססטטוס שלהם
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
            ref={(ref) => {
              // Assign a ref to each item in the FlatList
              itemRefs.current[index] = ref;
            }}
            style={{
              width: "47.5%",
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2,
              elevation: 5,
            }}
            onPress={() => {
              {
                console.log("item", item);
              }
              navigation.navigate("ProductDetails", {
                item: item,
              });
            }}>
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
                    key={photo.id}>
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
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.Mulish_600SemiBold,
                            fontSize: 20,
                            textAlign: "center",
                          }}>
                          נמכר
                        </Text>
                      </View>
                    )}
                    {!myClosetFlag &&
                      UsersFavList.includes(item.id) && //הפריט נמצא במועדפים שלי ולכן מרונדר לב מלא, לחיצה עליו תסיר מהמועדפים
                      item.item_status != "sold" && (
                        <TouchableOpacity
                          style={{ left: 12, top: 12 }}
                          onPress={() => RemoveFromFav(item.id)}>
                          <HeartSvg filled={true} />
                        </TouchableOpacity>
                      )}
                    {!myClosetFlag &&
                      !UsersFavList.includes(item.id) && //הפריט לא נמצא ברשימת המועדפים שלי ולכן ירונדר לב ריק, לחיצה עליו תוסיף לרשימה
                      item.item_status != "sold" && (
                        <TouchableOpacity
                          style={{ left: 12, top: 12 }}
                          onPress={async () => {
                            await Promise.all([
                              AddtoFav(item.id),
                              sendPushNotification(
                                owner.token,
                                "like",
                                loggedUser.full_name
                              ),
                            ]);
                          }}>
                          <HeartSvg filled={false} />
                        </TouchableOpacity>
                      )}
                    {myClosetFlag && ( //רינדור 3 הנקודות לטובת עריכה מחיקה וסימון כנמכר רק אם הארון המוצג הוא הארון שלי
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
                          const currentButtonRef = itemRefs.current[index];
                          console.log(currentButtonRef);

                          currentButtonRef.measureInWindow(
                            (x, y, width, height) => {
                              handleOptionsMenuPress(x, y, width, height),
                                setModalItem(item);
                            }
                          );
                        }}>
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
              }}>
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "capitalize",
                  lineHeight: 14 * 1.2,
                  color: COLORS.black,
                  marginBottom: 6,
                  textAlign: "right",
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 14,
                  textAlign: "right",
                }}>
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
                }}>
                ₪ {item.price}
              </Text>
            </View>
            {!myClosetFlag &&
              UsersShopList.includes(item.id) && ( //הפריט נמצא בסל הקניות שלי ולכן לחיצה כאן תסיר אותו מרשימה זו
                <TouchableOpacity
                  style={{ position: "absolute", right: 12, bottom: 12 }}
                  onPress={() => RemoveFromShopList(item.id)}>
                  <BagSvg color="#626262" inCart={true} />
                </TouchableOpacity>
              )}
            {!myClosetFlag &&
              !UsersShopList.includes(item.id) && ( //הפריט לא נמצא בסל הקניות ולכן לחיצה כאן תוסיף לרשימה
                <TouchableOpacity
                  style={{ position: "absolute", right: 12, bottom: 12 }}
                  onPress={() => AddToShopList(item.id)}>
                  <BagSvg color="#D7BA7B" inCart={false} />
                </TouchableOpacity>
              )}
          </TouchableOpacity>
        )}
      />
    );
  }

  //אם הארון ריק תופיע הודעה המעידה על כך
  function renderMessage() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.Mulish_700Bold,
            fontSize: 16,
            textTransform: "capitalize",
            color: COLORS.black,
            marginBottom: 4,
            lineHeight: 16 * 1.2,
          }}>
          לא קיימים פריטים בארון... עדיין 😉{" "}
        </Text>
        {myClosetFlag && <View>{addItemButton()}</View>}
      </View>
    );
  }

  //כפתור הוספת פריט שמופיע מספר פעמים במיקומים שונים לכן זו פונקציה נפרדת
  function addItemButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UploadItem");
        }}
        style={styles.button}>
        <Text style={styles.text}>הוסיפי פריט</Text>
        <Text> </Text>
        <View style={styles.iconContainer}>
          <Plus />
        </View>
      </TouchableOpacity>
    );
  }

  //רינדור פלייסהולדר עד שהפרטי היוזר עולים
  function LoadingUsersdata() {
    return (
      <View
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
          justifyContent: "center",
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          <ImageBackground
            style={{
              width: 80,
              height: 80,
              alignSelf: "center",
              marginBottom: 15,
              backgroundColor: COLORS.grey,
            }}
            imageStyle={{ borderRadius: 40 }}></ImageBackground>
        </ContainerComponent>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ ...AREA.AndroidSafeArea, backgroundColor: "none" }}>
        <Header goBack={false} />
        {showAlertModal && (
          <WarningModal
            massage={message}
            showModal={showAlertModal}
            setShowModal={setShowAlertModal}
            handleSure={() => setSelectedTab("Home")}
            hideCancel={true}
          />
        )}
        <View style={{ flex: 1 }}>
          {isLoadingUserData ? LoadingUsersdata() : renderUserContent()}
          {isLoading ? (
            <LoadingComponent></LoadingComponent>
          ) : UsersItems.length !== 0 ? (
            renderClothes()
          ) : (
            renderMessage()
          )}

          {showModal && (
            <WarningModal
              showModal={showModal}
              setShowModal={setShowModal}
              handleSure={handleSure}
              massage={massage}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.golden,
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 5,
  },
  iconContainer: {
    height: 24,
    width: 24,
  },
  text: {
    fontSize: 13,
    color: COLORS.white,
  },
});
