import {
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  View,
  Image,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import MOCKDATA from "../../ALL_SPELL_DATA.json";
// Utility
import * as THEME from "../utils/Theme";
// Components
import Tags from "./Tags";
import SpellSettings from "../screens/Characters/SpellSettings";

var [COLORS, STYLES, IMAGES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme), THEME.DarkImages];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
  IMAGES = theme.IMAGES
});

const SpellList = (props) => {
  const [spells, setSpells] = useState([]);
  const [spellID, setSpellID] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  useEffect(() => {
    getSpells();
  }, [props.spellIDs]);

  // Spell ID -> Spell Data
  function getSpells() {
    var result = [];
    if (Array.isArray(props.spellIDs)) {
      for (const ID of props.spellIDs) {
        var found = MOCKDATA.find((spell) => spell.ID === ID);
        result.push(found);
      }
    } else {
      result = props.spellIDs;
    }
    setSpells(result);
  }

  // Conditionally decides which sub-stack is visiting Spell.js
  var next = props.prevScreen === "Search Spells" ? "Spell" : "CharSpell";

  function levelLogic({ item }) {
    let subtitle = "";
    switch (item?.level) {
      case 0:
        subtitle += "Cantrip";
        break;
      case 1:
        subtitle += "1st";
        break;
      case 2:
        subtitle += "2nd";
        break;
      case 3:
        subtitle += "3rd";
        break;
      default:
        subtitle += item?.level + "th";
        break;
    }
    return subtitle;
  }

  return (
    <View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <SpellSettings
          navigation={props.navigation}
          spellID={spellID}
          changeModalVisibility={changeModalVisibility}
        ></SpellSettings>
      </Modal>

      <FlatList
        style={{ borderRadius: 12, flexGrow: 0}}
        scrollEnabled={props.scrollEnabled}
        showsVerticalScrollIndicator={false}
        data={spells}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => props.navigation.navigate(next, { id: item.ID })}
            onLongPress={() => {
              setSpellID(item.ID);
              changeModalVisibility(true);
            }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? COLORS.back_light : COLORS.back },
              styles.resultBox,
            ]}
            android_ripple={{ color: COLORS.back_light }}
          >
            <View
              style={[
                { backgroundColor: COLORS.school[item?.school.toLowerCase()] },
                styles.schoolBar,
              ]}
            >
              <Image
                style={styles.icon}
                source={IMAGES.school[item?.school.toLowerCase()]}
                resizeMode="stretch"
              ></Image>
            </View>
            <View style={styles.text}>
              <View style={styles.rowOne}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={[STYLES.Header4]}
                >
                  {item?.name}
                </Text>
                <Text
                  style={[styles.spellTXT, { color: COLORS.secondary_content }]}
                >
                  {levelLogic({ item })}
                </Text>
              </View>
              <View style={[styles.rowOne, { marginTop: 6 }]}>
                <Text
                  style={[
                    STYLES.Header4,
                    { fontSize: 17, color: COLORS.secondary_content },
                  ]}
                >
                  {item?.school}
                </Text>
                <Tags
                  tags={
                    [item.time]
                  }
                  background={COLORS.back_light}
                  fontSize={13}
                ></Tags>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultBox: {
    marginVertical: 5,
    borderRadius: 12,
    flexDirection: "row",
  },
  spellTXT: {
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  icon: {
    width: 36,
    height: 36,
  },
  schoolBar: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },
  text: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    flex: 6,
  },
  rowOne: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

export default SpellList;
