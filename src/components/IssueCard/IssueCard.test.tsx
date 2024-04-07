import { render } from '@testing-library/react';
import { IssueCard } from './IssueCard.tsx';
import '@testing-library/jest-dom/extend-expect';

export const mockIssue = {
  active_lock_reason: null,
  assignee: null,
  assignees: [],
  author_association: 'OWNER',
  body: 'This is a test issue body.',
  closed_at: null,
  comments: 3,
  comments_url: 'https://api.github.com/issues/1/comments',
  created_at: '2022-04-07T10:00:00Z',
  events_url: 'https://api.github.com/issues/1/events',
  html_url: 'https://github.com/user/repo/issues/1',
  id: 1,
  labels: ['bug'],
  labels_url: 'https://api.github.com/issues/1/labels{/name}',
  locked: false,
  milestone: null,
  node_id: 'MDU6SXNzdWUx',
  number: 1,
  performed_via_github_app: null,
  reactions: null,
  repository_url: 'https://api.github.com/repos/user/repo',
  state: 'open',
  state_reason: null,
  timeline_url: 'https://api.github.com/issues/1/timeline',
  title: 'Test Issue',
  updated_at: '2022-04-07T12:00:00Z',
  url: 'https://api.github.com/issues/1',
  user: { login: '1' },
  status: null,
};

describe('IssueCard', () => {
  it('right IssueCard render', () => {
    const { getByText } = render(<IssueCard issue={mockIssue} />);

    expect(getByText(mockIssue.title)).toBeInTheDocument();
    expect(getByText(`#${mockIssue.number}`)).toBeInTheDocument();
    expect(getByText(`Comments: ${mockIssue.comments}`)).toBeInTheDocument();
    expect(getByText(mockIssue.user.login)).toBeInTheDocument();
  });
});
