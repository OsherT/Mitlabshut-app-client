import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AddSvg = (props) => (
    <Svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8 4v4m0 0v4m0-4H4m4 0h4m3 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            stroke="#E9D9B6"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default AddSvg;
