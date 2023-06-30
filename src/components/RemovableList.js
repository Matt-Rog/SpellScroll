import { FlatList, Text, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Utility
import * as THEME from "../utils/Theme";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const RemovableList = (props) => {
  return (
    <FlatList
      data={props.selected}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => props.onXPress(item)}
            style={[
              STYLES.Removable,
              { borderColor: COLORS.primary_accent, flexDirection: "row" },
            ]}
          >
            <FontAwesome
              name={"times"}
              size={17}
              style={{ color: COLORS.primary_accent, marginRight: 7 }}
            />
            <Text
              style={{
                color: COLORS.primary_accent,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {item}
            </Text>
          </Pressable>
        );
      }}
    ></FlatList>
  );
};

export default RemovableList;
