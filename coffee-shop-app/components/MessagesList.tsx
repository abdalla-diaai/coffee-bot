import { MessagesListProps } from "@/types/types";
import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";
import { Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import TypingIndicator from "./TypingIndicator";


const MessagesList : React.FC<MessagesListProps> = ({ messages, isTyping }) => {
    return(
        <ScrollView>
            {
                messages.map((message, index) => (
                    <MessageItem key={index} message={message}/>
                ))
            }
            {isTyping && (
                <View className="flex-row justify-end mb-3 mr-3">
                                <View className="w-[80%]">
                                    <View className="self-start p-2 rounded-2xl bg-indigo-100 border border-indigo-200">
                                        <Text
                                        style={{fontSize: heightPercentageToDP(1.9)}}
                                        ><TypingIndicator /></Text>
                                    </View>
                                </View>
                            </View>
            )}

        </ScrollView>
    )

};

export default MessagesList;

