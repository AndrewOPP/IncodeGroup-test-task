import { Search } from './components/Search/Search';
import { ColumnsView } from './components/ColumnsView/ColumnsView';
export const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
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
