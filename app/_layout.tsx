import { Stack } from "expo-router";
import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#0C365A" />
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="spendingLimit" options={{ headerShown: false }}
          />
        </Stack>
      </Provider>
    </>
  );
}
