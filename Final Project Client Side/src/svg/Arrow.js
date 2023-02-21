import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Arrow = (props) => (
    <Svg
        width={34}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M1 5.25a.75.75 0 0 0 0 1.5v-1.5Zm32.53 1.28a.75.75 0 0 0 0-1.06L28.757.697a.75.75 0 0 0-1.06 1.06L31.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06L33.53 6.53ZM1 6.75h32v-1.5H1v1.5Z"
            fill="#fff"
        />
    </Svg>
);

export default Arrow;
