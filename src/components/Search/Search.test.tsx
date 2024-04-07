import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Search } from './Search.tsx';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.js';
describe('Search', () => {
  it('renders form elements', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Enter repo link')).toBeInTheDocument();
    expect(screen.getByText('Load issues')).toBeInTheDocument();
  });
});
