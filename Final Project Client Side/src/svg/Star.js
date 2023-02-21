import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Star = (props) => (
    <Svg
        width={10}
        height={9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m5 .833 1.288 2.609 2.879.42-2.084 2.03.492 2.866L5 7.404 2.425 8.758l.492-2.866-2.084-2.03 2.88-.42L5 .833Z"
            fill="#FFC700"
        />
    </Svg>
);

export default Star;
