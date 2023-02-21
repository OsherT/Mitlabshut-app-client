import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowFour = (props) => (
    <Svg
        width={6}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m1 9 4-4-4-4"
            stroke="#111"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default ArrowFour;
