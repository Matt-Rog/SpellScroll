import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Image,
    
} from 'react-native';
import React, {useState} from 'react';

const SpellList = (props) => {

    const [Results, setResults] = useState([
      {key: '1', spellName: 'Lorem Ipsum1', level: '1', school: 'School1'},
      {key: '2', spellName: 'Lorem Ipsum2', level: '2', school: 'School2'},
      {key: '3', spellName: 'Lorem Ipsum3', level: '3', school: 'School3'},
    ])

    return (
            <FlatList
              data={Results}
              renderItem={({item}) => (
                <Pressable 
                  onPress={props.onResultPress}
                  style={({pressed}) => [{backgroundColor: pressed? '#565C6B' : '#373C48'}, styles.resultBox]}
                  android_ripple={{color:'#4C515B'}}>
                  
                  <View style={styles.schoolBar}>
                    <Image 
                    style={styles.icon}
                    source={require('../../assets/evocation.png')}
                    resizeMode="stretch">
                    </Image>
                  </View>
                  <Text style={styles.spellTXT}>{item.spellName}</Text>
                  <Text style={styles.schoolTXT}>{item.school}</Text>
                </Pressable>
              )}
            />
    );
}

const styles = StyleSheet.create({
    resultBox: {
      margin: 8,
      borderRadius: 12,
      padding: 10,
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
    },
    input:{
      borderWidth: 1,
      backgroundColor: "#373C48",
      borderColor: "#373C48",
      width: "50%",
      borderRadius: 12,
      fontSize: 15,
      padding: 5,

    },
    icon: {
      width: 36,
      "height": 36,
      "backgroundColor": "#4CBBE9",
      "borderBottomLeftRadius": 12,
      "borderTopLeftRadius": 12,
    }
  });

export default SpellList;