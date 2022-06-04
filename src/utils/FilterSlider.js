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
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderCustomLabel from "../utils/SliderLabel";


const FilterSlider = (props) => {

    const options = props.options

    const enableScroll = () => props.setScrollEnabled(true);
    const disableScroll = () => props.setScrollEnabled(false);

    const [min, setMin] = useState(options[0])
    const [max,setMax] = useState(options[1])

    const [selected, setSelected] = useState(options) 

    function onButtonPress(item){
      console.log(item)
      if(!selected.includes(item)){
        var joined = selected.concat(item);
        setSelected(joined)
      } else {
        var removed = selected.filter(i => i !== item)
        setSelected(removed)
      }
    }

    const textTransformerTimes = (value) => {
        return value === 0
          ? "Cantrip"
          : "Lvl " + value;
      };

    return (
        <View style={styles.resultBox}>
            <View style={styles.heading}>
              <Text style={styles.spellTXT}>{props.name}</Text>
            </View>
            <View style={styles.content}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                </View>
              <MultiSlider
                values={options}
                enableLabel={true}
                showSteps={true}
                smoothSnapped={true}
                allowOverlap={true}
                
                selectedStyle={{
                    height: 3,
                    backgroundColor: '#4CBBE9'
                }}
                markerStyle={{
                    height: 35,
                    width: 35,
                    borderColor: "#373C48",
                    borderWidth: 7
                }}
                touchDimensions={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    slipDisplacement: 200
                }}
                customLabel={SliderCustomLabel(textTransformerTimes)}
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    resultBox: {
      marginBottom: 10,
      marginTop: 10,
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
      marginLeft: 13,
      marginRight: 13
    },
    button: {
      margin: 15,
      borderRadius: 50,
      backgroundColor: "#373C48",
      borderWidth: "1",
      padding: 3
    },
    content: {
      alignItems: "center",
      marginTop: 20
    }
  });

export default FilterSlider
