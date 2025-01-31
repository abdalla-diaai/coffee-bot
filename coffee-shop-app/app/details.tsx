import { Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router'
import { useLocalSearchParams } from "expo-router";
import PageHeader from '@/components/PageHeader';
import { useCart } from '@/contexts/CartContext';
import Toast from 'react-native-root-toast';
import DescriptionSection from '@/components/DescriptionSection';
import DetailsHeader from '@/components/DetailsHeader';
import SizeSection from "@/components/SizeSection";

const DetailsPage = () => {
    const { addToCart } = useCart();
    const { name, description, price, image_url, type, rating } = useLocalSearchParams() as {
        name: string;
        description: string;
        price: string;
        image_url: string;
        type: string;
        rating: string;
    };

    const buyNow = () => {
        addToCart(name, 1);
        Toast.show(`${name} added to cart`, {
            duration: Toast.durations.SHORT,
        });
        router.back();
    };

    return (
        <GestureHandlerRootView className="h-full w-full bg-[#F9F9F9]">
            <PageHeader title={"Details"} showHeaderRight={true} bgColor={"#F9F9F9"} />
            <View className="h-full flex-col justify-between">
                <ScrollView>
                    <View className="mx-5">
                        <DetailsHeader
                            image_url={image_url}
                            name={name}
                            type={type}
                            rating={rating}
                        />
                        <DescriptionSection description={description} />
                        <SizeSection />
                    </View>
                </ScrollView>
                <View
                    className='flex-row justify-between bg-white rounded-tl-3xl rounded-tr-3xl px-6 pt-3 pb-6 mb-5'
                >
                    <View>
                        <Text
                            className="text-[text-color] text-base font-[Sora-Regular] pb-3"
                        >Price
                        </Text>
                        <Text
                            className="text-app_orange_color text-2xl font-[Sora-SemiBold]"
                        >$ {price}
                        </Text>
                    </View>

                    <TouchableOpacity
                        className="bg-app_orange_color w-[50%] rounded-3xl items-center justify-center"
                        onPress={buyNow}
                    >
                        <Text className="text-xl color-white font-[Sora-Regular]">Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </GestureHandlerRootView>
    );
}

export default DetailsPage;