import { Issue } from 'types/types';

export const selectAllIssues = (state): Issue[] => state.issues;
