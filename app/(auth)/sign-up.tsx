import {View, Text, Button, Alert} from 'react-native'
import React from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/libs/appwrite";

const SignUp = () => {
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [form, setForm] = React.useState({name: "" ,email: "", password: ""})

    const isFormValid = () => {
        return form.name.trim() && form.email.trim() && form.password.trim();

    }
    const onSubmit = async () => {
        if(!isFormValid()) {
            return Alert.alert('Error', 'Please enter valid email address and password')
        }

        setIsSubmit(true);

        try {
            await createUser({
                email: form.email,
                password: form.password,
                name: form.name,
            })
            Alert.alert('Success', 'You have successfully signed in')
            router.replace("/")
        } catch (e) {
            Alert.alert('Error', 'Something went wrong (here)')
        } finally {
            setIsSubmit(false)
        }
    }

    return (
        <View className={"bg-white gap-10 rounded-lg p-5 mt-5"}>
            <CustomInput
                placeholder={"Enter your Name"}
                value={form.name}
                onChangeText={(text) => {
                    setForm((prev) => ({
                        ...prev,
                        name: text
                    }))
                }}
                label={"Username"}
            />
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
            <CustomButton title={"Sign Up"} isLoading={isSubmit} onPress={onSubmit}/>
            <View className={"flex mt-5 justify-center flex-row gap-2"}>
                <Text className={"text-gray-100 base-regular"}>Already have an account? </Text>
                <Link href={"/sign-in"} className={"base-bold text-primary"}>Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
