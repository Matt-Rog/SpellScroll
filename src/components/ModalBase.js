import { Text, Pressable, Dimensions, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Utility
import * as THEME from "../utils/Theme";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ModalBase = (props) => {
  function onXPress() {
    props.changeModalVisibility(false);
  }

  const header = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={STYLES.Header2}>{props.title}</Text>
      {props.showX == undefined || props.showX == true ? (
        <Pressable onPress={() => onXPress()}>
          <FontAwesome
            name={"times-circle"}
            size={30}
            color={COLORS.secondary_content}
          />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
      }}
    >
      <View style={[STYLES.Modal, { width: "80%", alignSelf: "center" }]}>
        {props.header ? header : null}
        {props.component}
      </View>
    </View>
  );
};

export { ModalBase };
