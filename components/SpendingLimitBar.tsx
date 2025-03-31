import { theme } from "@/tailwind.config";
import { View, Text } from "react-native";

interface SpendingLimitBarProps {
    spent: number;
    limit: number;
}

 const SpendingLimitBar = ({ spent, limit }: SpendingLimitBarProps) => {
    const spentAmount = parseFloat(spent.toString());
    const limitAmount = parseFloat(limit.toString());
    const percentage = (spentAmount / limitAmount) * 100;

    return (
        <View className="mt-6">
            <View className="flex-row justify-between mb-1">
                <Text className="text-sm text-[#222222]">Debit card spending limit</Text>
                <Text className="text-sm"> 
                    <Text className="text-primary">${Number(spent).toLocaleString()}</Text>
                    <Text className="text-gray-400">  |  ${Number(limit).toLocaleString()}</Text>
                </Text>
            </View>
            <View className="h-4 bg-primary/10 rounded-full overflow-hidden relative">
                <View className={`flex-row h-full`} style={{ width: `${percentage}%` }}>
                    <View className="flex-1 bg-primary" />
                    <View 
                        style={{
                            width: 16,
                            height: '120%',
                            backgroundColor: (theme?.extend?.colors as { primary: string }).primary,
                            transform: [
                                { rotateZ: '20deg' },
                                { translateX: -8 }
                            ],
                            marginRight: -1
                        }}
                    />
                </View>
            </View>
        </View>
    );
};  


export default SpendingLimitBar