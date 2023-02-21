import * as React from "react";
import Svg, { Mask, Path } from "react-native-svg";

const Minus = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Mask id="a" fill="#fff">
            <Path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z" />
        </Mask>
        <Path
            d="M9 11.5a.5.5 0 0 0 0 1v-1Zm6.492 1a.5.5 0 1 0 0-1v1ZM9 12.5h6.492v-1H9v1Zm14-.5c0 6.075-4.925 11-11 11v2c7.18 0 13-5.82 13-13h-2ZM12 23C5.925 23 1 18.075 1 12h-2c0 7.18 5.82 13 13 13v-2ZM1 12C1 5.925 5.925 1 12 1v-2C4.82-1-1 4.82-1 12h2ZM12 1c6.075 0 11 4.925 11 11h2c0-7.18-5.82-13-13-13v2Z"
            fill="#C8C8C8"
            mask="url(#a)"
        />
    </Svg>
);

export default Minus;
