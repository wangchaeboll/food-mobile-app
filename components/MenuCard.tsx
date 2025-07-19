import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {MenuItem} from "@/type";
import {account, appwriteConfig, storage} from "@/libs/appwrite";

const MenuCard = ({ item : {image_url, name, price} }: { item :MenuItem} ) => {
    return (
        <TouchableOpacity className={"menu-card"}>
            <Image source={{ uri: image_url }} resizeMode={"contain"} className={"size-32 absolute -top-10"}/>
            <Text className={"text-center text-dark-100 base-bold mb-2"} numberOfLines={1}>{name}</Text>
            <Text className={"body-regular text-gray-200 mb-4"}>From ${price}</Text>
            <TouchableOpacity onPress={()=>{}}>
                <Text className={"paragraph-bold text-primary"}>Add to Cart</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard