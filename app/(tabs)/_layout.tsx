import {View, Text, Image} from 'react-native'
import React from 'react'
import {Redirect, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {images} from "@/constants";
import cn from "clsx";

const TabBarIcon = ({focused, icon, title} : TabBarIconProps) => (
    <View className={"tab-icon"}>
        <Image source={icon} className={"size-7"} resizeMode={"contain"} tintColor={focused ? "#FE8C00" : "#5D5F6D"}/>
        <Text className={cn("text-sm font-bold", focused ? "text-primary": "text-gray-200")}>{title}</Text>
    </View>
)


export default function TabLayout() {
    const { isAuthenticated } = useAuthStore()
    if(!isAuthenticated) return <Redirect href={'/sign-in'}/>

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    position: "absolute",
                    marginHorizontal: 20,
                    bottom: 40,
                    height: 80,
                    backgroundColor: "white",
                    shadowColor: "#1a1a1a",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    zIndex: 10,
                }
            }}
        >
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} icon={images.home} title={"Home"} />)
                }}
            />
            <Tabs.Screen
                name={"explore"}
                options={{
                    title: "Explore",
                    tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} icon={images.search} title={"Explore"} />)
                }}
            />
            <Tabs.Screen
                name={"cart"}
                options={{
                    title: "Cart",
                    tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} icon={images.bag} title={"Cart"} />)
                }}
            />
            <Tabs.Screen
                name={"profile"}
                options={{
                    title: "Profile",
                    tabBarIcon: ({focused}) => (<TabBarIcon focused={focused} icon={images.user} title={"Profile"} />)
                }}
            />
        </Tabs>
    )
}
