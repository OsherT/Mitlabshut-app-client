import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SignOutCategory = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M0 15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15Z"
            fill="#D7BB7B"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.856 10.785V9h8.925v12.495h-8.925V19.71h7.14v-8.925h-7.14ZM7.5 15.248l3.57-2.677v1.785h7.142v1.785H11.07v1.784L7.5 15.248Z"
            fill="#fff"
        />
    </Svg>
);

export default SignOutCategory;
