import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import CardAction from '../../components/CardAction';
import { router } from 'expo-router'; 

const MockIcon = (props: any) => <div data-testid="mock-icon" {...props}>Icon</div>;

type RootState = {
    cards: {
        activeCardIndex: number;
    };
};
const mockStore = configureStore([]);

jest.mock('@/store/slices/cardSlice', () => ({
    updateCardLimitAsync: jest.fn((payload) => ({ type: 'cards/updateCardLimitAsync/pending', payload })),
    updateCardStatusAsync: jest.fn((payload) => ({ type: 'cards/updateCardStatusAsync/pending', payload })),
}));


describe('CardAction Component', () => {
    let store: ReturnType<typeof mockStore>;
    const mockOnPress = jest.fn();
    const initialCardDetails = {
        weeklyLimitSet: false,
        cardActive: true,
    };
    const initialState: RootState = {
        cards: { activeCardIndex: 0 },
    };

    beforeEach(() => {
        store = mockStore(initialState);
        store.clearActions();
        mockOnPress.mockClear();
        (router.push as jest.Mock).mockClear();
        (require('@/store/slices/cardSlice').updateCardLimitAsync as jest.Mock).mockClear();
        (require('@/store/slices/cardSlice').updateCardStatusAsync as jest.Mock).mockClear();
    });

    it('renders title, description, and icon correctly', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <CardAction
                    title="Test Title"
                    description="Test Description"
                    Icon={MockIcon}
                    onPress={mockOnPress}
                    cardDetails={initialCardDetails} 
                />
            </Provider>
        );

        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Description')).toBeTruthy();
    });

    it('does not render Switch when showSwitch is false or undefined', () => {
        const { queryByRole } = render(
            <Provider store={store}>
                <CardAction
                    title="Test"
                    description="Test"
                    Icon={MockIcon}
                    onPress={mockOnPress}
                    cardDetails={initialCardDetails}
                />
            </Provider>
        );

        expect(queryByRole('switch')).toBeNull();
    });

    it('renders Switch when showSwitch is true', () => {
        const { getByRole } = render(
            <Provider store={store}>
                <CardAction
                    title="Test"
                    description="Test"
                    Icon={MockIcon}
                    showSwtich={true}
                    type="someType"
                    cardDetails={initialCardDetails}
                    onPress={mockOnPress}
                />
            </Provider>
        );

        expect(getByRole('switch')).toBeTruthy();
    });

    describe('Switch Functionality', () => {
        it('navigates to SpendingLimit when weeklyLimit switch is toggled ON', () => {
            const { getByRole } = render(
                <Provider store={store}>
                    <CardAction
                        title="Weekly Limit"
                        description="Set limit"
                        Icon={MockIcon}
                        showSwtich={true}
                        type="weeklyLimit"
                        cardDetails={{ ...initialCardDetails, weeklyLimitSet: false }} 
                        onPress={mockOnPress}
                    />
                </Provider>
            );

            const switchControl = getByRole('switch');
            fireEvent(switchControl, 'valueChange', true); 

            expect(router.push).toHaveBeenCalledWith('/spendingLimit');
            expect(store.getActions()).toEqual([]);
        });

        it('dispatches updateCardLimitAsync when weeklyLimit switch is toggled OFF', () => {
            const { getByRole } = render(
                <Provider store={store}>
                    <CardAction
                        title="Weekly Limit"
                        description="Set limit"
                        Icon={MockIcon}
                        showSwtich={true}
                        type="weeklyLimit"
                        cardDetails={{ ...initialCardDetails, weeklyLimitSet: true }}
                        onPress={mockOnPress}
                    />
                </Provider>
            );

            const switchControl = getByRole('switch');
            fireEvent(switchControl, 'valueChange', false); 

            expect(require('@/store/slices/cardSlice').updateCardLimitAsync).toHaveBeenCalledWith({
                activeCardIndex: 0,
                weeklyLimit: 0,
                weeklyLimitSet: false,
            });
            expect(router.push).not.toHaveBeenCalled();
        });

        it('dispatches updateCardStatusAsync when non-weeklyLimit switch is toggled', () => {
            const cardDetailsActive = { ...initialCardDetails, cardActive: true }; 
            const { getByRole } = render(
                <Provider store={store}>
                    <CardAction
                        title="Freeze Card"
                        description="Disable card"
                        Icon={MockIcon}
                        showSwtich={true}
                        type="freezeCard" 
                        cardDetails={cardDetailsActive}
                        onPress={mockOnPress}
                    />
                </Provider>
            );

            const switchControl = getByRole('switch');
            fireEvent(switchControl, 'valueChange', true);

            expect(require('@/store/slices/cardSlice').updateCardStatusAsync).toHaveBeenCalledWith({
                activeCardIndex: 0,
                status: false, 
            });

            expect(store.getActions()).toContainEqual(
                expect.objectContaining({ type: 'cards/updateCardStatusAsync/pending' })
            );
        });
    });
});