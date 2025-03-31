# Debit Card Management App

A mobile application built with React Native and Expo that allows users to manage multiple debit cards, set spending limits, and toggle card status.

## Features

- View and manage multiple debit cards
- Card carousel with intuitive navigation
- Set and manage weekly spending limits
- Toggle card active/inactive status
- Add new cards to your account

## Advanced Features

1. **Cross-Platform Functionality**: Fully compatible with both iOS and Android platforms
2. **Performance Optimization**: Implemented React hooks (useCallback, useMemo) to optimize rendering and prevent unnecessary re-renders
3. **Redux Thunk Implementation**: Integrated Redux Thunk middleware for handling asynchronous operations and API requests
4. **Unit Testing**: Comprehensive test coverage for major components ensuring reliability and stability
5. **Form Validation**: Robust validation for card entry forms and spending limit inputs to ensure data integrity


## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio with an emulator set up

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/debit-card-app.git
   cd debit-card-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the App

### Using Expo Go

1. Start the development server:
   ```bash
   npm run start
   ```

2. For Android:
   - Install the Expo Go app from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - Scan the QR code displayed in your terminal with the Expo Go app
   - Alternatively, press 'a' in the terminal to open the app in a connected Android emulator

3. For iOS:
   - Install the Expo Go app from the [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Scan the QR code with your iPhone camera and tap the notification
   - Alternatively, press 'i' in the terminal to open the app in the iOS simulator

### Development Builds

For a more complete testing experience with all native features:

1. Create a development build:
   ```bash
   npx expo prebuild
   ```

2. Run on Android:
   ```bash
   npx expo run:android
   ```

3. Run on iOS:
   ```bash
   npx expo run:ios
   ```

## Running Tests

To run the test suite:

```bash
npm run test
```

## Project Structure

- `/app` - Main application code using Expo Router file-based routing
- `/components` - Reusable UI components
- `/store` - Redux store configuration and slices
- `/interfaces` - TypeScript interfaces

## Technologies Used

- React Native
- Expo
- Redux Toolkit
- TypeScript
- NativeWind (Tailwind CSS for React Native)

## Troubleshooting

- If you encounter issues with dependencies, try clearing the cache:
  ```bash
  npx expo start --clear
  ```

## License

[MIT](LICENSE)