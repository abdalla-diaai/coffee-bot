import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProductList from "@/components/CartProductList";
import { Product } from "@/types/types";
import { useCart } from "@/contexts/CartContext";
import { fetchProducts } from "@/services/productService";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-root-toast';
import { router } from "expo-router";

export default function Order() {


    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { cartItems, setQuantity, clearCart } = useCart();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const loadProducts = async () => {
        try {
            const products = await fetchProducts();
            setProducts(products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        };
    };

    const orderNow = () => {
        clearCart();
        Toast.show('Order placed successfully!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
        });
        router.push('/thankyou')
    };

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <GestureHandlerRootView>
            <PageHeader title={"Order"} showHeaderRight={false} bgColor={"#F9F9F9"} />
            <View className="h-full flex-col justify-between">
                <View className="h-[75%]">
                    <CartProductList products={products} quantities={cartItems} setQuantities={setQuantity} totalPrice={totalPrice} />
                </View>
                <View className="bg-white rounded-tl-3xl rounded-tr-3xl px-7 pt-3 pb-6">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Ionicons name="wallet-outline" size={24} color="#C67C4E" />
                            <View>

                                <Text className="text-[#242424] text-base font-[Sora-SemiBold] pb-1 ml-3">Cash/Wallet</Text>
                                <Text className="text-app_orange_color text-sm font-[Sora-SemiBold] ml-3">
                                    £{totalPrice === 0 ? 0 : totalPrice + 1}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <TouchableOpacity
                        className={`${totalPrice === 0 ? 'bg-[#EDEDED]' : 'bg-app_orange_color'}  2-full rounded-2xl items-center justify-center mt-6 py-3`}
                        disabled={totalPrice === 0}
                        onPress={orderNow}
                    >
                        <Text className="text-xl color-white font-[Sora-Regular]">Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    )
};