import { Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Images } from '@/constants/images'

interface CardDetails {
    cardHolder: string
    cardNumber: string
    expiryDate: string
    cvv: string
}

interface DebitCardProps {
    isCardActive: boolean
    cardDetails: CardDetails
}

const formatCardNumber = (number: string): string =>
    number.match(/.{1,4}/g)?.join('    ') || ''

const DebitCard = memo(({ isCardActive, cardDetails }: DebitCardProps) => {
    const [isCardNumberVisible, setCardNumberVisible] = React.useState(false);

    const toggleCardVisibility = () => setCardNumberVisible(prev => !prev);

    return (
        <View className="mx-6 mt-11">
            {isCardActive && (
                <TouchableOpacity
                    onPress={toggleCardVisibility}
                    className="absolute -top-9 right-0 justify-end bg-white px-3 pb-5 pt-2 flex-row items-center rounded-t-md"
                >
                    {isCardNumberVisible ? (
                        <Images.HideEye
                            color="gray"
                            width={18}
                            height={18}
                        />
                    ) : (
                        <Images.ShowEye
                            color="gray"
                            width={18}
                            height={18}
                        />
                    )}
                    <Text className="text-primary text-xs font-semibold ml-2">
                        {isCardNumberVisible ? "Hide" : "Show"} card number
                    </Text>
                </TouchableOpacity>
            )}

            <View className={`rounded-xl p-6 ${isCardActive ? 'bg-primary' : 'bg-gray-500'}`}>
                {!isCardActive && (
                    <View className="absolute top-4 left-0 bg-black rounded-r-xl overflow-hidden">
                        <Text className="text-white text-base font-bold bg-black px-4 py-2 rounded-lg">
                            CARD FROZEN
                        </Text>
                    </View>
                )}

                <View className="flex-row items-center justify-end relative gap-1.5">
                    <Images.Home width={16} height={16} fill="white" />
                    <Text className="text-white text-sm font-bold">aspire</Text>
                </View>

                <Text className="text-white text-xl mt-6 font-extrabold">
                    {cardDetails.cardHolder}
                </Text>

                <Text className="text-white text-sm font-semibold tracking-widest mt-6">
                    {isCardNumberVisible
                        ? formatCardNumber(cardDetails.cardNumber)
                        : "••••    ••••    ••••    ••••"}
                </Text>

                <View className="flex-row mt-4">
                    <Text className="text-white text-sm">Thru: {cardDetails.expiryDate}</Text>
                    <Text className="text-white text-sm ml-8">
                        CVV: {isCardNumberVisible ? cardDetails.cvv : "***"}
                    </Text>
                </View>

                <View className="flex items-end justify-end mt-1">
                    <Images.Visa width={60} height={20}  />
                </View>
            </View>
        </View>
    )
})

DebitCard.displayName = 'DebitCard'

export default DebitCard