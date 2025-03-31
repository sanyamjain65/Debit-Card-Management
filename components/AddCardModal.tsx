import React, { useState, useCallback, memo } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addCardAsync } from '../store/slices/cardSlice'
import { generateCardNumber, generateCVV, generateExpiryDate } from '../utils/cardUtils'
import { theme } from '@/tailwind.config'

interface AddCardModalProps {
    isModalVisible: boolean
    setModalVisible: (visible: boolean) => void
}

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/

const AddCardModal = ({
    isModalVisible,
    setModalVisible
}: AddCardModalProps) => {
    const dispatch = useDispatch()
    const [isCardNameValid, setIsCardNameValid] = useState(true)
    const [cardName, setCardName] = useState('')

    const validateForm = useCallback((): boolean => {
        const isValid = !SPECIAL_CHAR_REGEX.test(cardName)
        setIsCardNameValid(isValid)
        return isValid
    }, [cardName])

    const handleCardNameChange = useCallback((text: string) => {
        setCardName(text)
        // Reset validation state when user starts typing
        if (!isCardNameValid) setIsCardNameValid(true)
    }, [isCardNameValid])

    const handleSubmit = useCallback(() => {
        if (!validateForm()) return

        dispatch(addCardAsync({
            cardHolder: cardName,
            cardNumber: generateCardNumber(),
            expiryDate: generateExpiryDate(),
            cvv: generateCVV().toString(),
        }) as any)

        // Reset form and close modal
        setCardName('')
        setModalVisible(false)
    }, [cardName, dispatch, setModalVisible, validateForm])

    const handleModalClose = useCallback(() => {
        setModalVisible(false)
        // Reset form state when modal closes
        setCardName('')
        setIsCardNameValid(true)
    }, [setModalVisible])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleModalClose}
        >
            <TouchableOpacity
                className="flex-1 bg-black/50"
                activeOpacity={1}
                onPress={handleModalClose}
            >
                <View className="flex-1 justify-end">
                    <View
                        className="bg-white rounded-t-3xl min-h-[81%] p-6 border-t-24 justify-between"
                    >
                        <View>
                            <View className="items-center min-h-4">
                                <Text className="text-xl items-center justify-center font-bold mb-4">
                                    Add New Card
                                </Text>
                            </View>

                            <TextInput
                                className={`border-2 ${isCardNameValid ? 'border-gray-300' : 'border-red-500'
                                    } rounded-2xl px-4 py-4 text-md font-bold`}
                                placeholder="Enter Your Card Name"
                                placeholderTextColor={(theme?.extend?.colors as {placeholderTextColor: string}).placeholderTextColor}
                                onChangeText={handleCardNameChange}
                                value={cardName}
                                keyboardType="default"
                                autoCapitalize="words"
                                autoComplete="name"
                            />

                            {!isCardNameValid && (
                                <Text className="text-red-500 text-sm px-3 mb-2">
                                    Card name should not contain special characters
                                </Text>
                            )}
                        </View>

                        <View className="flex-row mx-7 mb-4">
                            <TouchableOpacity
                                className={`flex-1 p-4 rounded-full overflow-hidden items-center justify-center ${!cardName ? 'bg-[#EEEEEE]' : 'bg-primary'
                                    }`}
                                onPress={handleSubmit}
                                disabled={cardName.length === 0}
                            >
                                <Text className="items-center justify-center text-base text-white font-bold">
                                    Add Card
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default memo(AddCardModal)