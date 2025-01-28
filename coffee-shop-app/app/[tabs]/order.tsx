import { Text, View } from "react-native";
import React from "react";
import Entypo from '@expo/vector-icons/Entypo';
import PageHeader from "@/components/PageHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Order() {
    return (
        <GestureHandlerRootView>
            <PageHeader title={"Order"} showHeaderRight={false} bgColor={"#F9F9F9"} />
            <Text>
                Order page
            </Text>
        </GestureHandlerRootView>
    )
};