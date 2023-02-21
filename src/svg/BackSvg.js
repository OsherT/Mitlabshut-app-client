import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const BackSvg = (props) => (
    <Svg
        width={38}
        height={38}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect width={38} height={38} rx={19} fill="#fff" />
        <Path
            d="m21.773 13 1.12 1.12-4.981 4.981 4.98 4.982-1.119 1.12-5.541-5.542a.792.792 0 0 1-.066-1.045l.066-.074L21.773 13Z"
            fill="#1C2340"
        />
    </Svg>
);

export default BackSvg;
