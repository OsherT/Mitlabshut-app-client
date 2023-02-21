import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowThree = (props) => (
    <Svg
        width={7}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m1 1 5 5-5 5"
            stroke="#626262"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default ArrowThree;
