import { Issue } from 'types/types';

export const changeIssuesStatus = (
  activeIssue: Issue,
  // eslint-disable-next-line
  over: any,
  allIssues: Issue[],
  changeType: 'issue' | 'column'
): Issue[] => {
  if (changeType === 'issue') {
    return allIssues.map(issue => {
      if (issue.id === activeIssue.id) {
        return { ...issue, status: over.status };
      }
      return issue;
    });
  }

  if (changeType === 'column') {
    return allIssues.map(issue => {
      if (issue.id === activeIssue.id) {
        return { ...issue, status: over.title };
      }
      return issue;
    });
  }
};
