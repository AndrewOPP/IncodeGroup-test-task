import { Search } from './components/Search/Search';
import { ColumnsView } from './components/ColumnsView/ColumnsView';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Search />
      <ColumnsView />
    </div>
  );
};
