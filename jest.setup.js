import 'react-native-gesture-handler/jestSetup';

// Mock the expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
  }));

// Mock the redux store
jest.mock('./store/store', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
  },
}));

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));


// Mock the theme
jest.mock('./tailwind.config', () => ({
  theme: {
    extend: {
      colors: {
        primary: '#01D167',
        white: '#FFFFFF',
        switchInactiveTrackColor: '#EEEEEE',
      },
    },
  },
}));