import { Search } from './components/Search/Search';
import { ColumnsView } from './components/ColumnsView/ColumnsView';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DndContext } from '@dnd-kit/core';
export const App = () => {
  // localStorage.setItem('lastSearches', 'werewr');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
        // width: '100%',
        marginTop: '40px',
        padding: 15,
      }}
    >
      <div>
        <Search />
        <ColumnsView />
      </div>
    </div>
  );
};
