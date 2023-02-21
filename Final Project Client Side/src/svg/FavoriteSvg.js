import * as React from "react";
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg";

const FavoriteSvg = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle
            cx={15}
            cy={15}
            r={14.5}
            stroke="#D7BB7B"
            strokeOpacity={0.35}
        />
        <G clipPath="url(#a)">
            <Path
                d="M20.692 11.241a3.54 3.54 0 0 0-5.01 0l-.682.683-.683-.683a3.542 3.542 0 1 0-5.01 5.01l.683.683 5.01 5.01 5.01-5.01.682-.683a3.541 3.541 0 0 0 0-5.01v0Z"
                fill="#F4303C"
                stroke="#F4303C"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    transform="translate(7.273 7.273)"
                    d="M0 0h15.454v15.454H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default FavoriteSvg;
