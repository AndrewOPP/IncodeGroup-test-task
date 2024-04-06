export const changeIssuesStatus = (
  activeIssue,
  over,
  allIssues,
  changeType
) => {
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
