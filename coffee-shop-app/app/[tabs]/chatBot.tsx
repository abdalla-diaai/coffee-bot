import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MessageInterface } from "@/types/types";
import { heightPercentageToDP as hp, widthPercentageToDP as wb } from 'react-native-responsive-screen';
import { Feather } from "@expo/vector-icons";
import MessagesList from "@/components/MessagesList";
import { callChatBotAPI } from "@/services/chatBot";


const chatBot = () => {

    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const inputRef = useRef<TextInput>(null);
    const textRef = useRef('');
    const [isTyping, setIsTyping] = useState(false);


    const handleMessage = async () => {
        let message = textRef.current.trim();
        if (!message) {
            return;
        };
        try {
            let inputMessages = [...messages, { content: message, role: 'user' }]
            setMessages(inputMessages)
            textRef.current = '';
            if (inputRef) {
                inputRef?.current?.clear();
            }
            setIsTyping(true);
            let responseMessage = await callChatBotAPI(inputMessages);
            if (responseMessage) {
                setMessages([...inputMessages, responseMessage]);
            }
            setIsTyping(false);


        } catch (error) {
            console.log(error);
        };
    };

    return (
        <GestureHandlerRootView>
            <PageHeader title={"Chat Bot"} showHeaderRight={false} bgColor={"#F9F9F9"} />

            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                <View className="flex-1">

                    <MessagesList 
                    messages={messages}
                    isTyping={isTyping}
                    />


                </View>
                <ScrollView automaticallyAdjustKeyboardInsets={true}>

                    <View
                        style={{ marginBottom: hp(2.7) }}
                        className='pt-2'
                    >
                        <View
                            className="flex-row mx-3 justify-between border p-2 bg-white border-neutral-300  rounded-full pl-5"
                        >
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder='Type message...'
                                style={{ fontSize: hp(2) }}
                                className='flex-1 mr2'
                            />
                            <TouchableOpacity
                                onPress={handleMessage}
                                className='bg-neutral-200 p-2 mr-[1px] rounded-full'
                            >
                                <Feather name="send" size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>

        </GestureHandlerRootView>
    )
};

export default chatBot;