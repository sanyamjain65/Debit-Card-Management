import React from 'react';
import { render } from '@testing-library/react-native';
import { describe, it, expect, jest } from '@jest/globals';
import SpendingLimitBar from '../../components/SpendingLimitBar';

jest.mock('@/tailwind.config', () => ({
  theme: {
    extend: {
      colors: {
        primary: '#01D167'
      }
    }
  }
}));

describe('SpendingLimitBar Component', () => {
  it('renders correctly with basic props', () => {
    const { getByText } = render(
      <SpendingLimitBar spent={500} limit={1000} />
    );

    expect(getByText('Debit card spending limit')).toBeTruthy();
    
    expect(getByText('$500')).toBeTruthy();
    
    expect(getByText('|  $1,000')).toBeTruthy();
  });

  it('formats amount values with commas', () => {
    const { getByText } = render(
      <SpendingLimitBar spent={1234567} limit={9876543} />
    );
    
    expect(getByText('$1,234,567')).toBeTruthy();
    
    expect(getByText('|  $9,876,543')).toBeTruthy();
  });

  it('handles zero values correctly', () => {
    const { getByText } = render(
      <SpendingLimitBar spent={0} limit={1000} />
    );
    
    expect(getByText('$0')).toBeTruthy();
  });

  it('handles decimal values correctly', () => {
    const { getByText } = render(
      <SpendingLimitBar spent={500.75} limit={1000.50} />
    );
    
    expect(getByText('$500.75')).toBeTruthy();
    expect(getByText('|  $1,000.5')).toBeTruthy();
  });

  it('handles string inputs by parsing them to numbers', () => {
    const { getByText } = render(
      // @ts-ignore - Intentionally passing strings to test parsing
      <SpendingLimitBar spent="300" limit="1000" />
    );
    
    expect(getByText('$300')).toBeTruthy();
    expect(getByText('|  $1,000')).toBeTruthy();
  });
});