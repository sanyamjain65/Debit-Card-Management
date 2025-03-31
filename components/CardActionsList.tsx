import { Alert } from "react-native";
import React, { memo } from "react";
import { View } from "react-native";
import CardAction from "./CardAction";

import { Card } from "@/interfaces/interface";
import { ScrollView } from "react-native";
import SpendingLimitBar from "./SpendingLimitBar";
import { Images } from "@/constants/images";
import { api } from "@/services/api";

const CardActionsList: React.FC<{
    activeCard: Card;
    handleWeeklyLimitPress: () => void;
    handleCardStatusUpdate: () => void;
}> = memo(({ activeCard, handleWeeklyLimitPress, handleCardStatusUpdate }) => (
    <ScrollView 
        className="flex-1 mt-44"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
    >
        {activeCard.weeklyLimitSet && (
            <View className="px-6">
                <SpendingLimitBar
                    spent={activeCard.totalSpend || 0}
                    limit={activeCard.weeklyLimit || 0}
                />
            </View>
        )}
        <View className="mx-6">
            <CardAction
                title="Top-up account"
                description="Deposit money to your account to use with card"
                Icon={Images.Insight}
                onPress={() => Alert.alert('Top-up account')}
            />
            <CardAction
                title="Weekly spending limit"
                description={activeCard.weeklyLimitSet 
                    ? `Your weekly spending limit is S$ ${activeCard.weeklyLimit.toLocaleString()}` 
                    : "You haven't set any spending limit on card"}
                Icon={Images.Transfer}
                showSwtich={true}
                type="weeklyLimit"
                cardDetails={activeCard}
                onPress={handleWeeklyLimitPress}
            />
            <CardAction
                title={activeCard.cardActive ? "Freeze Card" : "Unfreeze Card"}
                description={activeCard.cardActive 
                    ? "Your debit card is currently active" 
                    : "Your debit card is currently freezed"}
                Icon={Images.Freeze}
                showSwtich={true}
                type="freezeCard"
                cardDetails={activeCard}
                onPress={handleCardStatusUpdate}
            />
            <CardAction
                title="Deactivated cards"
                description="Your previously deactivated cards"
                Icon={Images.Deactivate}
                onPress={() => Alert.alert('Deactivated cards')}
            />
            <CardAction
                title="Get a new card"
                description="This deactivates your current debit card"
                Icon={Images.NewCard}
                onPress={() => Alert.alert('Get a new card')}
            />
        </View>
    </ScrollView>
));


export default CardActionsList