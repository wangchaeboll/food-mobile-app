import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Slot} from "expo-router";

export default function _Layout() {
    return (
        <SafeAreaView>
            <Text>Layout</Text>
            <Slot/>
        </SafeAreaView>
    )
}
