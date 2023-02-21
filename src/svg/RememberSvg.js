import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RememberSvg = (props) => (
    <Svg
        width={10}
        height={7}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9 1 3.5 6 1 3.727"
            stroke="#D7BB7B"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default RememberSvg;
