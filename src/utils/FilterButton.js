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


const FilterButton = (props) => {


    const options = props.options
    const [selected, setSelected] = useState((props.selected.length==options.length ? [] : props.selected)) 

    function onButtonPress(item){
      console.log(" ")
      console.log("SELECTEDvv")
      console.log(item)
      if(!selected.includes(item)){
        var joined = selected.concat(item);
        setSelected(joined)
        if(joined.length>0){
          props.setFilterProp({name: props.name, selected: joined})
        }} 
        else {
        var removed = selected.filter(i => i !== item)
        setSelected(removed)
        if(removed.length>0){
          props.setFilterProp({name: props.name, selected: removed})
        }} 
    }

    return (
        <View style={styles.resultBox}>
            <View style={styles.heading}>
              <Text style={styles.spellTXT}>{props.name}</Text>
            </View>
            <View style={styles.content}>
              <FlatList
                data={options}
                horizontal={true}
                renderItem={({item}) => {
                  return (
                    <View>
                      <Pressable
                        onPress={() => onButtonPress(item)}
                        style={[{backgroundColor: (selected.includes(item))? '#4CBBE9' : '#CCD2E3'}, styles.button]}>
                        <Text style={[{color: (selected.includes(item))? '#373C48' : '#373C48'}, styles.option]}>{item}</Text>
                      </Pressable>
                    </View>
                  )
                }}>
              </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    nullTXT: {
      color: "#4CBBE9",
      fontSize: 14,
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 9
    },
    option: {
      fontSize: 15,
      fontWeight: "bold",
      marginLeft: 13,
      marginRight: 13
    },
    button: {
      margin: 15,
      borderRadius: 50,
      padding: 3
    },
    content: {
      alignItems: "center"
    }
  });

  export default FilterButton;