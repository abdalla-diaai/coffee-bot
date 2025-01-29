import { Text, View } from "react-native";
import DeliveryToggle from "@/components/DeliveryToggle";

const OrderHeader = () => {

    return (
        <View>
            <DeliveryToggle />
            <Text className="mx-7 mt-7 text-[#242424] text-lg font-[Sora-SemiBold]">
                Delivery Address
             </Text>
             <Text className="mx-7 mt-3 text-[#242424] text-base font-[Sora-SemiBold] mb-2">
                Abdalla Diaai
             </Text>
             <Text className="mx-7 text-[#A2A2A2] text-xs font-[Sora-SemiBold] mb-3">
                16 Longmore Avenue, EN4 8AF, London
             </Text>
             <View
             className="mx-12 border-b border-grey-400 my-4"
             ></View>
        </View>
    )

}

export default OrderHeader; 