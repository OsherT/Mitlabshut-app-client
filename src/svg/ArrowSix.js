import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowSix = (props) => (
    <Svg
        width={7}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.394 11.749a.857.857 0 0 1 0-1.212L4.93 6 .394 1.463A.857.857 0 1 1 1.606.251L6.75 5.394a.857.857 0 0 1 0 1.212L1.606 11.75a.857.857 0 0 1-1.212 0Z"
            fill="#626262"
        />
    </Svg>
);

export default ArrowSix;
