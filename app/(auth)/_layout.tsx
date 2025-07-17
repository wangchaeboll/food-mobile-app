import {View, Text, Image, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import useAuthStore from "@/store/auth.store";

export default function _Layout() {
    const { isAuthenticated } = useAuthStore()

    if(isAuthenticated) return <Redirect href={'/'}/>

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView className={"bg-white h-full"} keyboardShouldPersistTaps={"handled"}>
                <View className={"w-full relative"} style={{height: Dimensions.get("screen").height/2.25}}>
                    <ImageBackground resizeMode={"stretch"} source={images.loginGraphic} className={"size-full rounded-b-lg"}/>
                    <Image source={images.logo} className={"absolute -bottom-16 size-48 self-center"} resizeMode={"contain"}/>
                </View>
                <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
