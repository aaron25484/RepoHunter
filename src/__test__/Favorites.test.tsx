import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Favorites from '../pages/Favorites';
import Cookies from 'js-cookie';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

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
    jest.resetAllMocks();
  });

  it('renders favorite repositories and handles removal correctly', async () => {
    jest.spyOn(require('js-cookie'), 'get').mockReturnValueOnce(JSON.stringify([{ repoName: 'repo1' }, { repoName: 'repo2' }]));

    jest.spyOn(require('../api/favoritesCall'), 'getFavoritesData').mockResolvedValue(mockFavoritesData);

    const { getByText, getAllByRole, queryByText } = render(<Favorites />);

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
