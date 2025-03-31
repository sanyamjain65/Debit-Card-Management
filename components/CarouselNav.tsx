import { View } from 'react-native'
import React from 'react'

const CarouselNav = ({isActive}: {isActive: boolean}) => {
    return (
        <View className={`h-2 w-2 mb-2 ml-2 rounded-full ${isActive ? 'bg-white' : 'bg-white/50'}`}/>
    )
}

export default CarouselNav