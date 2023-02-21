import * as React from "react";
import Svg, { Path } from "react-native-svg";

const WishListTab = ({ color }) => (
    <Svg width={23} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            d="M20.632 2.298h0a5.282 5.282 0 0 1 0 7.474h0l-1.163 1.163-8.004 8.004-8.004-8.004-1.163-1.163a5.285 5.285 0 1 1 7.474-7.474l1.163 1.163a.75.75 0 0 0 1.06 0l1.163-1.163h0a5.284 5.284 0 0 1 7.474 0Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default WishListTab;
