import { IssueCard } from 'components/IssueCard/IssueCard';
import { Issue } from 'types/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useMemo } from 'react';

type Props = {
  issues: Issue[];
  title: string;
  id: string;
};

export const Column: React.FC<Props> = ({ title, issues, id }) => {
  // const [enabled] = useStrictDroppable(isYourDataLoading);

  const issuesIds = useMemo(() => {
    return issues.map(issue => issue.id);
  }, [issues]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'Column',
      title,
    },
  });

  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          fontSize: '36px',
          marginBottom: '20px',
        }}
      >
        {title}
      </p>

      <ul
        ref={setNodeRef}
        style={{
          listStyle: 'none',
          width: '350px',
          minHeight: '550px',
          backgroundColor: '#ced4da',
          padding: '20px',
          border: '1px solid black',
          borderRadius: '6px',
        }}
      >
        <SortableContext items={issuesIds}>
          {issues.map(issue => {
            return <IssueCard key={issue.id} issue={issue} />;
          })}
        </SortableContext>
      </ul>
    </div>
  );
};
