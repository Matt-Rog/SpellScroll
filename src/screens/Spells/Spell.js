import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  View,
  Image,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";

import MOCKDATA from "../../../ALL_SPELL_DATA.json";
// Utility
import * as THEME from "../../utils/Theme";
// Components
import TopMenu from "../../components/TopMenu";
import Splash from "../../components/Splash";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SlidingTab from "../../components/SlidingTab";
import SpellSettings from "../Characters/SpellSettings";
import Tags from "../../components/Tags";

var [COLORS, STYLES, IMAGES] = [
  THEME.DarkTheme,
  THEME.getStyles(THEME.DarkTheme),
  THEME.DarkImages,
];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
  IMAGES = theme.IMAGES;
});

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function SpellPage({ navigation, route }) {
  const { id } = route.params;
  var Spell = MOCKDATA.find((item) => item.ID === id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  function getSubtitle(spell) {
    let subtitle = "";
    switch (spell.level) {
      case 0:
        subtitle += "Cantrip";
        break;
      case 1:
        subtitle += "1st-level";
        break;
      case 2:
        subtitle += "2nd-level";
        break;
      case 3:
        subtitle += "3rd-level";
        break;
      default:
        subtitle += spell.level + "th-level";
        break;
    }
    subtitle += " " + spell.school.toLowerCase();
    return subtitle;
  }

  function getStyledDescription(description) {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={true}
          style={{ borderRadius: 12 }}
          data={description}
          renderItem={({ item }) => (
            <View style={[styles.description, { margin: 10 }]}>
              <Text style={STYLES.ContentBody}>{item}</Text>
            </View>
          )}
        ></FlatList>
      </View>
    );
  }

  function getComponentList(components) {
    let initials = [];
    for (const component of components) {
      initials.push(component[0]);
    }
    return initials.join();
  }

  function getStyledAttributes(spell) {
    console.log(spell);
    var content = (
      <View style={{ width: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View
            style={[
              [styles.attributeTab, { backgroundColor: COLORS.back }],
              { backgroundColor: COLORS.back },
            ]}
          >
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <Text
                style={[
                  [
                    [styles.attributeName, { color: COLORS.secondary_content }],
                    { color: COLORS.primary_content },
                  ],
                  { color: COLORS.primary_content },
                ]}
              >
                Casting Time
              </Text>
              {spell?.ritual == "YES" ? (
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5
                    style={{ marginLeft: 8 }}
                    name={"hand-sparkles"}
                    size={15}
                    color={COLORS.secondary_content}
                  />
                </View>
              ) : null}
            </View>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[styles.attributeValue, { color: COLORS.primary_content }]}
            >
              {spell.time}
            </Text>
          </View>
          <View style={[styles.attributeTab, { backgroundColor: COLORS.back }]}>
            <Text
              style={[
                [styles.attributeName, { color: COLORS.secondary_content }],
                { color: COLORS.primary_content },
              ]}
            >
              Range/Area
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={[
                  [styles.attributeValue, { color: COLORS.primary_content }],
                  { color: COLORS.primary_content },
                ]}
              >
                {spell.range}
              </Text>
              {spell.aoe_shape != "None" ? (
                <Image
                  style={{ height: 20, width: 20, marginLeft: 5 }}
                  resizeMode="contain"
                  source={IMAGES.shape[spell.aoe_shape.toLowerCase()]}
                ></Image>
              ) : null}
              {spell.aoe_size != "None" ? (
                <Text
                  style={[
                    STYLES.Note,
                    { color: COLORS.primary_content, marginLeft: 5 },
                  ]}
                >
                  ({spell.aoe_size})
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={[styles.attributeTab, { backgroundColor: COLORS.back }]}>
            <Text
              style={[
                [styles.attributeName, { color: COLORS.secondary_content }],
                { color: COLORS.primary_content },
              ]}
            >
              Components
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[styles.attributeValue, { color: COLORS.primary_content }]}
            >
              {getComponentList(spell.components)}
            </Text>
          </View>
          <View style={[styles.attributeTab, { backgroundColor: COLORS.back }]}>
            <Text
              style={[
                [styles.attributeName, { color: COLORS.secondary_content }],
                { color: COLORS.primary_content },
              ]}
            >
              Damage/Effect
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[styles.attributeValue, { color: COLORS.primary_content }]}
            >
              {spell.effect}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={[styles.attributeTab, { backgroundColor: COLORS.back }]}>
            <Text
              style={[
                [styles.attributeName, { color: COLORS.secondary_content }],
                { color: COLORS.primary_content },
              ]}
            >
              Attack/Save
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[styles.attributeValue, { color: COLORS.primary_content }]}
            >
              {spell.attack}
            </Text>
          </View>
          <View style={[styles.attributeTab, { backgroundColor: COLORS.back }]}>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <Text
                style={[
                  [
                    [styles.attributeName, { color: COLORS.secondary_content }],
                    { color: COLORS.primary_content },
                  ],
                  { color: COLORS.primary_content },
                ]}
              >
                Duration
              </Text>
              {spell?.concentration == "YES" ? (
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5
                    style={{ marginLeft: 8 }}
                    name={"crosshairs"}
                    size={15}
                    color={COLORS.secondary_content}
                  />
                </View>
              ) : null}
            </View>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[styles.attributeValue, { color: COLORS.primary_content }]}
            >
              {spell.duration}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "column", marginLeft: WIDTH * 0.06 }}>
          {spell.classes.length != 0 ? (
            <View>
              <Text style={STYLES.Header3}>Classes</Text>
              <Tags
                tags={spell.classes}
                maxPerRow={4}
                background={COLORS.back}
              ></Tags>
            </View>
          ) : null}
          {spell.subclasses.length != 0 ? (
            <View style={{ marginTop: 20 }}>
              <Text style={STYLES.Header3}>Subclasses</Text>
              <Tags
                tags={spell.subclasses}
                maxPerRow={2}
                background={COLORS.back}
              ></Tags>
            </View>
          ) : null}
        </View>
      </View>
    );

    return content;
  }

  function getTabContent(spell) {
    var tabData = {
      Description: (
        <View>
          {Spell.paywall == "TRUE" ? (
            <View>
              <Image
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  width: 100,
                  height: 80,
                  marginVertical: 10,
                }}
                source={IMAGES.splash["dungeon"]}
                resizeMode="stretch"
              ></Image>
            </View>
          ) : null}
          <ScrollView contentContainerStyle={{ flexGrow: 0 }} bounces={true}>
            {getStyledDescription(spell.description)}
          </ScrollView>
        </View>
      ),
      Attributes: <View>{getStyledAttributes(spell)}</View>,
    };

    return tabData;
  }

  const onBackPress = () => {
    navigation.goBack();
  };

  const onSettingsPress = () => {
    changeModalVisibility(true);
  };

  return (
    <SafeAreaView style={STYLES.Background}>
      <View
        style={[
          styles.colorTab,
          { backgroundColor: COLORS.school[Spell.school.toLowerCase()] },
        ]}
      ></View>
      <TopMenu
        bubble={true}
        settings={true}
        onLeftPress={() => onBackPress()}
        onRightPress={() => onSettingsPress()}
      ></TopMenu>
      {/* Spell Settings Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <SpellSettings
          navigation={navigation}
          spellID={id}
          changeModalVisibility={changeModalVisibility}
        ></SpellSettings>
      </Modal>

      <View
        style={[
          styles.contentTab,
          { marginTop: 20, backgroundColor: COLORS.back },
        ]}
      >
        {/* School Icon & Spell Name */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 0,
            alignItems: "center",
          }}
        >
          <Image
            style={styles.icon}
            source={IMAGES.school[Spell.school.toLowerCase()]}
            resizeMode="stretch"
          ></Image>
          <View style={{ justifyContent: "center" }}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={[STYLES.Header2, { maxWidth: 280, marginTop: 0 }]}
            >
              {Spell.name}
            </Text>
          </View>
        </View>
        {/* Level & School Subtitle  / Tags*/}
        <View style={{ marginLeft: 10 }}>
          <Text
            style={[
              STYLES.Header3,
              { fontStyle: "italic", color: COLORS.secondary_content },
            ]}
          >
            {getSubtitle(Spell)}
          </Text>
          <FlatList
            data={Spell.tags}
            numColumns={2}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <View style={[STYLES.Tags, { marginTop: 10, marginRight: 8 }]}>
                  <Text style={{ color: COLORS.secondary_content }}>
                    {item.toUpperCase()}
                  </Text>
                </View>
              );
            }}
          ></FlatList>
        </View>
      </View>

      <SlidingTab
        data={getTabContent(Spell)}
        color={COLORS.school[Spell.school.toLowerCase()]}
      ></SlidingTab>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  colorTab: {
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    width: "100%",
    height: 225,
    position: "absolute",
    top: 0,
  },
  contentTab: {
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    width: "90%",
    padding: 20,
    height: "auto",
    flexDirection: "column",
  },
  icon: {
    maxHeight: 40,
    maxWidth: 40,
    marginRight: 10,
  },
  description: {
    marginTop: 10,
    marginBottom: 0,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  attributeTab: {
    backgroundColor: COLORS.back,
    width: "40%",
    maxWidth: "50%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 20,
    marginLeft: 0,
  },
  attributeName: {
    fontSize: 15,
    color: COLORS.secondary_content,
    marginBottom: 5,
  },
  attributeValue: {
    fontSize: 25,
    fontWeight: "bold",
    maxWidth: "99%",
    color: COLORS.primary_content,
  },
});
