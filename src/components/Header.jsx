// import { View, Text, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { FONTS, COLORS } from "../constants";
// import { ArrowTwo, HeartTwoSvg } from "../svg";
// import { useNavigation } from "@react-navigation/native";
// import BagHeader from "../svg/BagHeader";
// import WarningModal from "./WarningModal";

// export default function Header({ title, titleStyle, flag, onEdit, showModal }) {
//   const navigation = useNavigation();
//   const [showModal2, setShowModal] = useState(showModal);

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         height: 42,
//       }}>
//       <TouchableOpacity
//         style={{
//           position: "absolute",
//           left: 0,
//           paddingHorizontal: 20,
//         }}
//         // onPress={() => {
//         //   if (onEdit) {
//         //     Alert.alert("השינויים לא ישמרו", "האם את בטוחה שברצונך לחזור?", [
//         //       {
//         //         text: "אישור",
//         //         onPress: () => navigation.goBack(),
//         //       },
//         //       {
//         //         text: "ביטול",
//         //         style: "cancel",
//         //       },
//         //     ]);
//         //   } else {
//         //     navigation.goBack();
//         //   }
//         // }}

//         onPress={() => {
//           console.log("onEdit", onEdit);
//           console.log("showModal", showModal);

//           if (onEdit) {
//             console.log("on warning");
//             <WarningModal
//               showModal={showModal2}
//               setShowModal={setShowModal}
//               handleSure={() => navigation.goBack()}
//               massage={" השינויים לא ישמרו \n האם את בטוחה ?"}></WarningModal>;
//           } else {
//             navigation.goBack();
//           }
//         }}>
//         <ArrowTwo />
//       </TouchableOpacity>

//       {!flag && (
//         <TouchableOpacity
//           style={{
//             position: "absolute",
//             right: 0,
//             top: 14,
//           }}
//           onPress={() => {
//             navigation.navigate("WishList");
//           }}>
//           <HeartTwoSvg strokeColor="black" />
//         </TouchableOpacity>
//       )}

//       {!flag && (
//         <TouchableOpacity
//           style={{
//             position: "absolute",
//             right: 60,
//             top: 12,
//             paddingHorizontal: 20,
//           }}
//           onPress={() => {
//             navigation.navigate("Order");
//           }}>
//           <BagHeader color="black"></BagHeader>
//         </TouchableOpacity>
//       )}
//       <Text
//         style={{
//           fontSize: 18,
//           ...FONTS.Mulish_600SemiBold,
//           color: COLORS.black,
//           ...titleStyle,
//         }}>
//         {title}
//       </Text>
//     </View>
//   );
// }

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FONTS, COLORS } from "../constants";
import { ArrowTwo, HeartTwoSvg } from "../svg";
import { useNavigation } from "@react-navigation/native";
import BagHeader from "../svg/BagHeader";
import WarningModal from "./WarningModal";

export default function Header({
  title,
  titleStyle,
  flag,
  onEdit,
  showModal,
  goBack,
}) {
  const navigation = useNavigation();
  const [showModal2, setShowModal] = useState(showModal);

  const handleSure = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
      }}>
      {goBack && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 0,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            if (onEdit) {
              setShowModal(true); // set showModal2 to true
            } else {
              navigation.goBack();
            }
          }}>
          <ArrowTwo />
        </TouchableOpacity>
      )}

      {!flag && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            top: 14,
          }}
          onPress={() => {
            navigation.navigate("WishList");
          }}>
          <HeartTwoSvg strokeColor="black" />
        </TouchableOpacity>
      )}

      {!flag && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 60,
            top: 12,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate("Order");
          }}>
          <BagHeader color="black"></BagHeader>
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 18,
          ...FONTS.Mulish_600SemiBold,
          color: COLORS.black,
          ...titleStyle,
        }}>
        {title}
      </Text>

      {onEdit && (
        <WarningModal
          showModal={showModal2}
          setShowModal={setShowModal}
          handleSure={handleSure}
          massage={" השינויים לא ישמרו \n האם את בטוחה ?"}
        />
      )}
    </View>
  );
}
