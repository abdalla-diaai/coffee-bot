import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View>
      <SafeAreaView className="w-full h-full">
        <ImageBackground
          className="w-full h-full items-center"
          source={require("../assets/images/index_bg_image.png")}>
          <View className="flex h-[60%]" />
          <View className="flex w-[80%]">
            <Text className="text-white text-3xl text-center font-[Sora-SemiBold]">
              Fall in Love with Coffee in a Blissful Delight!</Text>
            <Text
              className="pt-3 text-[text-color] text-center font-[Sora-Regular]"
            >
              Welcome to our cozy coffee corner, where every cup is a delightful for you.
            </Text>
            <TouchableOpacity
              className="bg-[#C67C4E] mt-10 py-3 rounded-lg items-center"
              onPress={() => { router.push("/(tabs)/home") }}
            >
              <Text className="text-xl text-white font-[Sora-SemiBold]">Get Started</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}
