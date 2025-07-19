import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";
import {useCartStore} from "@/store/cart.store";
import {router} from "expo-router";

const CartButton = () => {
    const { getTotalItems } = useCartStore()
    const totalItem = getTotalItems()

    return (
        <TouchableOpacity className={"cart-btn"} onPress={() => router.push("/cart")}>
            <Image source={images.bag} className={"size-5"} resizeMode={"contain"}/>
            {totalItem > 0 && (
                <View className="cart-badge">
                    <Text className="small-bold text-white">{totalItem}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButton
