import {View, Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {images} from "@/constants";

const SearchBar = () => {
    const params = useLocalSearchParams<{ query?: string}>()
    const [ query, setQuery ] = React.useState(params.query)

    const handleSearch = (text: string) => {
        setQuery(text)

        if (!text) router.setParams({ query: undefined })
    }

    const handleSumbit = () => {
        if(query?.trim()) router.setParams({ query })
    }

    return (
        <View className={"searchbar"}>
            <TextInput className={"flex-1 p-5"}
                placeholder={"Search for pizzas, burgers, many more..."}
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSumbit}
                returnKeyType={"search"}
                placeholderTextColor={"#A0A0A0"}
            />
            <TouchableOpacity className={"pr-5"} onPress={() => router.setParams({ query })}>
                <Image source={images.search} className={"size-6"} resizeMode={"contain"} tintColor={"#5F5D6D"}/>
            </TouchableOpacity>
        </View>
    )
}
export default SearchBar
