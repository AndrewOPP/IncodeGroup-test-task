import { Column } from '../../components/Column/Column';
import { useSelector } from 'react-redux';
import { selectAllIssues } from '../../redux/issues/issuesSelectors';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { setRightIssue } from '../../helpers/setRightIssue.js';
import { changeIssuesStatus } from '../../helpers/changeIssuesStatus.js';
import { createPortal } from 'react-dom';
import { IssueCard } from 'components/IssueCard/IssueCard.tsx';
import { useDispatch } from 'react-redux';
import { updateIssues } from '../../redux/issues/issuesSlice.js';
import { Issue } from 'types/types.js';
import { log } from 'console';

export const ColumnsView = () => {
  const issues = useSelector(selectAllIssues);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const [currentIssues, setCurrentIssues] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (issues.length && !localStorage.getItem(issues[0].repository_url)) {
      setCurrentIssues(issues);
    }
  }, [issues, currentIssues, dispatch]);

  useEffect(() => {
    if (localStorage.getItem(issues[0].repository_url)) {
      const localeIssues = JSON.parse(
        localStorage.getItem(issues[0].repository_url)
      );
      console.log(localeIssues, 'locale');

      setCurrentIssues(localeIssues);
    }
  }, [issues]);

  useEffect(() => {
    // if (!localStorage.getItem(issues[0].repository_url)) {
    //   console.log(localStorage.getItem(issues[0].repository_url));
    //   localStorage.setItem(
    //     issues[0].repository_url,
    //     JSON.stringify(currentIssues)
    //   );
    // } else {
    //   setCurrentIssues(
    //     JSON.parse(localStorage.getItem(issues[0].repository_url))
    //   );
    // }
    // if (localStorage.getItem(issues[0].repository_url)) {
    //   const localeIssues = JSON.parse(
    //     localStorage.getItem(issues[0].repository_url)
    //   );
    //   console.log(localeIssues, 'locale');
    //   setCurrentIssues(localeIssues);
    //   return;
    // }
  }, [issues]);

  // useEffect(() => {
  //   if (issues.length > 1) {
  //     localStorage.setItem(issues[0].repository_url, JSON.stringify(issues));
  //   }
  // }, [issues]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Issue';
    const isOverATask = over.data.current?.type === 'Issue';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const activeIndex = currentIssues.findIndex(t => t.id === activeId);
      const overIndex = currentIssues.findIndex(t => t.id === overId);

      if (
        currentIssues[activeIndex].status != currentIssues[overIndex].status
      ) {
        if (currentIssues[activeIndex].status)
          try {
            const updatedIssues = changeIssuesStatus(
              currentIssues[activeIndex],
              currentIssues[overIndex],
              currentIssues,
              'issue'
            );
            localStorage.setItem(
              issues[0].repository_url,
              JSON.stringify(
                arrayMove(updatedIssues, activeIndex, overIndex - 1)
              )
            );
            dispatch(
              updateIssues(arrayMove(updatedIssues, activeIndex, overIndex - 1))
            );
            return;
          } catch (error) {
            console.log(error);
          }
      }
      localStorage.setItem(
        issues[0].repository_url,
        JSON.stringify(arrayMove(currentIssues, activeIndex, overIndex))
      );
      dispatch(updateIssues(arrayMove(currentIssues, activeIndex, overIndex)));
    }
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      const activeIndex = currentIssues.findIndex(t => t.id === activeId);
      const updatedIssues = changeIssuesStatus(
        currentIssues[activeIndex],
        over.data.current,
        currentIssues,
        'column'
      );
      localStorage.setItem(
        issues[0].repository_url,
        JSON.stringify(arrayMove(updatedIssues, activeIndex, activeIndex))
      );
      dispatch(
        updateIssues(arrayMove(updatedIssues, activeIndex, activeIndex))
      );
    }
  };
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Issue') {
      setActiveIssue(event.active.data.current.issue);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveIssue(null);

    console.log();

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Column
          issues={currentIssues.filter(({ status }) => status === 'ToDo')}
          title={'ToDo'}
          id={'ToDo'}
        />
        <Column
          issues={currentIssues.filter(
            ({ status }) => status === 'In Progress'
          )}
          title={'In Progress'}
          id={'In Progress'}
        />
        <Column
          issues={currentIssues.filter(({ status }) => status === 'Done')}
          title={'Done'}
          id={'Done'}
        />
      </div>
      {createPortal(
        <DragOverlay>
          {activeIssue && <IssueCard issue={activeIssue} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
