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
// Utility
import AppStyles from '../../utils/AppStyles';
import {COLORS} from '../../utils/Colors'


export default function SettingsPage({navigation, route}) {



    return (
        <SafeAreaView style={AppStyles.Background}>
            <View style={AppStyles.Container}>
                <Text style={AppStyles.Header1}>Settings</Text>
            </View>
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
  });