import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const Plus = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9 12.267h6.492M12.245 9v6.533"
            stroke="#C8C8C8"
            strokeWidth={0.96}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx={12} cy={12} r={11.5} stroke="#C8C8C8" />
    </Svg>
);

export default Plus;
