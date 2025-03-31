export interface Card {
    id: number;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    cardActive: boolean;
    balance: string;
    weeklyLimitSet: boolean;
    weeklyLimit: number;
    totalSpend: number;
}

export interface CardsState {
    cardsList: Card[];
    activeCardIndex: number;
}
