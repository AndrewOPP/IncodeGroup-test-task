import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Column } from './Column';
import { Issue } from 'types/types';
const mockIssue: Issue[] = [
  {
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
    title: 'Test Issue2',
    updated_at: '2022-04-07T12:00:00Z',
    url: 'https://api.github.com/issues/1',
    user: { login: '1' },
    status: null,
  },
  {
    active_lock_reason: null,
    assignee: null,
    assignees: [],
    author_association: 'OWNER',
    body: 'This is a test issue bodyy.',
    closed_at: null,
    comments: 4,
    comments_url: 'https://api.github.com/issues/2/comments',
    created_at: '2022-04-07T10:00:00Z',
    events_url: 'https://api.github.com/issues/2/events',
    html_url: 'https://github.com/user/repo/issues/2',
    id: 2,
    labels: ['bug'],
    labels_url: 'https://api.github.com/issues/2/labels{/name}',
    locked: false,
    milestone: null,
    node_id: 'MDU6SXNzdWUx',
    number: 2,
    performed_via_github_app: null,
    reactions: null,
    repository_url: 'https://api.github.com/repos/user/repo',
    state: 'open',
    state_reason: null,
    timeline_url: 'https://api.github.com/issues/2/timeline',
    title: 'Test Issue',
    updated_at: '2022-04-07T12:00:00Z',
    url: 'https://api.github.com/issues/2',
    user: { login: '2' },
    status: null,
  },
];

describe('Column', () => {
  it('renders the title', () => {
    const title = 'To Do';
    const issues = [];
    const id = 'column-1';
    const { getByText } = render(
      <Column title={title} issues={issues} id={id} />
    );
    expect(getByText(title)).toBeInTheDocument();
  });
  it('renders an IssueCard for each issue', () => {
    const title = 'In Progress';
    const id = 'column-2';
    const { getByText } = render(
      <Column title={title} issues={mockIssue} id={id} />
    );
    expect(getByText('Test Issue')).toBeInTheDocument();
    expect(getByText('Test Issue2')).toBeInTheDocument();
  });
});
