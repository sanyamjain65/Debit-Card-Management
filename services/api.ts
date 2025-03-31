import { Card } from '../interfaces/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialCards: Card[] = [
    {
        id: 1,
        cardNumber: '5647341124132020',
        cardHolder: 'Mark Henry',
        expiryDate: '12/30',
        cvv: '456',
        cardActive: true,
        balance: '3000',
        weeklyLimitSet: false,
        weeklyLimit: 0,
        totalSpend: 0,
    },
]

export const api = {
    getCards: async(): Promise<Card[]> => {
        const cards = await AsyncStorage.getItem('cards');
        if (!cards) {
            await AsyncStorage.setItem('cards', JSON.stringify(initialCards));
            return Promise.resolve(initialCards);
        }
        return Promise.resolve(JSON.parse(cards));
    },

    addCard: async (card: any): Promise<Card> => {
        const cards: Card[] = JSON.parse(await AsyncStorage.getItem('cards') || '[]');
        const newCard: Card = {
            ...card,
            id: Date.now(),
            balance: "10000",
            weeklyLimitSet: false,
            weeklyLimit: -1,
            totalSpend: -1,
            cardActive: true,
        };
        cards.push(newCard);
        await AsyncStorage.setItem('cards', JSON.stringify(cards));
        return Promise.resolve(newCard);
    },

    updateCard: async(updatedCard: Card): Promise<Card> => {
        const cards: Card[] = JSON.parse(await AsyncStorage.getItem('cards') || '[]');
        const index = cards.findIndex(card => card.id === updatedCard.id);
        if (index !== -1) {
            cards[index] = updatedCard;
            await AsyncStorage.setItem('cards', JSON.stringify(cards));
        }
        return Promise.resolve(updatedCard);
    },

    clearCards: async () => {
        await AsyncStorage.removeItem('cards');
    }
};