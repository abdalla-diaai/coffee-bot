import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";

// Import your global CSS file
import "../global.css";
import { CartProvider } from "@/contexts/CartContext";


export default function RootLayout() {
  const [fontLoaded] = useFonts({
    "Sora-Regular": require("@/assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("@/assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("@/assets/fonts/Sora-Bold.ttf"),

  })
  return (
    <CartProvider>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ headerShown: true }} />
          <Stack.Screen name="[tabs]" options={{ headerShown: false }} />
        </ Stack>
      </RootSiblingParent>
    </CartProvider>

  );
}
