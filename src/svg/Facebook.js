import React from "react";
import Svg, { Path } from "react-native-svg";

const Facebook = ({ size = 24, color = "#4285F4" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M21.998 0H2.002C.899 0 0 .899 0 2.002v19.996C0 23.1.899 24 2.002 24h19.996c1.103 0 2.002-.9 2.002-2.002V2.002C24 .899 23.1 0 21.998 0z"
      />
      <Path
        fill="#fff"
        d="M16.836 24V14.706h2.814l.42-3.272h-3.234v-2.092c0-.948.264-1.594 1.627-1.594l1.733-.001v-2.814a23.427 23.427 0 00-2.546-.13c-2.52 0-4.256 1.542-4.256 4.381v2.445H9.894v3.272h2.814V24h3.128z"
      />
    </Svg>
  );
};

export default Facebook;
