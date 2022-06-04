import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Modal,
    ScrollView
    
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {ModalList} from '../utils/ModalList'


const FilterList = (props) => {

    const options = props.options

    const [selected, setSelected] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }

    function onPlusPress(){
      changeModalVisibility(true)

    }

    function applySelection(selection){
      setSelected(selection)
    }

    function onXPress(item){
      if(selected.includes(item)){
        var removed = selected.filter(i => i !== item)
        setSelected(removed)
      }
    }

    return (

        <View style={styles.resultBox}>
            <View style={styles.heading}>
              <Text style={styles.spellTXT}>{props.name}</Text>
              <View style={{flexDirection:"row", alignItems: "center"}}>
                <Text style={[{marginRight: 25},styles.nullTXT]}>{(selected.length === 0) ? "0 items selected" : ""}</Text>
                <Pressable
                  onPress={() => onPlusPress()}>
                    <FontAwesome
                    name={"plus-circle"}
                    size={27}
                    color={"#fff"}
                    />
                </Pressable>
              </View>
              <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                nRequestClose={() => changeModalVisibility(false)}>
                  <ModalList
                    name={props.optionName}
                    changeModalVisibility={changeModalVisibility}
                    options={options}
                    selected={selected}
                    applySelection={applySelection}
                  >
                  </ModalList>
              </Modal>
            </View>
            <View style={styles.content}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 0 }}>
              
                <FlatList
                  scrollEnabled={false}
                  data={selected}
                  numColumns={3}
                  renderItem={({item}) => {
                    return (
                      <View style={[{borderColor: (selected.includes(item))? '#4CBBE9' : '#CCD2E3'}, styles.button]}>
                        <Pressable
                          onPress={() => onXPress(item)}>
                          <FontAwesome
                          name={"times-circle"}
                          size={22}
                          color={"#4CBBE9"}
                          style={styles.xicon}
                          />
                        </Pressable>
                        <Text style={[{color: (selected.includes(item))? '#4CBBE9' : '#CCD2E3'}, styles.option]}>{item}</Text>
                      </View>
                    )
                  }}>
                </FlatList>
              </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    resultBox: {
      marginBottom: 10,
      marginTop: 8,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 12,
      backgroundColor: "#373C48",
      paddingBottom: 8,
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
      marginLeft: 6,
      marginRight: 13,
    },
    button: {
      margin: 7,
      borderRadius: 50,
      backgroundColor: "#373C48",
      borderWidth: "1",
      flexDirection: "row",
      padding: 3,
      alignItems: "center"
    },
    xicon: {
      marginLeft: 9
    },
    content: {
      paddingLeft: 8
    }
  });

  export default FilterList;