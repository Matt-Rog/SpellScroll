import { 
  Text,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MOCKDATA from "../../MOCK_SPELL_DATA.json"
// Screens
import SearchPage from '../screens/Spells/Search';
import SpellPage from '../screens/Spells/Spell';
import FilterPage from '../screens/Spells/Filter';
import YourCharactersPage from '../screens/Characters/YourCharacters';
import CharacterPage from '../screens/Characters/Character';
import AddCharacterPage from '../screens/Characters/AddCharacter';
import { COLORS } from './Colors';

const Stack = createStackNavigator();
const MenuTab = createBottomTabNavigator()
const WIDTH = Dimensions.get('window').width
const Theme = {
  dark: true,
  colors: {
    primary: 'rgb(28, 255, 30, 0)',
    background: 'rgb(28, 255, 30, 0)',
    card: 'rgb(28, 255, 30, 0)',
    text: 'rgb(28, 255, 30, 0)',
    border: 'rgb(28, 255, 30, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};

function Spells() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name="Search Spells"
        component={SearchPage}
        initialParams={{INITDATA: MOCKDATA}}>        
      </Stack.Screen>
      <Stack.Screen
        name="Filter Spells"
        component={FilterPage}>        
      </Stack.Screen>
      <Stack.Screen
        name="Spell"
        component={SpellPage}>
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function Characters() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name="Your Characters"
        component={YourCharactersPage}>        
      </Stack.Screen>
      <Stack.Screen
        name="Character"
        component={CharacterPage}>
      </Stack.Screen>
      <Stack.Screen
        name="CharSpell"
        component={SpellPage}>
      </Stack.Screen>
      <Stack.Screen
        name="Add Character"
        component={AddCharacterPage}>        
      </Stack.Screen>
    </Stack.Navigator>
  )
}



export default function App() {

  return (
    <NavigationContainer
      theme={Theme}>
      <MenuTab.Navigator
        style={{
          overflow: 'hidden'
        }}
        screenOptions={{
          headerShown: false,
          footerShown: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: COLORS.back,
            borderRadius: 25,
            overflow: 'hidden',
            marginTop: -40,
          },
        }}
      >
        <MenuTab.Screen name="Spells" component={Spells} options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.selectedTab : styles.unselectedTab}>
              <FontAwesome
                name={"search"}
                size={focused ? 35 : 30}
                color={focused ? COLORS.primary_content : COLORS.secondary_content}/>
            </View>
          )
        }}
          />
        <MenuTab.Screen name="Characters" component={Characters} options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.selectedTab : styles.unselectedTab}>
              <FontAwesome
                name={"user"}
                size={focused ? 35 : 30}
                color={focused ? COLORS.primary_content : COLORS.secondary_content}/>
            </View>
          )
        }}
          />
      </MenuTab.Navigator>
    </NavigationContainer>

  );
}




const styles = StyleSheet.create({
  selectedTab: {
    borderRadius: 50, 
    backgroundColor: COLORS.back_light, 
    width: 100, 
    height: 100, 
    justifyContent: "center", 
    alignItems: "center", 
    top: 15
  },
  unselectedTab: {
    top: 15
  }
});
