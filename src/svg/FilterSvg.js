import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FilterSvg = (props) => (
    <Svg
        width={15}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M14.333 1H1l5.333 6.307v4.36L9 13V7.307L14.333 1Z"
            stroke="#C4C6CF"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default FilterSvg;
