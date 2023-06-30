import React, { useState } from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";
// Utility
import * as THEME from "../utils/Theme";
import Images from "../utils/Images";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Splash = (props) => {
  const hide = props.hide;

  const [image, setImage] = useState(props.image);

  if (hide) {
    return null;
  }
  return (
    <View style={styles.splash}>
      {props.image != undefined ? (
        <Image
          style={styles.splashIMG}
          source={Images.splash[image]}
          resizeMode="contain"
        ></Image>
      ) : null}
      <Text style={STYLES.Header2}>{props.title}</Text>
      <Text
        style={[
          STYLES.ContentBody,
          { marginTop: 5, maxWidth: "70%", textAlign: "center" },
        ]}
      >
        {props.body}
      </Text>
      {props.component}
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  splashIMG: {
    height: 200,
    margin: 15,
  },
});

export default Splash;
