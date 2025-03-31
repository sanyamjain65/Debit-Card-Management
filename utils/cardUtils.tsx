

export const generateCardNumber = () => Array.from({length: 16}, () => Math.floor(Math.random() * 10)).join('');


export const generateExpiryDate = () => {
    const currentDate = new Date();
    const randomYears = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
    const expiryDate = new Date(currentDate.getFullYear() + randomYears, currentDate.getMonth());
    const formattedExpiry = `${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}/${expiryDate.getFullYear().toString().slice(-2)}`;
    return formattedExpiry;
}

export const generateCVV = () => Math.floor(Math.random() * 900) + 100;