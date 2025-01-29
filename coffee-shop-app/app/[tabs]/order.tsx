import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProductList from "@/components/CartProductList";
import { Product } from "@/types/types";
import { useCart } from "@/contexts/CartContext";
import { fetchProducts } from "@/services/productService";

export default function Order() {
    

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {cartItems, setQuantity, clearCart} = useCart();
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
            </View>
        </GestureHandlerRootView>
    )
};