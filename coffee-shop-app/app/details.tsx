import { useLocalSearchParams } from "expo-router";
import { View, Text  } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import PageHeader from "@/components/PageHeader";

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
        <GestureHandlerRootView>
            <PageHeader title={name} showHeaderRight={true} bgColor={"#F9F9F9"} />
            <Text>
                details page
            </Text>

        </GestureHandlerRootView>
    );
}

export default DetailsPage;