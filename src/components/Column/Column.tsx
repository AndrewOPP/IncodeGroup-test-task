import { IssueCard } from 'components/IssueCard/IssueCard';
import { Issue } from 'types/types';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { StyledList, StyledTitle } from './Column.styled';

type Props = {
  issues: Issue[];
  title: string;
  id: string;
};

export const Column: React.FC<Props> = ({ title, issues, id }) => {
  const issuesIds = useMemo(() => {
    return issues.map(issue => issue.id);
  }, [issues]);

  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: 'Column',
      title,
    },
  });

  return (
    <div data-testid="column">
      <StyledTitle as="h1">{title}</StyledTitle>

      <StyledList ref={setNodeRef}>
        <SortableContext items={issuesIds}>
          {issues.map(issue => {
            return <IssueCard key={issue.id} issue={issue} />;
          })}
        </SortableContext>
      </StyledList>
    </div>
  );
};
