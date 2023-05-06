import React from "react";
import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const LocationPinIcon = ({ ...rest }) => {
  return (
    <View {...rest}>
      <Svg
        width={40}
        height={40}
        viewBox="0 0 24 24"
        fill="none"
        stroke={"white"}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Circle cx="12" cy="10" r="3" />
        <Path
          fill="none"
          d="M12 22s-8-4.5-8-12.2A8 8 0 0 1 12 2a8 8 0 0 1 8 7.8c0 7.7-8 12.2-8 12.2z"
        />
      </Svg>
    </View>
  );
};

export default LocationPinIcon;
