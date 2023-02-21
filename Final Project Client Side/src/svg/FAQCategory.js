import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const FAQCategory = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={15} cy={15} r={15} fill="#D7BB7B" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 18v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0ZM14.22 13.28a.75.75 0 1 1 1.06-1.06.75.75 0 0 1-1.06 1.06Z"
            fill="#fff"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 21.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm0 1.5a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            fill="#fff"
        />
    </Svg>
);

export default FAQCategory;
