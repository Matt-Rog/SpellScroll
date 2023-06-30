import { StyleSheet, Text, Pressable, View, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Utility
import * as THEME from "../../utils/Theme";
// Components
import { ModalList } from "../ModalList";
import RemovableList from "../RemovableList";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});
const FilterList = (props) => {
  const options = props.options;

  const [selected, setSelected] = useState(
    props.selected == undefined || props.selected.length == options.length
      ? []
      : props.selected
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setSelected(
      props.selected == undefined || props.selected.length == options.length
        ? []
        : props.selected
    );
    console.log(props.selected);
  }, [props.selected]);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  function onPlusPress() {
    console.log(props.filter);
    console.log(">>>>>>>>>>>>>>>>>>>>>> SELECTED");
    console.log(selected);
    console.log(props.selected);
    changeModalVisibility(true);
  }

  function onXPress(item) {
    console.log("X PRESS");
    if (selected.includes(item)) {
      console.log("X PRESS INCLUDES");
      var removed = selected.filter((i) => i !== item);
      setSelected(removed);
    }
    console.log("X PRESS REMOVED");
    console.log(removed);
    setFilterProp(removed);
  }

  function applySelection(selection) {
    setFilterProp(selection);
    setSelected(selection);
  }

  function setFilterProp(selection) {
    props.setFilterProp({ name: props.name, selection: selection });
  }

  return (
    <View style={[styles.resultBox, { backgroundColor: COLORS.back }]}>
      <Pressable onPress={() => onPlusPress()} style={styles.heading}>
        <Text style={STYLES.Header4}>{props.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name={"plus-square"} size={23} color={COLORS.content} />
        </View>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          nRequestClose={() => changeModalVisibility(false)}
        >
          <ModalList
            name={props.optionName}
            changeModalVisibility={changeModalVisibility}
            options={options}
            selected={selected}
            applySelection={(selected) => applySelection(selected)}
          ></ModalList>
        </Modal>
      </Pressable>
      <View style={[styles.content]}>
        <RemovableList
          selected={selected}
          setSelected={(selection) => setSelected(selection)}
          onXPress={(item) => onXPress(item)}
        ></RemovableList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultBox: {
    marginBottom: 10,
    marginTop: 8,
    borderRadius: 12,
    paddingBottom: 8,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 12,
  },
  content: {
    marginLeft: 9,
  },
});

export default FilterList;
