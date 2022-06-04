import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    ScrollView
    
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FilterList from '../../utils/FilterList'
import FilterButton from '../../utils/FilterButton'
import FilterSlider from '../../utils/FilterSlider';


export default function FilterPage({navigation, route}) {

    const onBackPress = () => {
        navigation.navigate("Search Spells")
    }

    const [scrollEnabled,setScrollEnabled] = useState(true)

    return (
        <SafeAreaView style={styles.base}> 
          <Text style={styles.title}>Filter Spells</Text>
          <ScrollView
            scrollEnabled={scrollEnabled}
          >
            {/* Class */}
            <FilterList
                name="Class"
                optionName="Classes"
                options={["Artificer", "Bard", "Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"]}
            ></FilterList>

            {/* Level */}
            <FilterSlider
              name="Level"
              options={[0,9]}
              setScrollEnabled={() => setScrollEnabled()}
            ></FilterSlider>

            {/* Components */}
            <FilterButton
              name="Components"
              options={["Material", "Somatic", "Verbal"]}
            ></FilterButton>

            {/* Casting Time */}
            <FilterList
                name="Casting Time"
                optionName="Casting Times"
                options={["1 Action", "1 Bonus Action", "1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"]}
            ></FilterList>

            {/* Casting Range */}
            <FilterList
                name="Casting Range"
                optionName="Casting Ranges"
                options={["1 Action", "1 Bonus Action", "1 Reaction", "1 Minute", "10 Minutes", "1 Hour", "8 Hours", "12 Hours", "24 Hours"]}
            ></FilterList>

            
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    base: {
      backgroundColor: "#181D23",
      height: '100%',
      width: "100%"
    },
    title: {
      color: "#FFFFFF",
      fontSize: 30,
      padding: 10,
      fontWeight: "bold"
    },
    resultBox: {
      marginBottom: 8,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      backgroundColor: "#373C48"
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "bold",
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 9
    }
  });