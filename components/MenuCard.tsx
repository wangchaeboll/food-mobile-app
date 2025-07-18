import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {MenuItem} from "@/type";
import {account, appwriteConfig, storage} from "@/libs/appwrite";

const MenuCard = ({ item : {image_url, name, price} }: { item :MenuItem} ) => {
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
    const image = `https://fra.cloud.appwrite.io/v1/storage/buckets/687874f4000a1b01edeb/files/687887d200213f28f529/view?project=687721890022db72c634&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjg3YTRjZGNkNmYwNmJkZWNkMjEiLCJyZXNvdXJjZUlkIjoiNjg3ODc0ZjQwMDBhMWIwMWVkZWI6Njg3ODg3ZDIwMDIxM2YyOGY1MjkiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjI2MjY0OjExIiwiZXhwIjo5LjIyMzM3MjAzODYwNzYyMmUrMTh9.40rfz03bqVKrJjwSVCQ7cpO2YtHxBG815zDnZzvZdhY`;
    const terus = "https://fra.cloud.appwrite.io/v1/storage/buckets/687874f4000a1b01edeb/files/687887d200213f28f529/view?project=687721890022db72c634&mode=admin"
    const terusnno = "https://fra.cloud.appwrite.io/v1/storage/buckets/687874f4000a1b01edeb/files/687888400029fa197194/view?project=687721890022db72c634"
    const image_urli = "https://fra.cloud.appwrite.io/v1/storage/buckets/687874f4000a1b01edeb/files/687888400029fa197194/view?project=687721890022db72c634"

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