import {View, Text, Button, Alert} from 'react-native'
import React from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/libs/appwrite";

const SignIn = () => {
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [form, setForm] = React.useState({email: "", password: ""})

    const isFormValid = (email:string , password:string) => {
        return email.trim() && password.trim();

    }

    const onSubmit = async () => {
        const { email, password} = form
        if(!isFormValid(email, password)) {
            return Alert.alert('Error', 'Please enter valid email address and password')
        }

        setIsSubmit(true);

        try {
            await signIn({email,password})
            Alert.alert('Success', 'You have successfully signed in')
            router.replace("/(tabs)")
        } catch (e) {
            Alert.alert('Error', 'Something went wrong')
        } finally {
            setIsSubmit(false)
        }
    }

    return (
        <View className={"bg-white gap-10 rounded-lg p-5 mt-5"}>
            <CustomInput
                placeholder={"Enter your Email"}
                value={form.email}
                onChangeText={(text) => {
                    setForm((prev) => ({
                        ...prev,
                        email: text
                    }))
                }}
                label={"Email"}
                keyboardType={"email-address"}
            />
            <CustomInput
                placeholder={"Enter your Email"}
                value={form.password}
                onChangeText={(text) => {
                    setForm((prev) => ({
                        ...prev,
                        password: text
                    }))
                }}
                label={"Password"}
                keyboardType={"email-address"}
                secureTextEntry={true}
            />
            <CustomButton title={"Sign In"} isLoading={isSubmit} onPress={onSubmit}/>
            <View className={"flex mt-5 justify-center flex-row gap-2"}>
                <Text className={"text-gray-100 base-regular"}>Don't have an account? </Text>
                <Link href={"/sign-up"} className={"base-bold text-primary"}>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
