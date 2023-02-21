import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CanceledSvg = (props) => (
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
            d="m33.612 30.09-5.7-5.7 5.7-5.7a.588.588 0 0 0 0-.83L30.92 15.17a.59.59 0 0 0-.83 0l-5.7 5.7-5.7-5.7a.588.588 0 0 0-.83 0l-2.689 2.691a.588.588 0 0 0 0 .83l5.7 5.7-5.7 5.7a.588.588 0 0 0 0 .83l2.692 2.69c.23.228.6.228.83 0l5.7-5.7 5.7 5.7c.23.228.6.228.83 0l2.692-2.693a.588.588 0 0 0 0-.83h-.003Z"
            fill="#fff"
        />
    </Svg>
);

export default CanceledSvg;
