import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Theme types available in the application
 */
export type ThemeType = 'theme-1' | 'theme-2' | 'theme-3';

/**
 * Theme state interface
 */
interface ThemeState {
  currentTheme: ThemeType;
  isLoading: boolean;
}

/**
 * Get initial theme from localStorage or default to theme-1
 */
const getInitialTheme = (): ThemeType => {
  try {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    return savedTheme && ['theme-1', 'theme-2', 'theme-3'].includes(savedTheme) 
      ? savedTheme 
      : 'theme-1';
  } catch {
    return 'theme-1';
  }
};

/**
 * Initial state for theme slice
 */
const initialState: ThemeState = {
  currentTheme: getInitialTheme(),
  isLoading: false,
};

/**
 * Theme slice for Redux state management
 * Handles theme switching with localStorage persistence
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Set the current theme
     * @param state - Current theme state
     * @param action - Payload containing the new theme
     */
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
      // Persist theme to localStorage
      try {
        localStorage.setItem('theme', action.payload);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    },
    /**
     * Set loading state for theme operations
     * @param state - Current theme state
     * @param action - Payload containing loading state
     */
    setThemeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTheme, setThemeLoading } = themeSlice.actions;
export default themeSlice.reducer; 