import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white items-center justify-center text-center text-lg">This is the Home tab.</Text>
        <View className="h-4"></View>
        <Text className="text-white items-center justify-center text-center text-lg">Please check the Debit Card tab for your cards.</Text>
      </View>

    </SafeAreaView>
  );
}
