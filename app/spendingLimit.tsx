import React, { useState, useCallback, useMemo } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateCardLimitAsync } from '@/store/slices/cardSlice'
import { Images } from '@/constants/images'
import { theme } from '@/tailwind.config'

// Constants
const SPENDING_LIMIT_OPTIONS = [5000, 10000, 15000]
const MAX_LIMIT = 100000

interface RootState {
    cards: {
        activeCardIndex: number
    }
}

const SpendingLimit = () => {
    const activeCardIndex = useSelector((state: RootState) => state.cards.activeCardIndex)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState<string>('')
    const [isAmountExceeded, setAmountExceeded] = useState<boolean>(false)

    const colors = useMemo(() => theme?.exxtend?.colors as { primary: string }, [])

    const handleAmountChange = useCallback((text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '')
        setAmount(numericValue)
        setAmountExceeded(Number(numericValue) > MAX_LIMIT)
    }, [])

    const handleDisplayAmount = useCallback((value: number) => {
        const currentAmount = Number(amount.replace(/[^0-9]/g, ''))
        const newAmount = (currentAmount + value).toLocaleString()
        setAmount(newAmount)
        setAmountExceeded((currentAmount + value) > MAX_LIMIT)
    }, [amount])

    const handleSetLimit = useCallback(() => {
        const numericValue = Number(amount.replace(/[^0-9]/g, ''))
        
        if (numericValue > MAX_LIMIT) {
            setAmountExceeded(true)
            return
        }

        dispatch(updateCardLimitAsync({ 
            activeCardIndex, 
            weeklyLimit: numericValue, 
            weeklyLimitSet: true 
        }) as any)
        router.back()
    }, [amount, activeCardIndex, dispatch])

    const isValidAmount = amount && amount.length > 0

    return (
        <SafeAreaView className="bg-background flex-1">
            <View className="bg-background flex-1">
                {/* Header */}
                <View className="flex-row justify-between mt-6 mx-5">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="flex">
                        <Images.Home width={24} height={24} fill={(theme?.extend?.colors as { primary: string }).primary}/>
                    </View>
                </View>

                {/* Title */}
                <View className="px-6 mt-5">
                    <Text className="text-white text-2xl font-bold">Spending limit</Text>
                </View>

                {/* Main Content */}
                <View className="mt-10 flex-1 justify-between bg-white rounded-t-[24px] z-10 overflow-hidden px-6">
                    <View>
                        {/* Spending Limit Header */}
                        <View className="flex-row gap-3 items-start mt-8">
                            <Images.SpendingLimit width={16} height={16} />
                            <Text className="text-black text-sm font-medium -mt-0.5">
                                Set a weekly debit card spending limit
                            </Text>
                        </View>

                        {/* Amount Input */}
                        <View className="flex flex-row items-center gap-2">
                            <TextInput
                                className="border-b-2 border-gray-100 text-2xl font-extrabold w-full"
                                placeholder=""
                                onChangeText={handleAmountChange}
                                value={amount}
                                keyboardType="numeric"
                                style={{ paddingLeft: 50 }}
                            />
                            <View className="absolute left-0 bg-primary px-3 py-1 rounded-lg">
                                <Text className="text-white text-sm font-bold">S$</Text>
                            </View>
                        </View>

                        {/* Error Message */}
                        {isAmountExceeded && (
                            <View className="mt-4">
                                <Text className="text-red-500 text-sm">
                                    Spending limit cannot be more than S$ 1,00,000
                                </Text>
                            </View>
                        )}

                        {/* Description */}
                        <View className="mt-3">
                            <Text className="text-description text-sm">
                                Here weekly means the last 7 days, not the calendar week
                            </Text>
                        </View>

                        {/* Quick Amount Buttons */}
                        <View className="flex flex-row justify-between mt-11 w-full">
                            {SPENDING_LIMIT_OPTIONS.map((value) => (
                                <TouchableOpacity
                                    key={value}
                                    className="bg-primary/10 px-8 py-3 rounded-2 self-start"
                                    onPress={() => handleDisplayAmount(value)}
                                >
                                    <Text className="text-primary text-xs font-medium">
                                        S$ {value.toLocaleString()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Save Button */}
                    <View className="flex-row mx-7 mb-5">
                        <TouchableOpacity
                            className={`flex-1 p-4 rounded-full overflow-hidden items-center justify-center ${
                                isValidAmount ? 'bg-primary' : 'bg-[#EEEEEE]'
                            }`}
                            onPress={handleSetLimit}
                            disabled={!isValidAmount}
                        >
                            <Text className="items-center justify-center text-base text-white font-bold">
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SpendingLimit