import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  Pressable,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Utility
import * as THEME from "../../utils/Theme";
import Images from "../../utils/Images";
// Components
import { ModalList } from "../../components/ModalList";
import { ModalBase } from "../../components/ModalBase";
import Splash from "../../components/Splash";
import TopMenu from "../../components/TopMenu";
import RemovableList from "../../components/RemovableList";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});
export default function AddCharacterPage({ navigation, route }) {
  const [Chars, setChars] = useState([]);
  const [thisChar, setThisChar] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("characters");
      const jsonValue = JSON.parse(stringValue);
      if (!jsonValue || typeof jsonValue !== "object") return;
      setChars(jsonValue);
      console.log("CHARS FROM GET DATA");
      console.log(jsonValue);
      if (route.params.edit) {
        var char = jsonValue[route.params.charID];
        setTitle("Edit Character");
        setThisChar(char);
        setName(char.name);
        setClasses(char.classes);
        setNotes(char.notes);
        setIcon(char.icon);
        setColor(char.color);
        setSpells(char.spells);
      }
    } catch (e) {
      console.log("Error getting character data");
      console.log(e);
    }
  };

  const updateData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("characters", jsonValue);
    } catch (e) {
      I;
      console.log("Error updating characters");
      console.log(e);
    }
  };

  const [title, setTitle] = useState("Add Character");

  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);
  const [icon, setIcon] = useState("hat");
  const [color, setColor] = useState(COLORS.back);
  const [notes, setNotes] = useState("");
  const [spells, setSpells] = useState({});
  const [ID, setID] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  function onBackPress() {
    navigation.navigate("Your Characters");
  }

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const changeAddModalVisibility = (bool) => {
    setIsAddModalVisible(bool);
  };

  function onXPress(item) {
    if (classes.includes(item)) {
      var removed = classes.filter((i) => i !== item);
      setClasses(removed);
    }
  }

  function applySelection(selection) {
    setClasses(selection);
  }

  function onApplyPress() {
    if (classes.length > 0 && name.length > 0) {
      var newSpells = spells;
      if (!route.params.edit) {
        newSpells = {};
        for (var i = 0; i < classes.length; i++) {
          newSpells[classes[i]] = {
            known: [],
            prepared: [],
          };
        }
      }

      applyFromModal({
        name: name,
        classes: classes,
        notes: notes,
        icon: icon,
        color: color,
        spells: newSpells,
      });
    }
  }

  const continueToChar = () => {
    navigation.navigate("Character", { charID: ID });
    setIsAddModalVisible(false);
  };

  const applyFromModal = async (data) => {
    if (!route.params.edit) {
      Object.assign(data, { ID: Chars.length });
      setID(Chars.length);
      var localID = Chars.length;
      const newChars = [...Chars, data];
      setChars(newChars);
      updateData(newChars);
    } else {
      Object.assign(data, { ID: route.params.charID });
      setID(route.params.charID);
      var localID = route.params.charID;
      const newChars = Chars;
      newChars[route.params.charID] = data;
      setChars(newChars);
      updateData(newChars);
    }
    setIsAddModalVisible(true);
  };

  const colorList = [
    "#e6646e",
    "#ffd164",
    "#b4f09b",
    "#a5cdff",
    "#8cb4eb",
    "#a35bef",
    "#feca9c",
    "#c5d3dd",
    "#c68d7a",
  ];
  function selectColor(selection) {
    if (selection == color) {
      setColor(COLORS.back);
    } else {
      setColor(selection);
    }
  }

  const iconList = [
    "blacksmith",
    "bard",
    "cleric",
    "druid",
    "elf1",
    "elf2",
    "genie",
    "gnome",
    "faun",
    "orc",
    "warlock",
    "wizard",
    "warrior1",
    "warrior2",
  ];
  function selectIcon(selection) {
    if (selection == icon) {
      setIcon("hat");
    } else {
      setIcon(selection);
    }
  }

  // Check mark to show if required field met
  const fieldCheck = (status) => {
    return (
      <View>
        <FontAwesome
          name={status ? "check" : "check"}
          size={20}
          color={status ? "#79e46b" : COLORS.secondary_content}
          style={styles.icon}
        ></FontAwesome>
      </View>
    );
  };

  return (
    <SafeAreaView style={STYLES.Background}>
      <View style={STYLES.Container}>
        <TopMenu bubble={false} onLeftPress={() => onBackPress()}></TopMenu>
        <Text style={STYLES.Header2}>{title}</Text>

        {/* Name */}
        <View style={styles.field}>
          <Text style={[STYLES.Header3]}>Name</Text>
          <View style={styles.input}>
            <TextInput
              style={STYLES.Input}
              placeholder="Enter a name"
              value={name}
              placeholderTextColor={COLORS.secondary_content}
              onChangeText={(text) => setName(text)}
            ></TextInput>
            {fieldCheck(name.length > 0)}
          </View>
        </View>

        {/* Class */}
        <View style={styles.field}>
          <Text style={[STYLES.Header3]}>Class</Text>
          <View style={styles.input}>
            <View
              style={[STYLES.Input, { height: "auto", flexDirection: "row" }]}
            >
              <RemovableList
                selected={classes}
                onXPress={(item) => onXPress(item)}
              ></RemovableList>
              <Pressable onPress={() => changeModalVisibility(true)}>
                <FontAwesome
                  name={"plus-circle"}
                  size={25}
                  color={COLORS.primary_content}
                  style={{ margin: 5, marginHorizontal: 10 }}
                />
              </Pressable>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                nRequestClose={() => changeModalVisibility(false)}
              >
                <ModalList
                  name={"Select Class"}
                  changeModalVisibility={changeModalVisibility}
                  options={[
                    "Artificer",
                    "Bard",
                    "Cleric",
                    "Druid",
                    "Paladin",
                    "Ranger",
                    "Sorcerer",
                    "Warlock",
                    "Wizard",
                  ]}
                  selected={classes}
                  applySelection={(selected) => applySelection(selected)}
                ></ModalList>
              </Modal>
            </View>
            {fieldCheck(classes.length > 0)}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.field}>
          <Text style={[STYLES.Header3]}>Notes</Text>
          <View style={styles.input}>
            <TextInput
              style={STYLES.Input}
              placeholder="Optional notes"
              placeholderTextColor={COLORS.secondary_content}
              onChangeText={(text) => setNotes(text)}
            ></TextInput>
          </View>
        </View>

        {/* Icon */}
        <View style={styles.field}>
          <Text style={[STYLES.Header3]}>Icon</Text>
          <View style={styles.input}>
            <FlatList
              data={iconList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    onPress={() => selectIcon(item)}
                    style={[
                      styles.icon,
                      {
                        backgroundColor: color,
                        borderWidth: 3,
                        borderColor:
                          icon == item ? COLORS.primary_content : color,
                      },
                    ]}
                  >
                    <Image
                      style={{ width: 75, height: 75, margin: 5 }}
                      source={Images.icon[item.toLowerCase()]}
                      resizeMode="stretch"
                    ></Image>
                  </Pressable>
                );
              }}
            ></FlatList>
          </View>
        </View>

        {/* Color */}
        <View style={styles.field}>
          <Text style={[STYLES.Header3]}>Color</Text>
          <View style={styles.input}>
            <FlatList
              data={colorList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    onPress={() => selectColor(item)}
                    style={[
                      styles.color,
                      {
                        borderWidth: color == item ? 3 : 0,
                        backgroundColor: item,
                        borderColor: COLORS.primary_content,
                      },
                    ]}
                  ></Pressable>
                );
              }}
            ></FlatList>
          </View>
        </View>

        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <Pressable
            onPress={() => onApplyPress()}
            style={[
              STYLES.PrimaryButton,
              {
                backgroundColor:
                  classes.length > 0 && name.length > 0
                    ? COLORS.primary_accent
                    : COLORS.secondary_content,
              },
            ]}
          >
            <Text
              style={[
                STYLES.Header4,
                {
                  color:
                    classes.length > 0 && name.length > 0
                      ? COLORS.primary_content
                      : COLORS.back,
                },
              ]}
            >
              {route.params.edit ? "Save" : "Create"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Your Characters")}
            style={STYLES.TertiaryButton}
          >
            <Text style={STYLES.Header4}>Cancel</Text>
          </Pressable>
        </View>
      </View>
      {/* Confirmation */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isAddModalVisible}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        nRequestClose={() => changeAddModalVisibility(false)}
      >
        <ModalBase
          changeModalVisibility={changeAddModalVisibility}
          header={false}
          component={
            <View>
              <Splash
                hide={false}
                image={"blue_wizard"}
                title={"Huzzah!"}
                body={
                  "Your character has been successfully " +
                  (route.params.edit ? "saved." : "created.")
                }
                component={
                  <Pressable
                    onPress={() => {
                      continueToChar();
                    }}
                    style={[STYLES.PrimaryButton, { marginTop: 20 }]}
                  >
                    <Text style={STYLES.Header4}>Continue</Text>
                  </Pressable>
                }
              ></Splash>
            </View>
          }
        ></ModalBase>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  field: {
    marginVertical: 15,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    padding: 0,
    borderRadius: 15,
    margin: 5,
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
});
