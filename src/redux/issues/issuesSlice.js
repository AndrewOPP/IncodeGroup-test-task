import { createSlice } from '@reduxjs/toolkit';

const issuesInitialState = [[]];

const issuesSlice = createSlice({
  name: 'issues',
  initialState: issuesInitialState,
  reducers: {
    setIssues: {
      reducer(state, action) {
        return (state = action.payload.map(issue => {
          if (issue.state === 'open' && !issue.assignee) {
            return { ...issue, status: 'ToDo' };
          }
          if (issue.state === 'open' && issue.assignee) {
            return { ...issue, status: 'In Progress' };
          }
          if (issue.state === 'closed') {
            return { ...issue, status: 'Done' };
          }
        }));
      },
    },
    updateIssues: {
      reducer(state, action) {
        return (state = action.payload);
      },
    },
  },
});

export const { setIssues, updateIssues } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
