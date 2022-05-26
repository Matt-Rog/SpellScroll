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
import SearchPage from './Search';
import SpellPage from './Spell';
import CharactersPage from './Characters';


function LocalSearch({navigation}){

  const onResultPress = () => {
    navigation.navigate("Spell Information")
  }

  return(
    <SearchPage 
      onResultPress={onResultPress}>
    </SearchPage>
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

function LocalCharacters({navigation}){

  const onBack = () => {
    navigation.goBack();
  }

  return(
    <CharactersPage>

    </CharactersPage>
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
        component={LocalSearch}>        
      </Stack.Screen>
      <Stack.Screen
        name="Spell Information"
        component={LocalSpell}>
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
        component={LocalCharacters}>

        </MenuTab.Screen>
      </MenuTab.Navigator>
    </NavigationContainer>

  );
}




const styles = StyleSheet.create({
});
