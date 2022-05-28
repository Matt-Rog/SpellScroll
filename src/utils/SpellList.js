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
import {
    ListItem,
    Thumbnail,
    Left,
    Right,
    Body,
    Content
} from 'native-base';




const SpellList = (props) => {


    function schoolHexCode({item}) {
      var school = item.school.toLowerCase()
      if(school==="evocation"){
        return "#E94C4C"
      } else if(school==="abjuration"){
        return "#4CBBE9"
      } else if(school==="enchantment"){
      return "#E94CE0"
      } else if(school==="conjuration"){
        return "#E9A14C"
      } else if(school==="necromancy"){
        return "#7CE94C"
      }
      return "#373C48"
    }

    function levelLogic({item}){
      if(item.level == 0){
        return "    Cantrip"
      }
      return "    Lv." + `${item.level}`
    }

    return (
            <FlatList
              data={props.spellData}
              renderItem={({item}) => (
                <Pressable 
                  onPress={() => props.navigation.navigate("Spell", {id: item.ID})}
                  style={({pressed}) => [{backgroundColor: pressed? '#565C6B' : '#373C48'}, styles.resultBox]}
                  android_ripple={{color:'#4C515B'}}>
              
                  <View style={[{backgroundColor: schoolHexCode({item})},styles.schoolBar]}>
                    <Image 
                    style={styles.icon}
                    source={require('../../assets/evocation.png')}
                    resizeMode="stretch">
                    </Image>
                  </View>
                  <View>
                    <View style={{flexDirection: "row"}}>
                      <Text style={styles.spellTXT}>{item.name}</Text>
                      <Text style={[{marginRight: "auto"},styles.spellTXT]}>{levelLogic({item})}</Text>
                    </View>
                    <Text style={styles.schoolTXT}>{item.school}</Text>
                  </View>
                </Pressable>
              )}
            />
    );
}

const styles = StyleSheet.create({
    resultBox: {
      marginBottom: 8,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      flexDirection:'row'
    },
    spellTXT: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "bold",
      marginLeft: 9,
      marginTop: 9,
    },
    schoolTXT:{
      color: "#CCD2E3",
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 9,
      marginTop: 3,
      marginBottom: 9
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
    },
    schoolBar:{
      "borderBottomLeftRadius": 12,
      "borderTopLeftRadius": 12,
      alignItems: "center",
      justifyContent: "center",
      height: 70,
      width: 40
    }
  });

export default SpellList;