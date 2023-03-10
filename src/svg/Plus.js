import * as React from "react";
import Svg, { Path, Circle, Text } from "react-native-svg";

const Plus = (props) => (
  <Svg
    width={50}
    height={48}
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
    <Text
      x={16}
      y={36} // Adjusted y position
      textAnchor="middle"
      fontSize="12"
      fontWeight="bold"
      fill="#C8C8C8"
    >
     הוסיפי
    </Text>
    <Text
      x={16}
      y={45} // Adjusted y position
      textAnchor="middle"
      fontSize="12"
      fontWeight="bold"
      fill="#C8C8C8"
    >
      פריט
    </Text>
  </Svg>
);

export default Plus;
