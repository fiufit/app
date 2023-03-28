import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import React from "react";

const FROM_COLOR = "rgb(185, 213, 123)";
const TO_COLOR = "rgb(254,254,253)";

const Background = ({ children }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={FROM_COLOR} />
            <Stop offset="1" stopColor={TO_COLOR} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
};

export default Background;
