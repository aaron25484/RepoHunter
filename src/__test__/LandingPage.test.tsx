import { render, screen} from '@testing-library/react';
import LandingPage from '../pages/LandingPage';
import React from 'react';
import '@testing-library/jest-dom';

jest.mock('../api/mainDataCall', () => ({
  getMainData: jest.fn() as jest.MockedFunction<typeof import('../api/mainDataCall').getMainData>,
}));

jest.mock('../api/favoritesCall', () => ({
  getFavoritesData: jest.fn(),
}));

jest.mock('../api/userSuggestionsCall', () => ({
  searchUsers: jest.fn(() => new Promise(resolve => setTimeout(() => resolve([]), 0))),
}));

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('LandingPage component', () => {
  test('renders LandingPage component', async () => {
    render(<LandingPage />);

    const searchBar = screen.getByPlaceholderText('Search GitHub user...'); 
    const userCard = screen.queryByAltText('avatar'); 

    expect(searchBar).toBeInTheDocument();
    expect(userCard).not.toBeInTheDocument();
  });

  
});
