import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RatingSvg = (props) => (
    <Svg
        width={68}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m6 1 1.545 3.13L11 4.635 8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.455-.505L6 1ZM20 1l1.545 3.13L25 4.635 22.5 7.07l.59 3.44L20 8.885l-3.09 1.625.59-3.44L15 4.635l3.455-.505L20 1ZM34 1l1.545 3.13L39 4.635 36.5 7.07l.59 3.44L34 8.885l-3.09 1.625.59-3.44L29 4.635l3.455-.505L34 1ZM48 1l1.545 3.13L53 4.635 50.5 7.07l.59 3.44L48 8.885l-3.09 1.625.59-3.44L43 4.635l3.455-.505L48 1Z"
            fill="#FFBE00"
            stroke="#FFBE00"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="m62 1 1.545 3.13L67 4.635 64.5 7.07l.59 3.44L62 8.885l-3.09 1.625.59-3.44L57 4.635l3.455-.505L62 1Z"
            stroke="#FFBE00"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default RatingSvg;
