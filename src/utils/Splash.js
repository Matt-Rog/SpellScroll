import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    Pressable,
    FlatList
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import AppStyles from './AppStyles';
import Images from './Images';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Splash = (props) => {

    const hide = props.hide

    const [image, setImage] = useState(props.image!=undefined ? props.image : "default")

    if(hide){
        return null
    }
    return (
        <View style={styles.splash}>
            <Image
                style={styles.splashIMG}
                source={Images.splash[image]}
                resizeMode="contain">
            </Image>
            <Text style={AppStyles.Header2}>{props.title}</Text>
            <Text style={[AppStyles.ContentBody, {marginTop: 5, maxWidth: "70%", textAlign: "center"}]}>{props.body}</Text>
            {props.component}
        </View>
    )

}

const styles = StyleSheet.create({
    splash: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0//HEIGHT/20
    },
    oopsTXT: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#CCD2E3"
    },
    tryTXT: {
    fontSize: 15,
      color: "#CCD2E3",
      marginTop: 10
    },
    splashIMG: {
        height: 200,
        margin: 15
    }
})

export default Splash