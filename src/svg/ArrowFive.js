import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowFive = (props) => (
    <Svg
        width={11}
        height={6}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.376.495a.714.714 0 0 1 1.01 0l3.78 3.78L8.948.496a.714.714 0 0 1 1.01 1.01L5.672 5.791a.714.714 0 0 1-1.01 0L.376 1.505a.714.714 0 0 1 0-1.01Z"
            fill="#626262"
        />
    </Svg>
);

export default ArrowFive;
