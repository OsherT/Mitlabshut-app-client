import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";
import { Header } from "../components";
import { AREA } from "../constants";

const Map = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [stores, setstores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [homeView, setHomeView] = useState(props.homeView || false);

  const Store_map_icon =
    "https://firebasestorage.googleapis.com/v0/b/mitlabshut-final.appspot.com/o/AppImages%2Fstore_map_icon.png?alt=media&token=79fc64b1-f12b-40f0-9171-b89e3daca894";
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
  }, []);

  //הבאת כל החנויות
  function getStoresList() {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Stores/Get")
      .then((res) => {
        console.log(res.data);
        setstores(res.data);
      })
      .catch((err) => {
        console.log("cant get stores list", err);
      });
  }

  const handleMarkerPress = (store) => {
    setSelectedStore(store);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    // <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          ...AREA.AndroidSafeArea,
          backgroundColor: "none",
        }}>
        {!homeView && <Header title="מפת חנויות" goBack={false} />}
        {currentLocation && stores ? (
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
            showsMyLocationButton={true}>
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
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(latitude),
                      longitude: parseFloat(longitude),
                    }}
                    title={store.name}
                    onPress={() => handleMarkerPress(store)}>
                    {/* <Image
                    source={{ uri: Store_map_icon }}
                    style={{
                        width: 32,
                        height: 32,
                      borderRadius: 10,
                      paddingBottom: 40,
                    }}
                  /> */}
                  </Marker>
                );
              }
            })}
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <LoadingComponent></LoadingComponent>
          </View>
        )}
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedStore?.name}</Text>
            <Text style={styles.modalAddress}>{selectedStore?.address}</Text>
            {/* Add more details or components for the store */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalAddress: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Map;
