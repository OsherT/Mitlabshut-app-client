import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchSvg = (props) => (
    <Svg
        width={15}
        height={15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.53 1.12a5.41 5.41 0 1 0 0 10.82 5.41 5.41 0 0 0 0-10.82ZM0 6.53a6.53 6.53 0 1 1 13.06 0A6.53 6.53 0 0 1 0 6.53Z"
            fill="#C4C6CF"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.48 10.48a.746.746 0 0 1 1.055 0l3.246 3.246a.746.746 0 1 1-1.055 1.055l-3.246-3.246a.746.746 0 0 1 0-1.055Z"
            fill="#C4C6CF"
        />
    </Svg>
);

export default SearchSvg;
