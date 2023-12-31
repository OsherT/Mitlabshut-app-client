import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const BagSvg = ({ color = "#FE724E", inCart = false, ...props }) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={14} cy={14} r={14} fill={color} />
    <Path
      d="m19.554 19.458-.767-8.442a.452.452 0 0 0-.45-.41h-1.352v-.901a2.69 2.69 0 0 0-.79-1.915 2.708 2.708 0 0 0-4.62 1.915v.901h-1.351a.45.45 0 0 0-.45.41l-.767 8.442a1.806 1.806 0 0 0 1.796 1.966h6.955a1.806 1.806 0 0 0 1.796-1.966Zm-7.077-9.753a1.805 1.805 0 0 1 3.08-1.278c.34.34.526.793.526 1.278v.901h-3.606v-.901Zm5.947 10.525a.894.894 0 0 1-.666.293h-6.955a.89.89 0 0 1-.665-.294.889.889 0 0 1-.232-.69l.73-8.031h.94v1.352a.451.451 0 0 0 .901 0v-1.352h3.606v1.352a.45.45 0 0 0 .902 0v-1.352h.94l.73 8.032a.89.89 0 0 1-.231.69Z"
      fill="#fff"
      stroke={inCart ? color : "#000"} // Conditionally render stroke if inCart is true
      strokeWidth={inCart ? 0.1 : 0} // Conditionally set strokeWidth
      strokeLinecap="round"
    />
    <Path
  d={inCart ? "M14.28 15.06m-1.696 1.696h3.394"
  : "M14.28 15.06v3.394m-1.696-1.696h3.394"}
  stroke="#fff"
  strokeWidth={0.933}
  strokeLinecap={inCart ? "butt" : "round"}
/>


  </Svg>
);

export default BagSvg;
