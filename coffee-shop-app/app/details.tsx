import { useLocalSearchParams } from "expo-router";
import { View, Text  } from "react-native";

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
        <View>
            <Text>
                details page
            </Text>

        </View>
    );
}

export default DetailsPage;