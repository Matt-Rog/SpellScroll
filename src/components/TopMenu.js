import { StyleSheet, SafeAreaView, Pressable } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Utility
import * as THEME from "../utils/Theme";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const TopMenu = (props) => {
  const settings = (
    <Pressable
      style={props.bubble ? styles.back : styles.simple}
      onPress={props.onRightPress}
    >
      {props.rightIcon ? (
        props.rightIcon
      ) : (
        <FontAwesome name={"cog"} size={30} color="#FFF" style />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
      <Pressable
        style={props.bubble ? styles.back : styles.simple}
        onPress={props.onLeftPress}
      >
        <FontAwesome name={"chevron-left"} size={28} color="#FFF" style />
      </Pressable>
      {props.settings == true ? settings : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    margin: 10,
  },
  simple: {
    marginTop: 10,
  },
});

export default TopMenu;
