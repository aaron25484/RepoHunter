import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Favorites from '../pages/Favorites';
import Cookies from 'js-cookie';
import * as FavoritesApi from '../api/favoritesCall';

// Mocking the necessary dependencies
jest.mock('js-cookie');

jest.mock('../api/favoritesCall', () => ({
  getFavoritesData: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Favorites Component', () => {
  const mockFavoritesData = [
    { repository: { name: 'repo1', description: 'Description 1', url: 'https://github.com/repo1', stargazers: { totalCount: 100 }, primaryLanguage: { name: 'JavaScript' } } },
    { repository: { name: 'repo2', description: 'Description 2', url: 'https://github.com/repo2', stargazers: { totalCount: 200 }, primaryLanguage: { name: 'TypeScript' } } },
  ];

  beforeEach(() => {
    // Reset the mock implementation for each test
    jest.resetAllMocks();
  });

  it('renders favorite repositories and handles removal correctly', async () => {
    // Mocking Cookies.get to return stored favorites
    jest.spyOn(Cookies, 'get').mockReturnValueOnce(JSON.stringify([{ repoName: 'repo1' }, { repoName: 'repo2' }])as string);

    // Mocking the getFavoritesData function
    jest.spyOn(FavoritesApi, 'getFavoritesData').mockResolvedValue(mockFavoritesData);

    // Mocking Cookies.set
    jest.spyOn(Cookies, 'set').mockImplementation((key: string, value: string) => {
      // Custom mock implementation, you can adjust it based on your needs
      const mockCookies: { [key: string]: string } = {};
      mockCookies[key] = value;
      Cookies['__mockCookies'] = mockCookies;
    });

    const { getByText, getAllByRole, queryByText } = render(<Favorites />);

    // Ensure that the loading state is not displayed
    await waitFor(() => {
      expect(getByText('repo1')).toBeInTheDocument();
    expect(getByText('repo2')).toBeInTheDocument();
    });

    const deleteButtons = getAllByRole('button', { name: /Delete/i });
    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });
  
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('favorites', expect.any(String));
      expect(queryByText('repo1')).toBeNull();
    });
  });
});
