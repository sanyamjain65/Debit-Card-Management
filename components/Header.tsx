import { Text, View } from 'react-native'
import React, { memo } from 'react'
import { Images } from '@/constants/images'
import { theme } from '@/tailwind.config'

const Header = ({ balance }: { balance: string }) => {
    return (
        <View className="px-[24px]">
            <View className="flex mt-3 flex-row justify-end">
                <Images.Home width={24} height={24} fill={(theme?.extend?.colors as { primary: string }).primary} />
            </View>
            <Text className="text-white text-2xl font-bold">Debit Card</Text>
            <Text className="text-white text-base mt-6">Available balance</Text>
            <View className="flex-row items-center mt-2.5 gap-2.5">
                <View className="bg-primary px-3 py-1 rounded-lg">
                    <Text className="text-white text-xs font-bold">S$</Text>
                </View>
                <Text className="text-white text-2xl font-bold"> {Number(balance).toLocaleString()}</Text>
            </View>
        </View>

    )
}

export default memo(Header)