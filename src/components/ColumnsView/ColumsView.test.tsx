import '@testing-library/jest-dom/extend-expect';
import { ColumnsView } from './ColumnsView';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.js';

describe('ColumnsView', () => {
  it('renders three Column components', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <ColumnsView />
      </Provider>
    );

    const columns = getAllByTestId('column');
    expect(columns).toHaveLength(3);
  });

  it('renders the correct titles for each Column', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ColumnsView />
      </Provider>
    );

    expect(getByText('ToDo')).toBeInTheDocument();
    expect(getByText('In Progress')).toBeInTheDocument();
    expect(getByText('Done')).toBeInTheDocument();
  });
});
