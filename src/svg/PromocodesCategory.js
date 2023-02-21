import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const PromocodesCategory = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={15} cy={15} r={15} fill="#D7BB7B" />
        <Path
            d="M20.25 15.25v6.25h-10v-6.25m5 6.25v-9.375m0 0h-2.813a1.563 1.563 0 0 1 0-3.125c2.188 0 2.813 3.125 2.813 3.125Zm0 0h2.813a1.563 1.563 0 1 0 0-3.125c-2.188 0-2.813 3.125-2.813 3.125Zm-6.25 0h12.5v3.125H9v-3.125Z"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default PromocodesCategory;
