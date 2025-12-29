import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedActivityIds: [],
    language: 'en', // default language
};

export const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        toggleActivitySelection: (state, action) => {
            const activityId = action.payload;
            const index = state.selectedActivityIds.indexOf(activityId);
            if (index > -1) {
                state.selectedActivityIds.splice(index, 1);
            } else {
                state.selectedActivityIds.push(activityId);
            }
        },
        setActivitySelection: (state, action) => {
            state.selectedActivityIds = action.payload;
        },
        clearActivitySelection: (state) => {
            state.selectedActivityIds = [];
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    },
});

export const { toggleActivitySelection, setActivitySelection, clearActivitySelection, setLanguage } = selectionSlice.actions;

export default selectionSlice.reducer;
