import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import {Category} from "@/type";
import {router, useLocalSearchParams} from "expo-router";
import cn from "clsx";

const Filter = ({ categories }:{ categories: Category[] }) => {
    const searchParams = useLocalSearchParams();
    const [active, setActive] = React.useState(searchParams.category || "all")
    const handlePress = (id: string) => {
        setActive(id)

        // console.log("this is active value : ", active,"this is id value : ", id)
        if(id === "all") {
            router.setParams({ category: undefined })
        } else {
            router.setParams({ category: id })
        }
    }
    const filterData: ( Category | { $id: string; name: string })[] =
        categories ? [{ $id: "all", name: "All" }, ...categories] : [{ $id: "all", name: "All" }];



    return (
        <FlatList
            data={filterData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName={"gap-x-2 pb-3"}
            keyExtractor={item => item.$id}
            renderItem={({item}) => (
                    <TouchableOpacity
                        className={cn("filter", active === item.$id ? "bg-amber-500": "bg-white")}
                        key={item.$id}
                        onPress={() => handlePress(item.$id)}
                    >
                        <Text className={cn("body-medium", active === item.$id ? "text-white" : "text-gray-200")}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }
        />
    )
}
export default Filter
