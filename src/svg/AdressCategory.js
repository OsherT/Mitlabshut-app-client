import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const AdressCategory = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={15} cy={15} r={15} fill="#D7BB7B" />
        <Path
            d="M22 13.546C22 18.636 15 23 15 23s-7-4.364-7-9.454c0-1.736.738-3.401 2.05-4.629C11.363 7.69 13.143 7 15 7c1.857 0 3.637.69 4.95 1.917C21.263 10.145 22 11.81 22 13.546Z"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M15 15.727c1.289 0 2.333-.977 2.333-2.181 0-1.205-1.044-2.182-2.333-2.182-1.289 0-2.333.976-2.333 2.181S13.71 15.728 15 15.728Z"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default AdressCategory;
