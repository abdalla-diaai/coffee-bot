import { Text, View } from "react-native";
import { HeaderProps } from "@/types/types";
import { router, Stack } from "expo-router";

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
            headerTitleAlign: "center",
            headerTitle: () => (
                <Text className={"text-[#242424] text-xl font-[Sora-SemiBold]"} >
                    {title}
                </Text>
            ),
        }}
  
        />
    );
};

export default PageHeader;