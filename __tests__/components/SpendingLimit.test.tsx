import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import SpendingLimit from '../../app/spendingLimit';


jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }) => (
    <div data-testid={`icon-${name}`} style={{ fontSize: size, color }} {...props} />
  )
}));


jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  }
}));

jest.mock('@/constants/images', () => ({
  Images: {
    Home: (props) => <div data-testid="home-icon" {...props} />,
    SpendingLimit: (props) => <div data-testid="spending-limit-icon" {...props} />
  }
}));

jest.mock('@/tailwind.config', () => ({
  theme: {
    extend: {
      colors: {
        primary: '#01D167'
      }
    }
  }
}));

jest.mock('@/store/slices/cardSlice', () => ({
  updateCardLimitAsync: jest.fn(() => ({ type: 'cards/updateCardLimit/pending' }))
}));

const mockStore = configureStore([]);

describe('SpendingLimit Screen', () => {
  let store: any;
  
  beforeEach(() => {
    store = mockStore({
      cards: {
        activeCardIndex: 0
      }
    });
    
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SpendingLimit />
      </Provider>
    );
    
    expect(getByText('Spending limit')).toBeTruthy();
    
    expect(getByText('Set a weekly debit card spending limit')).toBeTruthy();
    expect(getByText('Here weekly means the last 7 days, not the calendar week')).toBeTruthy();
    
    expect(getByText('S$ 5,000')).toBeTruthy();
    expect(getByText('S$ 10,000')).toBeTruthy();
    expect(getByText('S$ 15,000')).toBeTruthy();
    
  });

  it('allows entering amount manually', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SpendingLimit />
      </Provider>
    );
    
    const input = getByPlaceholderText('');
    
    // Enter an amount
    fireEvent.changeText(input, '2000');
    
    const saveButton = getByText('Save');
    expect(saveButton?.parent?.props.disabled).toBeFalsy();
  });

  it('adds amount when quick amount button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SpendingLimit />
      </Provider>
    );
    
    const input = getByPlaceholderText('');
    fireEvent.changeText(input, '1000');
    fireEvent.press(getByText('S$ 5,000'));
    expect(input.props.value).toBe('6,000');
  });

  it('shows error when amount exceeds maximum limit', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <SpendingLimit />
      </Provider>
    );
    
    const input = getByPlaceholderText('');
    
    fireEvent.changeText(input, '50000');
    expect(queryByText(/Spending limit cannot be more than/)).toBeNull();
    fireEvent.changeText(input, '150000');
    expect(getByText(/Spending limit cannot be more than/)).toBeTruthy();
  });

  it('dispatches updateCardLimitAsync and navigates back when save is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SpendingLimit />
      </Provider>
    );
    
    const input = getByPlaceholderText('');
    fireEvent.changeText(input, '5000');
    fireEvent.press(getByText('Save'));
    expect(require('@/store/slices/cardSlice').updateCardLimitAsync).toHaveBeenCalledWith({
      activeCardIndex: 0,
      weeklyLimit: 5000,
      weeklyLimitSet: true
    });
    
    expect(require('expo-router').router.back).toHaveBeenCalled();
  });

  it('does not save when amount exceeds maximum limit', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SpendingLimit />
      </Provider>
    );
    
    const input = getByPlaceholderText('');
    fireEvent.changeText(input, '150000');
    fireEvent.press(getByText('Save'));
    expect(require('@/store/slices/cardSlice').updateCardLimitAsync).not.toHaveBeenCalled();
    expect(require('expo-router').router.back).not.toHaveBeenCalled();
  });
});