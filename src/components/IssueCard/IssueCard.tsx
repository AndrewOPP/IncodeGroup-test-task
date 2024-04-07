import { Issue } from 'types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  StyledCommendsBlock,
  StyledDataInfo,
  StyledIssueTitle,
  StyledLi,
  StyledLiPlaceHolder,
} from './IssuesCard.styled';
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
  });

  if (isDragging) {
    return (
      <StyledLiPlaceHolder
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
        }}
      />
    );
  }
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const findDateDiff = (): number => {
    const date1 = new Date(created_at);
    const date2 = new Date();
    const diff = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <StyledLi ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StyledIssueTitle>{title}</StyledIssueTitle>
      <StyledDataInfo>
        <p className="cardP">{`#` + number}</p>
        <p className="cardP">
          {findDateDiff()
            ? `opened ${findDateDiff()} days ago`
            : `opened today`}
        </p>
      </StyledDataInfo>
      <StyledCommendsBlock>
        <p className="cardP">{login}</p>
        <p className="cardP">Comments: {comments}</p>
      </StyledCommendsBlock>
    </StyledLi>
  );
};
