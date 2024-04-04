import { createSlice } from '@reduxjs/toolkit';

const issuesInitialState = [[]];

const issuesSlice = createSlice({
  name: 'issues',
  initialState: issuesInitialState,
  reducers: {
    setIssues: {
      reducer(state, action) {
        return (state = action.payload);
      },
    },
  },
});

export const { setIssues } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
