import React from "react";
import { Svg, Path } from "react-native-svg";
import { COLORS } from "../constants";

const TrashCanIcon = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="-2 -2 28 28" fill="none">
      <Path
        d="M9 6V7H4V9H21V7H16V6H9ZM18 4H6L5 7H19L18 4ZM7 10V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V10H7Z"
        fill={COLORS.black}
      />
    </Svg>
  );
};

export default TrashCanIcon;
