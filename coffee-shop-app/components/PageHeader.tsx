import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { HeaderProps } from "@/types/types";
import { router, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const PageHeader: React.FC<HeaderProps> = ({
    title,
    showHeaderRight,
    bgColor
}) => {
    return (
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: bgColor,
                    },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text className='text-xl text-[#242424] font-[Sora-SemiBold]'>
                            {title}
                        </Text>
                    ),
                    headerRight: showHeaderRight
                        ? () => (
                            <FontAwesome5
                                style={{ marginRight: 10 }}
                                name="heart"
                                size={24}
                                color="black"
                            />
                        )
                        : undefined,
                    headerBackVisible: false,
                    headerLeft: () => (
                            <TouchableOpacity className='pl-2' onPress={() => router.back()}>
                                <Feather name="arrow-left" size={24} color="black" style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                    ),
                }}
            />

    );
};

export default PageHeader;