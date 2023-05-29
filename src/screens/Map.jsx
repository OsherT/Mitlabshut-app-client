import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Linking,
  Button,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";
import { Header, ProfileCategory } from "../components";
import { AREA, COLORS, FONTS } from "../constants";
import { Arrow, ArrowThree, ArrowTwo, CanceledSvg, HeartSvg } from "../svg";
import { useContext } from "react";
import { userContext } from "../navigation/userContext";
import { FlatList } from "react-native-gesture-handler";

const Map = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [stores, setstores] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [homeView, setHomeView] = useState(props.homeView || false);
  const [showFav, setshowFav] = useState(false);
  const Store_map_icon =
    "https://firebasestorage.googleapis.com/v0/b/mitlabshut-final.appspot.com/o/AppImages%2Fstore_map_icon.png?alt=media&token=79fc64b1-f12b-40f0-9171-b89e3daca894";
  const { loggedUser } = useContext(userContext);
  const [renderStores, setrenderStores] = useState([]);

  useEffect(() => {
    // Request permission to access the user's location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Permission not granted, handle accordingly
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();

    getStoresList();
    getUsersFavList();
  }, [UsersFavList]);

  //הבאת כל החנויות
  function getStoresList() {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Stores/Get")
      .then((res) => {
        setstores(res.data);
        setrenderStores(res.data);
      })
      .catch((err) => {
        console.log("cant get stores list", err);
      });
  }

  function getUsersFavList() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Stores/Get/" +
          loggedUser.id
      )
      .then((res) => {
        if (res.data === "No such stores yet") {
          setUsersFavList([]);
        } else {
          setUsersFavList(res.data);
        }
      })
      .catch((err) => {
        console.log("cant get fav stores list", err);
      });
  }

  function addStoreToFav() {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Stores/PostFavStore?UserID=${loggedUser.id}&StoreID=${selectedStore?.store_ID}`
      )
      .then((res) => {
        getUsersFavList();
      })
      .catch((err) => {
        console.log("cant post store to fav", err);
      });
  }

  function removeFromFav() {
    console.log(selectedStore);
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Stores/DeleteFavItem/Store_ID/${selectedStore?.store_ID}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getUsersFavList();
      })
      .catch((err) => {
        console.log("cant delete store to fav", err);
      });
  }

  const handleMarkerPress = (store) => {
    setSelectedStore(store);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handlePhoneNumberPress = () => {
    if (selectedStore?.phone_number) {
      const phoneNumber = `tel:${selectedStore.phone_number}`;
      Linking.openURL(phoneNumber);
    }
  };

  const openWaze = () => {
    const [latitude, longitude] =
      selectedStore?.address_coordinates.split(", ");
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);
    const url = `https://waze.com/ul?ll=${parsedLatitude},${parsedLongitude}&navigate=yes`;
    Linking.openURL(url);
  };

  const openFacebook = () => {
    const url = selectedStore?.facebook_link;
    Linking.openURL(url);
  };

  const openInsta = () => {
    const url = selectedStore?.instegram_link;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          ...AREA.AndroidSafeArea,
          backgroundColor: "none",
        }}
      >
        {!homeView && <Header title="מפת חנויות" goBack={false} />}
        <View style={styles.mapContainer}>
          {currentLocation && stores && UsersFavList ? (
            <>
              <View style={styles.buttonWrapper}>
                {!homeView && (
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setshowFav(true)}
                  >
                    <Text style={styles.buttonText}>הציגי חנויות שמורות</Text>
                  </TouchableOpacity>
                )}
              </View>

              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                provider="google"
                customMapStyle={[]}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {stores.map((store, index) => {
                  const [latitude, longitude] =
                    store.address_coordinates.split(", ");
                  const parsedLatitude = parseFloat(latitude);
                  const parsedLongitude = parseFloat(longitude);

                  if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
                    // Handle the case when the coordinates are invalid
                    console.log("Invalid coordinates for store:", store); //
                  } else {
                    return (
                      <View>
                        <Marker
                          key={index}
                          coordinate={{
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                          }}
                          onPress={() => handleMarkerPress(store)}
                        ></Marker>
                      </View>
                    );
                  }
                })}
              </MapView>
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <LoadingComponent></LoadingComponent>
            </View>
          )}
        </View>
        {/* מודל הצגת חנות  */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer} pointerEvents="box-none">
            <View style={styles.miniModalContent}>
              <View style={styles.modalHeader}>
                {UsersFavList.some(
                  (item) => item.store_ID === selectedStore?.store_ID
                ) ? (
                  <TouchableOpacity onPress={removeFromFav}>
                    <HeartSvg filled={true} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={addStoreToFav}>
                    <HeartSvg filled={false} />
                  </TouchableOpacity>
                )}

                <View style={styles.titleContainer}>
                  <Text style={styles.modalTitle}>{selectedStore?.name}</Text>
                  <View>
                    <ProfileCategory
                      icon={<CanceledSvg />}
                      arrow={false}
                      onPress={closeModal}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.headerLine} />
              <Text style={styles.desc}>{selectedStore?.description}</Text>
              <Text style={styles.desc}>{selectedStore?.address}</Text>
              <TouchableOpacity onPress={handlePhoneNumberPress}>
                <Text style={styles.phone}>{selectedStore?.phone_number}</Text>
              </TouchableOpacity>
              <View style={styles.links}>
                {selectedStore?.facebook_link !== "" && (
                  <TouchableOpacity onPress={openFacebook}>
                    <Image
                      source={require("./Facebook_icon.png")}
                      style={styles.Icon}
                    />
                  </TouchableOpacity>
                )}
                {selectedStore?.instegram_link !== "" && (
                  <TouchableOpacity onPress={openInsta}>
                    <Image
                      source={require("./instagram_icon.png")}
                      style={styles.Icon}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={openWaze}>
                  <Image
                    source={require("./icon-waze.png")}
                    style={styles.Icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* מודל הצגת חנויות שמורות */}
        <Modal visible={showFav} animationType="slide" transparent={true}>
          {UsersFavList && UsersFavList.length > 0 ? (
            <View
              style={[
                styles.modalContainer,
                {
                  justifyContent: "flex-end",
                },
              ]}
            >
              <View style={styles.miniModalContent}>
                <ProfileCategory
                  icon={<CanceledSvg />}
                  arrow={false}
                  onPress={() => setshowFav(false)}
                />
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.modalContent}
                  style={{ maxHeight: 500 }}
                >
                  {UsersFavList.map((item) => (
                    <React.Fragment key={item.store_ID}>
                      <View style={styles.modalHeader}>
                        {UsersFavList.some(
                          (favItem) => favItem.store_ID === item.store_ID
                        ) ? (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedStore(item);
                              removeFromFav();
                            }}
                          >
                            <HeartSvg filled={true} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedStore(item);
                              addStoreToFav();
                            }}
                          >
                            <HeartSvg filled={false} />
                          </TouchableOpacity>
                        )}
                        <View style={styles.titleContainer}>
                          <Text style={styles.modalTitle}>{item.name}</Text>
                        </View>
                      </View>
                      <Text style={styles.desc}>{item?.description}</Text>
                      <Text style={styles.desc}>{item?.address}</Text>
                      <TouchableOpacity onPress={handlePhoneNumberPress}>
                        <Text style={styles.phone}>{item?.phone_number}</Text>
                      </TouchableOpacity>
                      <View style={styles.links}>
                        {item?.facebook_link !== "" && (
                          <TouchableOpacity onPress={openFacebook}>
                            <Image
                              source={require("./Facebook_icon.png")}
                              style={styles.Icon}
                            />
                          </TouchableOpacity>
                        )}
                        {item?.instagram_link !== "" && (
                          <TouchableOpacity onPress={openInsta}>
                            <Image
                              source={require("./instagram_icon.png")}
                              style={styles.Icon}
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={openWaze}>
                          <Image
                            source={require("./icon-waze.png")}
                            style={styles.Icon}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.headerLine} />
                    </React.Fragment>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.modalContainer,
                {
                  justifyContent: "flex-end",
                },
              ]}
            >
              <View style={styles.miniModalContent}>
                <ProfileCategory
                  icon={<CanceledSvg />}
                  arrow={false}
                  onPress={() => setshowFav(false)}
                />
                <View style={styles.modalHeader}>
                  <Text
                    style={{
                      textAlign: "center",
                      ...FONTS.Mulish_700Bold,
                      fontSize: 19,
                      textTransform: "capitalize",
                      color: COLORS.black,
                      marginBottom: 4,
                      lineHeight: 16 * 1.2,
                    }}
                  >
                    אין חנויות שמורות...לבנתיים
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  Icon: {
    width: 60,
    height: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 8,
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
  headerLine: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
    marginBottom: 10,
    padding: 10,
  },
  map: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgba(128, 128, 128, 0.45)",
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    alignItems: "center",
    shadowColor: "#000000",
    width: "100%",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 4,
  },
  mapContainer: {
    flex: 1,
    //backgroundColor: "transparent",
  },
  miniModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "right",
  },
  phone: {
    fontSize: 20,
    marginBottom: 35,
    borderBottomColor: COLORS.lightGray,
    textAlign: "right",
  },
  desc: {
    fontSize: 15,
    fontStyle: "bold",
    marginBottom: 7,
    textAlign: "right",
  },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 30,
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
    fontSize: 15,
    color: COLORS.black,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: COLORS.golden,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonWrapper: {
    alignItems: 'left',
    width: '80%', // Adjust the percentage as needed
  },
});

export default Map;
