import { StyleSheet } from "react-native";


var back_dark = "#181D23"
var back = "#373C48"
var back_light = "#545A67"

var primary_content = "#FFFFFF"
var secondary_content = "#CCD2E3"

var primary_accent = "#4CBBE9"


export default StyleSheet.create({
    Background: {
        backgroundColor: back_dark,
        height: '100%',
        width: "100%"
    },
    Container: {
        width: "85%",
        alignSelf: "center",
        justifyContent: "center"
    },
    Modal: {
        backgroundColor: back,
        borderRadius: 15,
        padding: 20
    },
    Header1: {
        color: primary_content,
        fontSize: 30,
        fontWeight: "bold"
    },
    Header2: {
        color: primary_content,
        fontSize: 21,
        fontWeight: "bold"
    },
    Header3: {
        color: primary_content,
        fontSize: 18,
        fontWeight: "bold"
    },
    ContentBody: {
        fontSize: 15,
        color: secondary_content
    },
    PrimaryButton: {
        color: primary_content,
        borderRadius: 15, 
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: primary_accent
    },
    SecondaryButton: {
        color: primary_content,
        borderColor: primary_content,
        borderWidth: 3,
        borderRadius: 15, 
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    TertiaryButton: {
        color: primary_content,
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    Tags: {
        backgroundColor: back_light,
        color: secondary_content,
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 3
    },
    Input: {
        borderWidth: 1,
        backgroundColor: back,
        borderColor: back,
        color: secondary_content,
        borderRadius: 12,
        fontSize: 15,
        paddingLeft: 17,
        width: "80%",
        height: 40
    },
    Removable: {
        borderWidth: 3,
        borderColor: primary_accent,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginHorizontal: 5, 
        marginVertical: 3,
    }



})