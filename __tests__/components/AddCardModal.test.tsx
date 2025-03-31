import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddCardModal from '../../components/AddCardModal';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';



const mockStore = configureStore([]);

describe('AddCardModal', () => {
    const mockSetModalVisible = jest.fn();
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            cards: {
                cardsList: [],
                activeCardIndex: 0,
            },
        });
        store.clearActions();
    });


    it('renders correctly when visible', () => {
        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <AddCardModal
                    isModalVisible={true}
                    setModalVisible={mockSetModalVisible}
                />
            </Provider>
        );

        expect(getByPlaceholderText('Enter Your Card Name')).toBeTruthy();
        expect(getByText('Add Card')).toBeTruthy();
    });

    it('validates card name without special characters', () => {
        const { getByPlaceholderText, queryByText, getByText } = render(
            <Provider store={store}>
                <AddCardModal
                    isModalVisible={true}
                    setModalVisible={mockSetModalVisible}
                />
            </Provider>
        );

        const input = getByPlaceholderText('Enter Your Card Name');
        fireEvent.changeText(input, 'John@Doe');
        const addButton = getByText('Add Card');
        fireEvent.press(addButton);


        expect(queryByText('Card name should not contain special characters')).toBeTruthy();
    });
});