import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DeliveredSvg = (props) => (
    <Svg
        width={48}
        height={48}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
            fill="#C8C8C8"
        />
        <Path
            d="m20.267 32.793-7.91-7.91a1.217 1.217 0 0 1 0-1.72l1.72-1.722a1.217 1.217 0 0 1 1.722 0l5.329 5.33L32.54 15.355a1.217 1.217 0 0 1 1.72 0l1.721 1.721a1.217 1.217 0 0 1 0 1.721l-14 14a1.217 1.217 0 0 1-1.715-.005Z"
            fill="#fff"
        />
    </Svg>
);

export default DeliveredSvg;
