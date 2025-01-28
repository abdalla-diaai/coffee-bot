import React, { useEffect, useState } from "react";
import { Product, ProductCategory } from "@/types/types";
import { fetchProducts } from "@/services/productService";
import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchArea from "@/components/SearchArea";
import Banner from "@/components/Banner";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [productCategories, setProductCatgories] = useState<ProductCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchProducts();
                const categories = products.map((product) => product.category);
                categories.unshift("All");
                const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
                    id: category,
                    selected: selectedCategory === category,
                }));
                setProducts(products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            };
        };
        loadProducts();

    }, []);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaView className="w-full h-full">
                <FlatList
                    horizontal={false}
                    columnWrapperStyle={{ justifyContent: "space-between", marginLeft: 15, marginRight: 15 }}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    data={products}
                    renderItem={({ item }) => (
                        <View
                            className="w-[48%] mt-2"
                        >
                            <TouchableOpacity>

                                <Image
                                    source={{ uri: item.image_url }}
                                    className="w-full h-32 rounded-2xl"
                                />
                                <Text
                                    className="text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2"
                                >{item.name}
                                </Text>
                                <Text
                                    className="text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1 mt-1"
                                >{item.category}
                                </Text>
                            </TouchableOpacity>
                            <View className="flex-row justify-between ml-1 mt-4 mb-2">
                                <Text className="text-[#050505] text-xl font-[Sora-SemiBold]">${item.price}</Text>
                                <TouchableOpacity>
                                    <View className="mr-2 p-2 -mt-1 bg-app_orange_color rounded-xl">
                                        <AntDesign name="plus" size={20} color="white" />

                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                    )}
                    ListHeaderComponent={() => (
                        <View className="flex">
                            <SearchArea />
                            <Banner />
                        </View>

                    )}

                />
                <Text>Home</Text>

            </SafeAreaView>
            </GestureHandlerRootView>
    );
};

