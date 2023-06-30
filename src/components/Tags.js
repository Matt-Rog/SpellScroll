import { FlatList, View, Text } from "react-native";
// Utility
import * as THEME from "../utils/Theme";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const Tags = (props) => {
  return (
    <FlatList
      data={props.tags}
      numColumns={props.maxPerRow != undefined ? props.maxPerRow : 3}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        return (
          <View
            style={[
              STYLES.Tags,
              {
                marginTop: props.tags.length > 3 ? 8 : 0,
                marginRight: index === props.tags.length - 1 ? 0 : 8,
                backgroundColor: props.background,
              },
            ]}
          >
            <Text
              style={{
                color: COLORS.secondary_content,
                fontSize: props.fontSize,
              }}
            >
              {item.toUpperCase()}
            </Text>
          </View>
        );
      }}
    ></FlatList>
  );
};

export default Tags;
