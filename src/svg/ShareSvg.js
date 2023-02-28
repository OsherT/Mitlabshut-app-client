import React from "react";
import { Svg, Path } from "react-native-svg";

const ShareSvg = (size) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.293 14.293L12 12.586l-3.293 3.293-1.414-1.414L10.586 11 7.293 7.707l1.414-1.414L12 9.586l3.293-3.293 1.414 1.414L13.414 11l3.293 3.293z"
      fill="none"
    />
  </Svg>
);

export default ShareSvg;
