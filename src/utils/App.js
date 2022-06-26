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
import MOCKDATA from "../../MOCK_SPELL_DATA.json"
// Screens
import SearchPage from '../screens/Spells/Search';
import SpellPage from '../screens/Spells/Spell';
import FilterPage from '../screens/Spells/Filter';
import YourCharactersPage from '../screens/Characters/YourCharacters';
import CharacterPage from '../screens/Characters/Character';
import AddCharacterPage from '../screens/Characters/AddCharacter';

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
const MenuTab = createMaterialBottomTabNavigator()

function Spells() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        tabBarShowLabel: false
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
    <NavigationContainer>
      <MenuTab.Navigator
        screenOptions={({route})=> ({
          tabBarShowLabel: false,
          showLabel: false,
          tabBarLabel: "",
          tabBarStyle: {
            borderRadius: 15,
            padding: 15,
            height: 200
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if(route.name=="Spells"){
              iconName="search"
              size = focused? 25 : 23;
              color = focused? "#FFF" : "#CCD2E3"
            }else if(route.name=="Characters"){
              iconName="user"
              size = focused? 25 : 23;
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
