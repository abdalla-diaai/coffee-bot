import { DescriptionProps } from "@/types/types";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DescriptionSection: React.FC<DescriptionProps> = ({ description }) => {

    const[expanded, setExpanded ] = useState(false);

    return (
        <View className="mx-5">
            <Text className="text-[#242424] font-[Sora-SemiBold] text-lg mt-4">Description</Text>
            <Text className="text-[#A2A2A2] font-[Sora-Regular] mt-2 text-sm"
            numberOfLines={expanded ? 0 : 3}
            style={{ textAlign: 'justify' }}
            >{expanded? description : `${description.slice(0, 100)}`}</Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text className="text-app_orange_color font[Sora-Regular]">{expanded ? "Read Less" : "Read More"}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DescriptionSection;
