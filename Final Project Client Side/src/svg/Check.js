import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Check = ({ color }) => (
    <Svg width={13} height={10} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            d="M11.667 1 4.333 8.333 1 5"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default Check;
