import * as React from "react";
import Svg, { Path, Line } from "react-native-svg";

const FilterSvg = (props) => (
  <Svg
    width={15}
    height={14}
    fill={props.filled ? "#C4C6CF" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.333 1H1l5.333 6.307v4.36L9 13V7.307L14.333 1Z"
      stroke="#C4C6CF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {props.filled && (
      <Line
        x1="1"
        y1="1"
        x2="14.333"
        y2="13"
        stroke="#808080"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </Svg>
);

export default FilterSvg;
