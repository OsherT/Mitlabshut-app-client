import * as React from "react";
import Svg, { Path } from "react-native-svg";

const QuestionCloseSvg = (props) => (
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
            d="M12.226 10.961 9.17 7.908a.574.574 0 0 1 0-.815.582.582 0 0 1 .817 0l3.462 3.459c.22.219.228.572.017.8L9.99 14.831a.577.577 0 0 1-.817-.815l3.053-3.055Z"
            fill="#fff"
        />
    </Svg>
);

export default QuestionCloseSvg;
