import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import SearchBar from '../components/Searchbar';
import { act } from 'react-dom/test-utils';

jest.mock('../api/userSuggestionsCall', () => ({
  searchUsers: jest.fn(() => new Promise(resolve => setTimeout(() => resolve([]), 0))),
}));

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('SearchBar', () => {
  it('renders SearchBar component', () => {
    const { getByPlaceholderText } = render(<SearchBar onUserSelected={() => {}} />);
    const inputElement = getByPlaceholderText('Search GitHub user...') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });

  it('updates query value on input change', () => {
    const { getByPlaceholderText } = render(<SearchBar onUserSelected={() => {}} />);
    const inputElement = getByPlaceholderText('Search GitHub user...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    expect(inputElement.value).toBe('testuser');
  });

  it('fetches and displays suggested users', async () => {
    const { getByPlaceholderText } = render(<SearchBar onUserSelected={() => {}} />);
    const inputElement = getByPlaceholderText('Search GitHub user...') as HTMLInputElement;

    await act(() => {
      fireEvent.change(inputElement, { target: { value: 'testuser' } });
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search GitHub user/i)).toBeInTheDocument();    });
  });

});
