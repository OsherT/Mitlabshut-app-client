import * as React from "react";
import Svg, { Path } from "react-native-svg";

const QuestionOpenSvg = (props) => (
    <Svg
        width={22}
        height={22}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M22 11c0 6.075-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0s11 4.925 11 11Z"
            fill="#D7BB7B"
        />
        <Path
            d="m11.04 12.225 3.053-3.055a.574.574 0 0 1 .815 0 .582.582 0 0 1 0 .817l-3.459 3.46a.576.576 0 0 1-.8.018L7.17 9.99a.577.577 0 1 1 .815-.817l3.055 3.052Z"
            fill="#fff"
        />
    </Svg>
);

export default QuestionOpenSvg;
