import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DeleteSvg = (props) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M0 15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15Z"
      fill="#D7BB7B"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.585 10.585 15 14.999l4.415-4.414 1.414 1.415L16.414 16.414l4.415 4.415-1.414 1.414-4.415-4.414-4.415 4.414-1.414-1.414 4.415-4.415-4.415-4.415Z"
      fill="#fff"
    />
  </Svg>
);

export default DeleteSvg;
