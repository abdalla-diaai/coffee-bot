import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DeliveryToggle = () => {

    const [isDelivery, setIsDelivery] = useState<boolean>(true);


    return (
        <View className="flex-row justify-between bg-[#EDEDED] mx-7 p-1 rounded-xl mt-7">
            <TouchableOpacity className={`py-1 px-[15%] font-[Sora-SemiBold] rounded-xl ${isDelivery ? 'bg-[#C67C4E]' : ''
                }`}
                onPress={() => setIsDelivery(true)}>
                <Text
                className={`text-lg font-[Sora-SemiBold] ${isDelivery ? 'text-white' : ''
                }`}
                >Deliver</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`py-1 px-[15%] font-[Sora-SemiBold] rounded-xl ${!isDelivery ? 'bg-[#C67C4E]' : ''
                }`}
                onPress={() => setIsDelivery(false)}>
                <Text
                className={`text-lg font-[Sora-SemiBold] ${!isDelivery ? 'text-white' : ''
                }`}
                >Pick Up</Text>
            </TouchableOpacity>
        </View>
    )

}

export default DeliveryToggle; 