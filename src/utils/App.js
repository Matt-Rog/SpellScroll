import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MOCKDATA from "../../ALL_SPELL_DATA.json";
// Screens
import SearchPage from "../screens/Spells/Search";
import SpellPage from "../screens/Spells/Spell";
import FilterPage from "../screens/Spells/Filter";
import YourCharactersPage from "../screens/Characters/YourCharacters";
import CharacterPage from "../screens/Characters/Character";
import AddCharacterPage from "../screens/Characters/AddCharacter";
import SettingsPage from "../screens/Settings/Settings";
import * as THEME from "./Theme";

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)];
THEME.getTheme().then((theme) => {
  COLORS = theme.COLORS;
  STYLES = theme.STYLES;
});

const Stack = createStackNavigator();
const MenuTab = createBottomTabNavigator();
const WIDTH = Dimensions.get("window").width;

const Theme = {
  dark: true,
  colors: {
    primary: "rgb(28, 255, 30, 0)",
    background: "rgb(28, 255, 30, 0)",
    card: "rgb(28, 255, 30, 0)",
    text: "rgb(28, 255, 30, 0)",
    border: "rgb(28, 255, 30, 0)",
    notification: "rgb(255, 69, 58)",
  },
};

function Spells() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="Search Spells"
        component={SearchPage}
        initialParams={{ INITDATA: MOCKDATA }}
      ></Stack.Screen>
      <Stack.Screen name="Filter Spells" component={FilterPage}></Stack.Screen>
      <Stack.Screen name="Spell" component={SpellPage}></Stack.Screen>
    </Stack.Navigator>
  );
}

function Characters() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="Your Characters"
        component={YourCharactersPage}
      ></Stack.Screen>
      <Stack.Screen name="Character" component={CharacterPage}></Stack.Screen>
      <Stack.Screen name="CharSpell" component={SpellPage}></Stack.Screen>
      <Stack.Screen
        name="Add Character"
        component={AddCharacterPage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function Settings() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsPage}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  let [fontsLoaded, error] = useFonts({
    "BreatheFireIii-PKLOB": require("../../assets/fonts/BreatheFireIii-PKLOB.ttf"),
    "Draconis-JRw6B": require("../../assets/fonts/Draconis-JRw6B.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={Theme}>
      <MenuTab.Navigator
        style={{
          overflow: "hidden",
        }}
        screenOptions={{
          headerShown: false,
          footerShown: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#373C48",
            borderRadius: 25,
            overflow: "hidden",
            marginTop: -90,
            height: 70,
            width: "100%",
            alignSelf: "center",
          },
        }}
      >
        <MenuTab.Screen
          name="Spells"
          component={Spells}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={
                  focused
                    ? [
                        styles.selectedTab,
                        { backgroundColor: COLORS.back_light },
                      ]
                    : styles.unselectedTab
                }
              >
                <FontAwesome
                  name={"search"}
                  size={focused ? 35 : 30}
                  color={
                    focused ? COLORS.primary_content : COLORS.secondary_content
                  }
                />
              </View>
            ),
          }}
        />
        <MenuTab.Screen
          name="Characters"
          component={Characters}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={
                  focused
                    ? [
                        styles.selectedTab,
                        { backgroundColor: COLORS.back_light },
                      ]
                    : styles.unselectedTab
                }
              >
                <FontAwesome
                  name={"user"}
                  size={focused ? 35 : 30}
                  color={
                    focused ? COLORS.primary_content : COLORS.secondary_content
                  }
                />
              </View>
            ),
          }}
        />
        <MenuTab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={
                  focused
                    ? [
                        styles.selectedTab,
                        { backgroundColor: COLORS.back_light },
                      ]
                    : styles.unselectedTab
                }
              >
                <FontAwesome
                  name={"cog"}
                  size={focused ? 35 : 30}
                  color={
                    focused ? COLORS.primary_content : COLORS.secondary_content
                  }
                />
              </View>
            ),
          }}
        />
      </MenuTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  selectedTab: {
    borderRadius: 1000,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    top: 15,
  },
  unselectedTab: {
    top: 15,
  },
});
