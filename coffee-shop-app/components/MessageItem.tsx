import { Message } from "@/types/types";
import { View, Text } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const MessageItem: React.FC<Message> = ({ message }) => {

    if (message?.role === 'user') {

        return (
            <View className="flex-row justify-end mb-3 mr-3">
                <View className="w-[80%]">
                    <View className="self-end p-3 rounded-2xl bg-white border border-neutral-200">
                        <Text className=""
                        style={{fontSize: heightPercentageToDP(1.9)}}
                        >
                            {message?.content}

                        </Text>

                    </View>
                </View>

            </View>
        )


    } else {
        return (
            <View className="flex-row justify-end mb-3 mr-3">
                <View className="w-[80%]">
                    <View className="self-start p-2 rounded-2xl bg-indigo-100 border border-indigo-200">
                        <Text 
                        style={{fontSize: heightPercentageToDP(1.9)}}
                        >
                            Thinking. 
                            {message?.content}
                        </Text>
                    </View>
                </View>

            </View>
        )
    };

};

export default MessageItem;