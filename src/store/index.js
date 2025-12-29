import { configureStore } from '@reduxjs/toolkit';
import selectionReducer, { selectionSlice } from './selectionSlice';
import { loadState, saveState } from './localStorage';

const preloadedStateFromStorage = loadState();

// Merge preloaded state with initial state to handle new properties like 'language'
const preloadedState = preloadedStateFromStorage ? {
    selection: {
        ...selectionSlice.getInitialState(),
        ...preloadedStateFromStorage.selection
    }
} : undefined;

export const store = configureStore({
    reducer: {
        selection: selectionReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState({
        selection: store.getState().selection
    });
});
