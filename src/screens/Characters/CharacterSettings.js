import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList,
    Modal
} from 'react-native'
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AppStyles from '../../utils/AppStyles';
import Images from '../../utils/Images';

import { ModalBase } from '../../utils/ModalBase';
import Splash from '../../utils/Splash';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const CharacterSettings = (props) => {

    

    const navigation = props.navigation
    const charID = props.charID

    function onEditCharacter(){
        changeModalVisibility(false)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAR ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(charID)
        navigation.navigate("Add Character", {edit: true, charID: charID})
    }

    function onDeleteCharacter(){
        changeDeleteModalVisibility(true)
    }

    function deleteCharacter(){
        props.deleteCharacter(charID)
        navigation.navigate("Your Characters")
        changeModalVisibility(false)
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
        props.changeModalVisibility(bool)
    }
    const changeDeleteModalVisibility = (bool) => {
        setIsDeleteModalVisible(bool)
      }

    return (
        <View>
            {/* Settings */}
            <ModalBase
                changeModalVisibility={changeModalVisibility}
                header={true}
                title={"Settings"}
                component={
                    <View style={{marginVertical: 10}}>
                    <Pressable
                        onPress={() => onEditCharacter()}
                        style={[AppStyles.PrimaryButton, {backgroundColor: "#545A67",flexDirection: "row"}]}>
                        <FontAwesome
                            name={"pencil"}
                            size={25}
                            color={"#fff"}
                            />
                        <Text style={[{marginLeft: 15},AppStyles.Header3]}>Edit Character</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => onDeleteCharacter()}
                        style={[AppStyles.SecondaryButton, {borderColor: "#E94C4C",flexDirection: "row", marginTop: 15}]}>
                        <FontAwesome
                            name={"trash"}
                            size={25}
                            color={"#fff"}
                            />
                        <Text style={[{marginLeft: 15},AppStyles.Header3]}>Delete Character</Text>
                    </Pressable>
                    </View>
                }
                >
            </ModalBase>

            {/* Delete */}
            <Modal
                transparent={true}
                animationType='fade'
                visible={isDeleteModalVisible}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                nRequestClose={() => changeDeleteModalVisibility(false)}>
                    <ModalBase
                    changeModalVisibility={changeDeleteModalVisibility}
                    header={false}
                    title={"Settings"}
                    component={
                        <View>
                        <Splash
                            hide={false}
                            image={"red"}
                            title={"Are you sure?"}
                            body={"Your character will be permanently deleted"}
                            component={
                            <View style={{flexDirection: "row", marginTop: 20}}>
                                <Pressable 
                                onPress={() => changeDeleteModalVisibility(false)}
                                style={AppStyles.TertiaryButton}>
                                <Text style={AppStyles.Header4}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                onPress={() => deleteCharacter()}
                                style={[AppStyles.SecondaryButton, {borderColor: "#E94C4C"}]}>
                                <Text style={AppStyles.Header4}>Delete</Text>
                                </Pressable>
                            </View>
                            }></Splash>
                        </View>
                    }
                    >
                </ModalBase>
            </Modal>
        </View>
    )
}


export default CharacterSettings