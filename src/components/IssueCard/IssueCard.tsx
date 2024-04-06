import { Issue } from 'types/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
type Props = {
  issue: Issue;
};

export const IssueCard: React.FC<Props> = ({ issue }) => {
  const {
    title,
    number,
    user: { login },
    comments,
    created_at,
    id,
  } = issue;

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
      type: 'Issue',
      issue,
    },
    // disabled: editMode,
  });

  if (isDragging) {
    return (
      <li
        ref={setNodeRef}
        style={{
          opacity: '60%',
          height: '132px',
          backgroundColor: 'white',
          transition,
          transform: CSS.Transform.toString(transform),
          border: '1px solid black',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '15px',
        }}
      ></li>
    );
  }
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: '1px solid black',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: 'white',
  };

  const findDateDiff = (): number => {
    const date1 = new Date(created_at);
    const date2 = new Date();
    const diff = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p
        style={{
          fontSize: '20px',
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <p className="cardP">{`#` + number}</p>
        <p className="cardP">
          {findDateDiff()
            ? `opened ${findDateDiff()} days ago`
            : `opened today`}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <p className="cardP">{login}</p>
        <p className="cardP">Comments: {comments}</p>
      </div>
    </li>
  );
};
