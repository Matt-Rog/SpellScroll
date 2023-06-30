import {
  StyleSheet,
  SafeAreaView,
  Text,
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
import Splash from "../../components/Splash";
import CharacterSettings from "./CharacterSettings";
import Tags from "../../components/Tags";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

export default function YourCharactersPage({ navigation, route }) {
  const [Chars, setChars] = useState([]);
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    const loadData = navigation.addListener("focus", () => {
      getData();
    });
    return loadData;
  }, [navigation]);

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("characters");
      const jsonValue = JSON.parse(stringValue);
      if (!jsonValue || typeof jsonValue !== "object") return;
      setChars(jsonValue);
      if (jsonValue.length > 0) {
        setHideSplash(true);
      } else {
        setHideSplash(false);
      }
      console.log("CHARS FROM GET DATA");
      console.log(jsonValue);
    } catch (e) {
      console.log("Error getting character data");
      console.log(e);
    }
  };

  const updateData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      if (value.length == 0) {
        setHideSplash(false);
      } else {
        setHideSplash(true);
      }
      await AsyncStorage.setItem("characters", jsonValue);
    } catch (e) {
      I;
      console.log("Error updating characters");
      console.log(e);
    }
  };
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [tempCharID, setTempCharID] = useState(0);

  const changeSettingsModalVisibility = (bool) => {
    setIsSettingsModalVisible(bool);
  };

  const onResultPress = () => {
    navigation.navigate("Character", { item });
  };

  const onLongPress = (item) => {
    setTempCharID(item.ID);
    changeSettingsModalVisibility(true);
  };

  function deleteCharacter(charID) {
    var index = Chars.indexOf(Chars.find((char) => char.ID === charID));
    Chars.splice(index, 1);
    updateData(Chars);
  }

  const applyFromModal = async (data) => {
    Object.assign(data, { ID: Chars.length });

    console.log("NEW CHAR");
    console.log(data);

    const newChars = [...Chars, data];
    setChars(newChars);
    updateData(newChars);
  };

  return (
    <SafeAreaView style={[STYLES.Background]}>
      <View style={STYLES.Container}>
        <Text style={[STYLES.Header1, { marginBottom: 20 }]}>
          Your Characters
        </Text>
        <Splash
          hide={hideSplash}
          image={"green_dragon"}
          title={"No characters found"}
          component={
            <Pressable
              onPress={() =>
                navigation.navigate("Add Character", { edit: false })
              }
              style={STYLES.PrimaryButton}
            >
              <Text style={STYLES.Header4}>Add Character</Text>
            </Pressable>
          }
        ></Splash>
        <FlatList
          data={Chars}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Character", { charID: item.ID })
              }
              onLongPress={() => onLongPress(item)}
              style={({ pressed }) => [
                { backgroundColor: pressed ? COLORS.back_light : COLORS.back },
                styles.resultBox,
              ]}
              android_ripple={{ color: COLORS.back_light }}
            >
              <View style={[styles.bar, { backgroundColor: item.color }]}>
                <Image
                  style={styles.icon}
                  source={Images.icon[item.icon.toLowerCase()]}
                  resizeMode="stretch"
                ></Image>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={3}
                  style={[STYLES.Header3, { maxWidth: "110%" }]}
                >
                  {item.name}
                </Text>
                <Tags background={COLORS.back_light} tags={item.classes}></Tags>
              </View>
            </Pressable>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 100,
          right: 0,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Add Character", { edit: false })}
          style={[styles.applyBTN, { backgroundColor: COLORS.primary_accent }]}
        >
          <FontAwesome
            name={"plus"}
            size={35}
            color={"#fff"}
            style={styles.plus}
          ></FontAwesome>
        </Pressable>
      </View>

      {/* Character Settings Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSettingsModalVisible}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <CharacterSettings
          navigation={navigation}
          charID={tempCharID}
          changeModalVisibility={changeSettingsModalVisibility}
          deleteCharacter={(charID) => deleteCharacter(charID)}
        ></CharacterSettings>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    justifyContent: "center",
  },
  resultBox: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 12,
    marginHorizontal: 30,
    marginBottom: 15,
    padding: 10,
    width: "100%",
  },
  icon: {
    width: 50,
    height: 50,
  },
  plus: {
    alignSelf: "center",
    padding: 10,
    paddingVertical: 7,
  },
  applyBTN: {
    borderRadius: 100,
    padding: 8,
    marginRight: 30,
    justifyContent: "center",
  },
  cancelBTN: {
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 8,
    marginTop: 10,
    width: "40%",
    justifyContent: "center",
    marginRight: 30,
  },
});
