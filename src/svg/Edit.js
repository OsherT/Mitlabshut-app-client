import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Edit = (props) => (
    <Svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={10} cy={10} r={10} fill="#D7BB7B" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m13.06 8.94.72-.72a.749.749 0 0 0 0-1.062l-.94-.939a.752.752 0 0 0-1.061 0l-.72.72a.188.188 0 0 0 0 .266l1.735 1.735a.188.188 0 0 0 .266 0Zm-6.723 2.722 4.103-4.104a.19.19 0 0 1 .267 0l1.735 1.735a.188.188 0 0 1 0 .266l-4.104 4.103-1.898.332a.375.375 0 0 1-.434-.434l.331-1.898Zm1.601-.35a.218.218 0 0 1 0-.31l2.404-2.408a.219.219 0 0 1 .31.31l-2.404 2.408a.218.218 0 0 1-.309 0Zm.187 1.314h-.75v-.75h-.568l-.176 1.008.486.485 1.008-.175v-.568Z"
            fill="#fff"
        />
    </Svg>
);

export default Edit;
