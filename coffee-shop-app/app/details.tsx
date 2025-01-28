import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView  } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PageHeader from "@/components/PageHeader";
import DetailsHeader from "@/components/DetailsHeader";
import DescriptionSection from "@/components/DescriptionSection";
import SizeSection from "@/components/SizeSection";

const DetailsPage = () => {

    const {name, description, price, image_url, type, rating} = useLocalSearchParams() as {
        name: string;
        description: string;
        price: string;
        image_url: string;
        type: string;
        rating: string;
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
            </View>

        </GestureHandlerRootView>
    );
}

export default DetailsPage;