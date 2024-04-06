import { arrayMove } from '@dnd-kit/sortable';
import { useDispatch } from 'react-redux';
import { setIssues } from '../redux/issues/issuesSlice';

export const setRightIssue = (activeId, overId, issues, dispatch) => {
  const activeIndex = issues.findIndex(t => t.id === activeId);
  const overIndex = issues.findIndex(t => t.id === overId);
  dispatch(setIssues(arrayMove(issues, overIndex, activeIndex)));
  console.log(arrayMove(issues, overIndex, activeIndex));
  return arrayMove(issues, overIndex, activeIndex);
};
