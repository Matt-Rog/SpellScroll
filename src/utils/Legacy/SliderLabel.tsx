import {
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Pressable,
    View,
    Modal
    
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const width = 50;

function LabelBase(props)
{
    const { position, value } = props;

    return (
        <View
            style={[
                styles.sliderLabel, // this one is position absolute
                {
                    left: position - width / 2,
                },
            ]}>
            <Text style={styles.sliderLabelText}>{value}</Text>
        </View>
    );
}

export default function SliderCustomLabel(textTransformer: (value: number) => string)
{
    return function (props)
    {
       // these props are coming from the package
        const {
            oneMarkerValue,
            twoMarkerValue,
            oneMarkerLeftPosition,
            twoMarkerLeftPosition,
        } = props;

        return (
            <View>
                <LabelBase
                    position={oneMarkerLeftPosition}
                    value={textTransformer(oneMarkerValue)}
                />
                {twoMarkerValue ? 
                    <LabelBase
                        position={twoMarkerLeftPosition}
                        value={textTransformer(twoMarkerValue)}
                    /> : null
                }
            </View>
        );
    };
}

const styles = StyleSheet.create({
    sliderLabel: {
        position: 'absolute',
        justifyContent: 'center',
        bottom: 0,
        width: 55
    },
    sliderLabelText: {
        textAlign: 'center',
        color: "#CCD2E3",
        flex: 1,
        fontSize: 14,
        fontWeight: "bold"
    },
});