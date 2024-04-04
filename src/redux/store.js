import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { issuesReducer } from './issues/issuesSlice';

const rootReducer = combineReducers({
  issues: issuesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
