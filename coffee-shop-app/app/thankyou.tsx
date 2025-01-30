import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {router} from "expo-router";
import PageHeader from "@/components/PageHeader";

const ThankyouPage = () => {
  return (
    <GestureHandlerRootView>
        <PageHeader title={"Thank You"} showHeaderRight={false} bgColor={"#F9F9F9"} />
        <View className='w-full h-full items-center justify-center '>
        <Text className='text-3xl font-[Sora-SemiBold] text-center mx-10'>Thank you For Your Order</Text>

        <TouchableOpacity 
                className='bg-app_orange_color 2-full rounded-2xl items-center justify-center mt-6 py-3 px-4 font-[Sora-SemiBold]'
                onPress={() => router.push("/(tabs)/home")}
              >
                <Text className="text-xl color-white font-[Sora-Regular]">Return to Home Page</Text> 
          </TouchableOpacity> 
        </View>
    </GestureHandlerRootView>
  )
}

export default ThankyouPage