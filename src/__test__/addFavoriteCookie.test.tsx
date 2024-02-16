import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RepoList from '../components/RepoList';
import { Repository } from '../utils/interfaces';

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

describe('RepoList Component', () => {
  const mockRepos = [
    { 
      name: 'repo1',
      description: 'description',
      url: 'https://github.com/repo1',
      stargazers: { totalCount: 1 },
      primaryLanguage: { name: 'JavaScript' }
    },
    { 
      name: 'repo2',
      description: 'description',
      url: 'https://github.com/repo2',
      stargazers: { totalCount: 2 }, 
      primaryLanguage: { name: 'Typescript' }
    },
  ];

  const mockSelectedUser = 'testUser';
  const mockSelectedLanguage = 'JavaScript';
  const mockSetSelectedLanguage = jest.fn();
  const mockFavoriteRepos: Repository[] = [];

  it('handles favorite toggle correctly', async () => {
    const { getByText } = render(
      <RepoList
        repos={mockRepos}
        selectedUser={mockSelectedUser}
        selectedLanguage={mockSelectedLanguage}
        setSelectedLanguage={mockSetSelectedLanguage}
        favoriteRepos={mockFavoriteRepos}
      />
    );

    jest.spyOn(require('js-cookie'), 'get').mockReturnValueOnce('[]');

    jest.spyOn(require('js-cookie'), 'set');

    jest.spyOn(require('../api/favoritesCall'), 'getFavoritesData');

    fireEvent.click(getByText('Favorites'));

    await waitFor(() => {
      expect(require('../api/favoritesCall').getFavoritesData).toHaveBeenCalled();
      expect(require('js-cookie').set).toHaveBeenCalledWith('favorites', JSON.stringify([{ repoName: 'repo1', owner: mockSelectedUser }])
      );
    });
  });
});
