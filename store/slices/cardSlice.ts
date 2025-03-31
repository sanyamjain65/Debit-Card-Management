import { CardsState, Card } from '@/interfaces/interface';
import { api } from '../..//services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const initialState: CardsState = {
    cardsList: [],
    activeCardIndex: 0,
};
export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async () => {
        try {
            const response = await api.getCards();
            return response;
        } catch (error) {
            return [];
        }
    }
);

export const addCardAsync = createAsyncThunk(
    'cards/addCard',
    async (cardData: {cardNumber: string, cardHolder: string, expiryDate: string, cvv: string}) => {
        const newCard = await api.addCard(cardData);
        return newCard;
    }
);

export const updateCardStatusAsync = createAsyncThunk(
    'cards/updateCardStatus',
    async (params: {activeCardIndex: number, status: boolean}, thunkAPI) => {
        const state = thunkAPI.getState() as { cards: CardsState };
        const cardData = state.cards.cardsList[params.activeCardIndex];
        let newCard = { ...cardData, cardActive: params.status };
        const updatedCard = await api.updateCard(newCard);
        return updatedCard;
    }
);

export const updateCardLimitAsync = createAsyncThunk(
    'cards/updateCardLimitAsync',
    async (params: { activeCardIndex: number, weeklyLimit: number, weeklyLimitSet: boolean }, thunkAPI) => {
        const state = thunkAPI.getState() as { cards: CardsState };
        const cardData = state.cards.cardsList[params.activeCardIndex];
        let newCard = { ...cardData, weeklyLimit: params.weeklyLimit, weeklyLimitSet: params.weeklyLimitSet, totalSpend: Math.floor(params.weeklyLimit * 0.20)};
        const updatedCard = await api.updateCard(newCard);
        return updatedCard;
    }
);

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setActiveCardIndex: (state: any, action: PayloadAction<number>) => {
            state.activeCardIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cardsList = action.payload;
                state.activeCardIndex = 0;
            })
            .addCase(addCardAsync.fulfilled, (state, action) => {
                state.cardsList.push(action.payload);
            })
            .addCase(updateCardStatusAsync.fulfilled, (state, action) => {
                state.cardsList[state.activeCardIndex] = action.payload;
            })
            .addCase(updateCardLimitAsync.fulfilled, (state, action) => {
                state.cardsList[state.activeCardIndex] = action.payload;
            })
    },
});

export const { setActiveCardIndex} = cardsSlice.actions;
export default cardsSlice.reducer;