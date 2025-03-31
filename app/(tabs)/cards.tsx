import React, { useCallback, useEffect, useState, useMemo } from "react";
import { View, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import { Plus } from "react-native-feather";
import AddCardModal from "@/components/AddCardModal";
import DebitCard from "@/components/DebitCard";
import Header from "@/components/Header";
import { router } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { setActiveCardIndex, fetchCards, updateCardLimitAsync, updateCardStatusAsync } from '../../store/slices/cardSlice';
import CarouselNav from "@/components/CarouselNav";
import { theme } from "@/tailwind.config";
import { Card } from "@/interfaces/interface";
import CardActionsList from "@/components/CardActionsList";

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const LOADING_TIMEOUT = 1000;

const cards = () => {
    const dispatch = useDispatch();
    const { cardsList, activeCardIndex } = useSelector((state: RootState) => state.cards as { cardsList: Card[]; activeCardIndex: number });
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const activeCard = useMemo(() => cardsList[activeCardIndex], [cardsList, activeCardIndex]);

    const handleCardScroll = useCallback((event: { nativeEvent: { contentOffset: { x: number } } }) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffset / WINDOW_WIDTH);

        if (newIndex !== activeCardIndex) {
            setIsLoading(true);
            dispatch(setActiveCardIndex(newIndex));
            const timer = setTimeout(() => setIsLoading(false), LOADING_TIMEOUT);
            return () => clearTimeout(timer);
        }
    }, [activeCardIndex, dispatch]);

    const handleWeeklyLimitPress = useCallback(() => {
        if (!activeCard.weeklyLimitSet) {
            router.push('/spendingLimit');
            return;
        }
        dispatch(updateCardLimitAsync({ 
            activeCardIndex, 
            weeklyLimit: 0, 
            weeklyLimitSet: false 
        }) as any);
    }, [activeCard && activeCard.weeklyLimitSet, activeCardIndex, dispatch]);

    const handleCardStatusUpdate = useCallback(() => {
        dispatch(updateCardStatusAsync({
            activeCardIndex, 
            status: !activeCard.cardActive
        }) as any);
    }, [activeCard && activeCard.cardActive, activeCardIndex, dispatch]);

    useEffect(() => {
        dispatch(fetchCards() as any);
    }, [dispatch]);

    if (cardsList.length === 0) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator
                    size="large"
                    color={(theme?.extend?.colors as { primary: string }).primary}
                />
            </SafeAreaView>
        );
    }

    return (
       
        <SafeAreaView className="flex-1">
            <View className="bg-background flex-1">
                <Header balance={activeCard.balance} />
                <AddCardModal 
                    isModalVisible={isModalVisible} 
                    setModalVisible={setModalVisible} 
                />
                
                {/* Cards Carousel */}
                <View className="relative z-20 -mb-44">
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleCardScroll}
                    >
                        {cardsList.map((card, index) => (
                            <View key={index} style={{ width: WINDOW_WIDTH }}>
                                <DebitCard 
                                    isCardActive={card.cardActive} 
                                    cardDetails={card} 
                                />
                                {cardsList.length > 1 && (
                                    <View className="flex-row justify-center absolute bottom-1 left-0 right-0">
                                        {cardsList.map((_, dotIndex) => (
                                            <CarouselNav 
                                                key={dotIndex} 
                                                isActive={dotIndex === activeCardIndex} 
                                            />
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Card Actions Section */}
                <View className="flex-1 bg-white rounded-t-3xl z-10 overflow-hidden">
                    {isLoading ? (
                        <View className="flex-1 justify-center items-center mt-44">
                            <ActivityIndicator 
                                size="large" 
                                color={(theme?.extend?.colors as { primary: string }).primary} 
                            />
                        </View>
                    ) : (
                        <CardActionsList 
                            activeCard={activeCard}
                            handleWeeklyLimitPress={handleWeeklyLimitPress}
                            handleCardStatusUpdate={handleCardStatusUpdate}
                        />
                    )}
                </View>

                <TouchableOpacity
                    className="absolute bottom-20 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg z-50"
                    onPress={() => setModalVisible(true)}
                >
                    <Plus stroke="white" width={24} height={24} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default cards