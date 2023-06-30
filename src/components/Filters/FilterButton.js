import { StyleSheet, Text, FlatList, Pressable, View } from "react-native";
import React, { useState, useEffect } from "react";
// Utility
import * as THEME from "../../utils/Theme";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const FilterButton = (props) => {
  const options = props.options;
  const [selected, setSelected] = useState(
    props.selected == undefined || props.selected.length == options.length
      ? []
      : props.selected
  );

  useEffect(() => {
    setSelected(
      props.selected == undefined || props.selected.length == options.length
        ? []
        : props.selected
    );
    console.log(props.selected);
  }, [props.selected]);

  function onButtonPress(item) {
    console.log(" ");
    console.log("SELECTEDvv");
    console.log(item);
    if (!selected.includes(item)) {
      var joined = selected.concat(item);
      setSelected(joined);
      if (joined.length > 0) {
        props.setFilterProp({ name: props.name, selection: joined });
      }
    } else {
      var removed = selected.filter((i) => i !== item);
      setSelected(removed);
      props.setFilterProp({ name: props.name, selection: removed });
    }
  }

  return (
    <View style={[styles.resultBox, { backgroundColor: COLORS.back }]}>
      <View style={styles.heading}>
        <Text style={STYLES.Header4}>{props.name}</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={options}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View>
                <Pressable
                  onPress={() => onButtonPress(item)}
                  style={[
                    {
                      backgroundColor: selected.includes(item)
                        ? COLORS.primary_accent
                        : COLORS.secondary_content,
                    },
                    styles.button,
                  ]}
                >
                  <Text
                    style={[
                      {
                        color: selected.includes(item)
                          ? COLORS.back
                          : COLORS.back,
                      },
                      styles.option,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultBox: {
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 12,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 9,
  },
  option: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 13,
    marginRight: 13,
  },
  button: {
    margin: 15,
    borderRadius: 50,
    padding: 3,
  },
  content: {
    alignItems: "center",
  },
});

export default FilterButton;
