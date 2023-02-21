import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TabElement = (props) => (
    <Svg
        width={153}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M48.9 11.207C40.447 17.648 27.148 27.782 0 28h152.109c-29.211 0-43.599-11.655-51.165-17.783-1.03-.834-1.933-1.566-2.73-2.152C91.561 3.174 82.19 0 75.666 0 69.142 0 61.522 2.582 53.2 8.065c-1.303.858-2.717 1.935-4.3 3.143Z"
            fill="#fff"
        />
    </Svg>
);

export default TabElement;
