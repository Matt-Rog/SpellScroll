import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MOCKDATA from "../../../ALL_SPELL_DATA.json";
// Utility
import Images from "../../utils/Images";
import * as THEME from "../../utils/Theme";

// Components
import { ModalBase } from "../../components/ModalBase";
import Splash from "../../components/Splash";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SpellSettings = (props) => {
  const [Chars, setChars] = useState([]);
  const [selectedChar, setSelectedChar] = useState({ spells: {} });

  useEffect(() => {
    console.log("chars )");
    getData();
  }, [props.navigation]);

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("characters");
      const jsonValue = JSON.parse(stringValue);
      if (!jsonValue || typeof jsonValue !== "object") return;
      setChars(jsonValue);
      console.log(jsonValue);
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

  const spellID = props.spellID;

  const spell = MOCKDATA.find((spell) => spell.ID == spellID);

  const changeModalVisibility = (bool) => {
    props.changeModalVisibility(bool);
  };

  function selectCharacter(item) {
    console.log(item);
    if (selectedChar.ID == item.ID) {
      setSelectedChar({ spells: {} });
    } else {
      setSelectedChar(item);
    }
  }

  function manageStats(item, index, stat) {
    if (selectedChar != { spells: {} }) {
      const STAT_INDEX = stat == "known" ? 0 : 1;
      var tempSpells = Object.values(selectedChar.spells);
      var tempClassSpells = tempSpells[index];
      var tempStat = Object.values(tempClassSpells)[STAT_INDEX];

      if (!tempStat.includes(spellID)) {
        tempStat.push(spellID);
      } else {
        tempStat = tempStat.filter((e) => e !== spellID);
      }

      selectedChar.spells[selectedChar.classes[index]] =
        stat == "known"
          ? { known: tempStat, prepared: Object.values(tempSpells[index])[1] }
          : { known: Object.values(tempSpells[index])[0], prepared: tempStat };
      const newChars = Chars;
      newChars[selectedChar.ID] = selectedChar;
      setSelectedChar(selectedChar);
      updateData(newChars);
      getData();
    }
  }

  const classList = (
    <View>
      <FlatList
        data={Object.values(selectedChar?.spells)}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
              justifyContent: "space-evenly",
            }}
          >
            <FontAwesome5
              style={{
                marginHorizontal: 10,
                marginLeft: 20,
                transform: [{ rotate: "0deg" }],
              }}
              name={"scroll"}
              color={selectedChar.color}
              size={18}
            />
            <View
              style={{
                backgroundColor: COLORS.back_light,
                width: 200,
                borderRadius: 8,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: COLORS.primary_content,
                  fontWeight: "bold",
                  marginHorizontal: 10,
                }}
              >
                {selectedChar.classes[index]}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => manageStats(item, index, "known")}>
                  <FontAwesome5
                    style={{ marginHorizontal: 10 }}
                    name={"graduation-cap"}
                    color={
                      item["known"].includes(spellID)
                        ? selectedChar.color
                        : COLORS.back
                    }
                    size={18}
                  />
                </Pressable>
                <Pressable onPress={() => manageStats(item, index, "prepared")}>
                  <FontAwesome5
                    style={{ marginHorizontal: 10 }}
                    name={"magic"}
                    color={
                      item["prepared"].includes(spellID)
                        ? selectedChar.color
                        : COLORS.back
                    }
                    size={18}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );

  return (
    <View>
      {/* Settings */}
      <ModalBase
        changeModalVisibility={changeModalVisibility}
        header={true}
        title={"Manage spell"}
        component={
          <View style={{ marginVertical: 0 }}>
            <Text
              style={[
                STYLES.Header4,
                {
                  fontStyle: "italic",
                  color: COLORS.secondary_content,
                  marginTop: 5,
                  marginBottom: 10,
                },
              ]}
            >
              {spell.name}
            </Text>
            {Chars.length == 0 ? (
              <Splash
                body={"No characters found"}
                component={
                  <Pressable
                    onPress={() => {
                      changeModalVisibility(false);
                      props.navigation.navigate("Characters", {
                        screen: "Add Character",
                        params: { edit: false },
                      });
                    }}
                    style={[STYLES.PrimaryButton, { marginTop: 10 }]}
                  >
                    <Text style={STYLES.Header4}>Add Character</Text>
                  </Pressable>
                }
              ></Splash>
            ) : null}
            <FlatList
              data={Chars}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <Pressable
                    onPress={() => selectCharacter(item)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? COLORS.back_light
                          : COLORS.back_light,
                      },
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 8,
                        borderRadius: 15,
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          padding: 5,
                          backgroundColor: item.color,
                          borderRadius: 15,
                        }}
                      >
                        <Image
                          style={{ height: 35, width: 35 }}
                          source={Images.icon[item.icon.toLowerCase()]}
                          resizeMode="contain"
                        ></Image>
                      </View>
                      <Text style={[STYLES.Header3, { marginLeft: 8 }]}>
                        {item.name}
                      </Text>
                    </View>

                    <FontAwesome5
                      style={{ marginRight: 10 }}
                      name={
                        selectedChar != {} && selectedChar.ID == item.ID
                          ? "angle-up"
                          : "angle-down"
                      }
                      color={COLORS.secondary_content}
                      size={20}
                    />
                  </Pressable>
                  {selectedChar != {} && selectedChar.ID == item.ID
                    ? classList
                    : null}
                </View>
              )}
            ></FlatList>
          </View>
        }
      ></ModalBase>
    </View>
  );
};

export default SpellSettings;
