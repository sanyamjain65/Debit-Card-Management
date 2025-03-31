import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import DebitCard from '../../components/DebitCard';

jest.mock('@/constants/images', () => ({
  Images: {
    HideEye: (props) => <div data-testid="hide-eye" {...props} />,
    ShowEye: (props) => <div data-testid="show-eye" {...props} />,
    Home: (props) => <div data-testid="home-icon" {...props} />
  }
}));

describe('DebitCard Component', () => {
  const mockCardDetails = {
    cardHolder: 'John Doe',
    cardNumber: '1234567890123456',
    expiryDate: '12/25',
    cvv: '123'
  };

  it('renders correctly when card is active', () => {
    const { getByText, getByTestId } = render(
      <DebitCard 
        isCardActive={true} 
        cardDetails={mockCardDetails} 
      />
    );

    expect(getByText('John Doe')).toBeTruthy();
    
    expect(getByText('••••    ••••    ••••    ••••')).toBeTruthy();
    
    expect(getByText('Thru: 12/25')).toBeTruthy();
    
    expect(getByText('CVV: ***')).toBeTruthy();
    
    expect(getByText('VISA')).toBeTruthy();
    
    expect(getByText('Show card number')).toBeTruthy();
    
    expect(getByText('aspire')).toBeTruthy();
  });

  it('renders correctly when card is frozen', () => {
    const { getByText, queryByText } = render(
      <DebitCard 
        isCardActive={false} 
        cardDetails={mockCardDetails} 
      />
    );

    expect(getByText('CARD FROZEN')).toBeTruthy();
    
    expect(queryByText('Show card number')).toBeNull();
  });

  it('toggles card number visibility when show/hide button is pressed', () => {
    const { getByText, queryByText, getByTestId } = render(
      <DebitCard 
        isCardActive={true} 
        cardDetails={mockCardDetails} 
      />
    );

    expect(getByText('••••    ••••    ••••    ••••')).toBeTruthy();
    expect(getByText('CVV: ***')).toBeTruthy();
    
    fireEvent.press(getByText('Show card number'));
    
    expect(getByText('1234    5678    9012    3456')).toBeTruthy();
    expect(getByText('CVV: 123')).toBeTruthy();
    expect(getByText('Hide card number')).toBeTruthy();
    
    fireEvent.press(getByText('Hide card number'));
    
    expect(getByText('••••    ••••    ••••    ••••')).toBeTruthy();
    expect(getByText('CVV: ***')).toBeTruthy();
    expect(getByText('Show card number')).toBeTruthy();
  });

  it('formats card number correctly', () => {
    const { getByText } = render(
      <DebitCard 
        isCardActive={true} 
        cardDetails={mockCardDetails} 
      />
    );
    
    fireEvent.press(getByText('Show card number'));
    
    expect(getByText('1234    5678    9012    3456')).toBeTruthy();
  });
});