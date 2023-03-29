import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

const WhatsAppSvg = (props) => (
  <View style={{ width: 50, height: 50, aspectRatio: 50 / 60 }}>
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <Path
        fill="#25D366"
        d="M12 0c6.626 0 12 5.374 12 12s-5.374 12-12 12S0 18.626 0 12 5.374 0 12 0zm-2.393 16.94c-.36.177-.817.342-1.317.342-.418 0-.77-.11-1.043-.342-.278-.227-.48-.523-.48-.946 0-.428.227-.747.5-.997l1.028-1.008c.195-.19.35-.418.35-.75 0-.305-.167-.565-.418-.797-.25-.232-.587-.342-.937-.342-.372 0-.69.115-.937.342-.25.232-.43.492-.43.797 0 .305.18.536.43.768.25.232.485.36.714.593l.724.704c.267.26.48.56.48.997 0 .423-.212.72-.48.947z"
      />
    </Svg>
  </View>
);

export default WhatsAppSvg;
