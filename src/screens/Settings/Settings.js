import {
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    Pressable,
    View,
    
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Utility
import * as THEME from '../../utils/Theme'

var [COLORS, STYLES] = [THEME.DarkTheme, THEME.getStyles(THEME.DarkTheme)]
THEME.getTheme().then(
    theme => {
        COLORS = theme.COLORS
        STYLES = theme.STYLES
    }
)

export default function SettingsPage({navigation, route}) {
    
    useEffect(() => {
        const loadData = navigation.addListener('focus', () => {
          getData()
        })
        return loadData;
      }, [navigation]);
  
      const getData = async () => {
        try {
          const stringValue = await AsyncStorage.getItem('theme')
          const jsonValue = JSON.parse(stringValue)
          if (!jsonValue) return
          setSelected(jsonValue)
          console.log("THEME FROM GET DATA")
          console.log(jsonValue)
        
        } catch(e) {
          console.log("Error getting theme data")
          console.log(e)
        }
      }
  
      const updateData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('theme', jsonValue)
        } catch (e) {I
          console.log("Error updating theme")
          console.log(e)
        }
      }

    const [selected, setSelected] = useState("Dark")

    function changeTheme(item){
        setSelected(item)
        updateData(item)
    }

    return (
        <SafeAreaView style={STYLES.Background}>
            <View style={STYLES.Container}>
                <Text style={STYLES.Header1}>Settings</Text>
                <Text style={STYLES.Header3}>Appearance</Text>
                <FlatList
                    horizontal={true}
                    data={["Light", "Dark", "High Contrast"]}
                    renderItem={({item}) => (
                        <Pressable
                            onPress={() => changeTheme(item)}
                            style={{padding: 10, backgroundColor: (item==selected ? COLORS.primary_accent : COLORS.back), margin: 5}}>
                            <Text style={STYLES.Header4}>{item}</Text>
                        </Pressable>
                    )}>

                </FlatList>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  });