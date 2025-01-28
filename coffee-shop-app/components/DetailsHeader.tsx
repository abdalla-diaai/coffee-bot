import { View, Text, Image } from "react-native";
import { DetailsHeaderProps } from "@/types/types";
import React from "react";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
    image_url,
    name,
    type,
    rating
}) => {
    return (
        <>
            <Image
                source={{ uri: image_url }}
                className="w-full h-48 rounded-2xl mt-2"
            />
            <View>
                <Text className="text-2xl text-[#242424] font-[Sora-SemiBold] ml-1 mt-4">{name}</Text>
                <View className="flex-row w-full justify-between">
                    <Text className="text[text-color text-sm font-[Sora-Regular] ml-1 mt-1 mb-5">{type}</Text>
                    <View className="flex-row mt-2">
                        <View className="bg-[#F5F5F5] p-2 rounded-xl mr-2">
                            <MaterialIcons
                                name="delivery-dining" size={24} color="#C67C4E" />
                        </View>
                        <View
                            className='bg-[#F5F5F5] p-2 rounded-xl mr-2'
                        >
                            <FontAwesome
                                name="coffee" size={24} color="#C67C4E" />
                        </View>

                        <View
                            className='bg-[#F5F5F5] p-2 rounded-xl mr-2'
                        >
                            <MaterialCommunityIcons
                                name="food-croissant" size={24} color="#C67C4E" />
                        </View>
                    </View>
                </View>
                <View
                    className='flex-row pl-2'
                >
                    <Octicons name="star-fill" size={24} color="#FBBE21" />
                    <Text
                        className='pl-2 text-xl -mt-1 font-[Sora-SemiBold] text-[#2A2A2A]'
                    >
                        {rating}
                    </Text>
                </View>

                <View className='w-full items-center'>
                    <View className="w-[90%] border-b border-gray-400 my-4" />
                </View>
            </View>
        </>
    );
}

export default DetailsHeader;