import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

export default function GoBackModal(props) {
  const navigation = useNavigation();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSure = () => {
    setShowModal(false);
    navigation.navigate("SignIn");
  };

  return (
    <Modal
      isVisible={props.showModal}
      onBackdropPress={() => props.setShowModal(false)}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      style={{ margin: 0 }}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View
        style={{
          width: SIZES.width - 60,
          backgroundColor: COLORS.white,
          marginHorizontal: 30,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 34,
        }}>
        <Text
          style={{
            textAlign: "center",
            ...FONTS.Mulish_600SemiBold,
            fontSize: 20,
            marginBottom: 26,
          }}>
          Are you sure you want to {"\n"} Sign Out ?
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TouchableOpacity
            style={{
              width: 130,
              height: 40,
              backgroundColor: COLORS.white,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 7.5,
              borderColor: COLORS.goldenTransparent_05,
              borderWidth: 1,
            }}
            onPress={() => {
              props.setShowModal(false);
            }}>
            <Text
              style={{
                color: COLORS.red,
                ...FONTS.Mulish_600SemiBold,
                fontSize: 14,
                textTransform: "uppercase",
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 130,
              height: 40,
              backgroundColor: COLORS.golden,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 7.5,
            }}
            onPress={handleSure}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.Mulish_600SemiBold,
                fontSize: 14,
                textTransform: "uppercase",
              }}>
              Sure
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
