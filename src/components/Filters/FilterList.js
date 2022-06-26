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
// Utility
import { COLORS } from '../../utils/Colors';
import AppStyles from '../../utils/AppStyles';
// Components
import {ModalList} from '../ModalList'
import RemovableList from '../RemovableList';


const FilterList = (props) => {

    const options = props.options

    const [selected, setSelected] = useState(((props.selected==undefined || props.selected.length==options.length) ? [] : props.selected)) 
    const [isModalVisible, setIsModalVisible] = useState(false)


    const changeModalVisibility = (bool) => {
      setIsModalVisible(bool)
    }

    function onPlusPress(){
      changeModalVisibility(true)

    }

    function onXPress(item){
      console.log("X PRESS")
      if(selected.includes(item)){
        console.log("X PRESS INCLUDES")
        var removed = selected.filter(i => i !== item)
        setSelected(removed)
      }
      console.log("X PRESS REMOVED")
      console.log(removed)
      setFilterProp(removed)
    }

    function applySelection(selection){
      setFilterProp(selection)
      setSelected(selection)
      
    }

    function setFilterProp(selection){
      if(selection.length>0){
        props.setFilterProp({name: props.name, selected: selection})
      } else {
        props.removeFilterProp({name: props.name})
      }
    }

    return (

        <View style={styles.resultBox}>
            <Pressable 
              onPress={() => onPlusPress()}
              style={styles.heading}>
              <Text style={AppStyles.Header4}>{props.name}</Text>
              <View style={{flexDirection:"row", alignItems: "center"}}>
                    <FontAwesome
                    name={"plus-square"}
                    size={23}
                    color={COLORS.content}
                    />
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
                    applySelection={(selected) => applySelection(selected)}
                  >
                  </ModalList>
              </Modal>
            </Pressable>
            <View style={[styles.content]}>
              <RemovableList
                selected={selected}
                setSelected={() => setSelected(selection)}
                onXPress={(item) => onXPress(item)}>

              </RemovableList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    resultBox: {
      marginBottom: 10,
      marginTop: 8,
      borderRadius: 12,
      backgroundColor: COLORS.back,
      paddingBottom: 8,
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 12,
    },
    content: {
      marginLeft: 9
    }
  });

  export default FilterList;