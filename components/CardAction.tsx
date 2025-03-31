import { Switch, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { updateCardLimitAsync, updateCardStatusAsync } from '@/store/slices/cardSlice';
import { router } from 'expo-router';
import { theme } from '@/tailwind.config';

const CardAction = ({ title, description, Icon, showSwtich = false, type, cardDetails, onPress }: any) => {
    const activeCardIndex = useSelector((state: any) => state.cards.activeCardIndex);
    const dispatch = useDispatch();
    const onSwitchValueChange = (value: boolean) => {
        if (type === "weeklyLimit") {
            if (value === false) {
                dispatch(updateCardLimitAsync({activeCardIndex: activeCardIndex, weeklyLimit: 0, weeklyLimitSet: false}) as any);
            } else {
                router.push('/spendingLimit');
            }
        } else {
            dispatch(updateCardStatusAsync({activeCardIndex: activeCardIndex, status: !value}) as any);
        }
    }

    return (
        <TouchableOpacity onPress={() => onPress()}>
        <View className="flex-row items-center mt-8 gap-3">
            <Icon width={32} height={32} />
            <View>
                <Text className="text-sm text-title font-semibold">{title}</Text>
                <Text className="text-cardDesrciption text-xs opacity-40">{description}</Text>
            </View>
            {showSwtich ? (
                <Switch 
                    className="absolute -right-5" 
                    value= {type === "weeklyLimit" ? cardDetails.weeklyLimitSet : !cardDetails.cardActive}
                    onValueChange={(value) => {onSwitchValueChange(value)}}
                    trackColor={{ false: (theme?.extend?.colors as { switchInactiveTrackColor: string }).switchInactiveTrackColor, true: (theme?.extend?.colors as { primary: string }).primary }}
                    thumbColor={(theme?.extend?.colors as { white: string }).white}
                /> 
            ) : null}
        </View>
        </TouchableOpacity>
    )
}

export default CardAction