import { StyleSheet } from "react-native";
// Utility
import {COLORS} from './Colors.js'


export default StyleSheet.create({
    Background: {
        backgroundColor: COLORS.back_dark,
        height: '100%',
        width: "100%"
    },
    Container: {
        width: "88%",
        alignSelf: "center",
        justifyContent: "center",
    },
    Modal: {
        backgroundColor: COLORS.back,
        borderRadius: 15,
        padding: 20
    },
    Header1: {
        color: COLORS.primary_content,
        fontSize: 40,
        fontWeight: "bold"
    },
    Header2: {
        color: COLORS.primary_content,
        fontSize: 30,
        fontWeight: "bold"
    },
    Header3: {
        color: COLORS.primary_content,
        fontSize: 21,
        fontWeight: "bold"
    },
    Header4: {
        color: COLORS.primary_content,
        fontSize: 18,
        fontWeight: "bold"
    },
    ContentBody: {
        fontSize: 18,
        color: COLORS.secondary_content
    },
    PrimaryButton: {
        color: COLORS.primary_content,
        borderRadius: 15, 
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: COLORS.primary_accent
    },
    SecondaryButton: {
        color: COLORS.secondary_content,
        borderColor: COLORS.secondary_content,
        borderWidth: 3,
        borderRadius: 15, 
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    TertiaryButton: {
        color: COLORS.primary_content,
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    Tags: {
        backgroundColor: COLORS.back_light,
        color: COLORS.secondary_content,
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 3,
        alignSelf: "baseline"
    },
    Input: {
        borderWidth: 1,
        backgroundColor: COLORS.back,
        borderColor: COLORS.back,
        color: COLORS.secondary_content,
        borderRadius: 12,
        fontSize: 15,
        paddingLeft: 17,
        width: "80%",
        height: 40
    },
    Removable: {
        borderWidth: 3,
        borderColor: COLORS.primary_accent,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginHorizontal: 5, 
        marginVertical: 3,
        alignSelf: "baseline"
    }



})