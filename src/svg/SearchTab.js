import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchTab = ({ color }) => (
    <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.706 1.493a7.214 7.214 0 1 0 0 14.427 7.214 7.214 0 0 0 0-14.427ZM0 8.706a8.706 8.706 0 1 1 17.413 0A8.706 8.706 0 0 1 0 8.706Z"
            fill={color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.973 13.973a.995.995 0 0 1 1.407 0l4.329 4.328A.995.995 0 0 1 18.3 19.71l-4.328-4.329a.995.995 0 0 1 0-1.407Z"
            fill={color}
        />
    </Svg>
);

export default SearchTab;
