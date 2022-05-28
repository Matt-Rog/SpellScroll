import { StatusBar } from 'expo-status-bar';
import { 
  Text,
  StyleSheet,
  View
} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SearchPage from '../screens/Spells/Search';
import SpellPage from '../screens/Spells/Spell';
import YourCharactersPage from '../screens/Characters/YourCharacters';
import CharacterPage from '../screens/Characters/Character';
import FilterPage from '../screens/Spells/Filter';

function LocalSearch({navigation}){

  const onResultPress = () => {
    navigation.navigate("Spell")
  }

  const onFilterPress = () => {
    navigation.navigate("Filter Spells")
  }

  return(
    <SearchPage 
      onResultPress={onResultPress}
      onFilterPress={onFilterPress}>
    </SearchPage>
  )
}

function LocalFilter({navigation}){

  const onBackPress = () => {
    navigation.navigate("Search Spells")
  }

  return(
    <FilterPage>

    </FilterPage>
  )
}

function LocalSpell({navigation}){

  const onBack = () => {
    navigation.goBack();
  }

  return(
    <SpellPage>

    </SpellPage>
  )
}

function LocalYourCharacters({navigation}){

  const onResultPress = () => {
    navigation.navigate("Character")
  }

  return(
    <CharactersPage 
      onResultPress={onResultPress}>
    </CharactersPage>
  )
}
function LocalCharacter({navigation}){

  const onBack = () => {
    navigation.goBack();
  }
  const onResultPress = () => {
    navigation.navigate("CharSpell")
  }

  return(
    <CharacterPage
      onResultPress={onResultPress}>
    </CharacterPage>
  )
}

const Stack = createStackNavigator();
const MenuTab = createMaterialBottomTabNavigator();

function Spells() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}>
      <Stack.Screen
        name="Search Spells"
        component={SearchPage}>        
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
        header: () => null
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
    </Stack.Navigator>
  )
}



export default function App() {

  return (
    <NavigationContainer>
      <MenuTab.Navigator
      screenOptions={({route})=> ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if(route.name=="Spells"){
            iconName="search"
            size = focused? 25 : 20;
            color = focused? "#FFF" : "#CCD2E3"
          }else if(route.name==="Characters"){
            iconName="group"
            size = focused? 25 : 20;
            color = focused? "#FFF" : "#CCD2E3"
          }
          return(
            <FontAwesome
              name={iconName}
              size={size}
              color={color}
              />
          )
        }
      })}
        tabBarOptions={{
          inactiveBackgroundColor: "#373C48",
          activeBackgroundColor: "#565C6B",
          showLabel: false,
          labelStyle: {margin: 3}
        }}
        barStyle={{backgroundColor: "#373C48"}}>
        <MenuTab.Screen
          name="Spells"
          component={Spells}>
        </MenuTab.Screen>
        <MenuTab.Screen
        name="Characters"
        component={Characters}>

        </MenuTab.Screen>
      </MenuTab.Navigator>
    </NavigationContainer>

  );
}




const styles = StyleSheet.create({
});
