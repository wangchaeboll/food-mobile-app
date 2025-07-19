import {Text, Button, FlatList, View} from 'react-native'
import React, {useEffect, useMemo} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import useAppwrite from "@/libs/useAppwrite";
import {getCategories, getMenu} from "@/libs/appwrite";

import {useLocalSearchParams} from "expo-router";
import CartButton from "@/components/CartButton";
import cn from "clsx";
import MenuCard from "@/components/MenuCard";
import {Category, MenuItem} from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

const Explore = () => {
    const { category, query} = useLocalSearchParams<{query: string; category: string}>()
    const { data, refetch, loading } = useAppwrite({
        fn: getMenu,
        params: {
            category,
            query,
            limit: 6
        }
    })

    // @ts-ignore
    const { data: categories } =  useAppwrite<Category[]>({
        fn: getCategories,
    })

    useEffect(() => {
        refetch({ category, query , limit: 6 })
    }, [category, query])

    const headerComponent = useMemo(() => {
        if (!categories) return null;

        return (
            <View className={"my-5 gap-5"}>
                <View className={"flex-between flex-row w-full"}>
                    <View className={"flex-start"}>
                        <Text className={"small-bold uppercase text-primary"}>Search</Text>
                        <View className={"flex-start flex-grow gap-x-1 mt-0.5"}>
                            <Text className={"paragraph-semibold text-dark-100"}>Find your favorite food</Text>
                        </View>
                    </View>
                    <CartButton />
                </View>
                <SearchBar />
                <Filter categories={categories!} />
            </View>
        );
    }, [categories]);

    return (
        <SafeAreaView className={"bg-white h-full "}>
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    const isFirstRightColItem = index % 2 === 0;
                return (
                    <View className={cn("flex-1 max-w-[48%]",!isFirstRightColItem ? "mt-10": "mt-0" )}>
                        <MenuCard item={item as MenuItem}/>
                    </View>
                )
            }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName={"gap-7"}
                contentContainerClassName={"gap-7 px-5 pb-32"}
                ListHeaderComponent={headerComponent}
                ListEmptyComponent={() => !loading && <Text className={"base-bold text-primary text-center"}>No Result</Text>}
            />
        </SafeAreaView>
    )
}
export default Explore
