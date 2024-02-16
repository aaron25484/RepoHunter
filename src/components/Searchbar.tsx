import React, { useState, useEffect } from 'react';
import { searchUsers } from '../api/userSuggestionsCall';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} User - Represents basic information about a GitHub user.
 * @property {string} login - The login username of the GitHub user.
 * @property {string} avatarUrl - The URL of the GitHub user's avatar.
 */

/**
 * @interface SearchBarProps - Props interface for the SearchBar component.
 * @property {(user: string) => void} onUserSelected - Callback function triggered when a user is selected.
 */

interface User {
  login: string;
  avatarUrl: string;
}

interface SearchBarProps {
  onUserSelected: (user: string) => void;
}

/**
 * SearchBar component for searching and selecting GitHub users.
 * @component
 * @param {SearchBarProps} props - The properties passed to the SearchBar component.
 */

const SearchBar: React.FC<SearchBarProps> = ({ onUserSelected }) => {
  /**
   * State for handling the search query input.
   */
  const [query, setQuery] = useState('');

  /**
   * State for storing suggested users based on the search query.
   */
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  /**
   * State for controlling the visibility of the user suggestions menu.
   */
  const [menuVisible, setMenuVisible] = useState(false);

  /**
   * Translation hook for internationalization.
   * @type {Function}
   */
  const { t } = useTranslation();

  /**
   * useEffect to fetch and update suggested users based on the search query.
   */
  useEffect(() => {
    if (query.length >= 3) {
      searchUsers(query)
        .then(users => {
          setSuggestedUsers(users);
          setMenuVisible(true);
        })
        .catch(error => console.error('Error searching users:', error));
    } else {
      setSuggestedUsers([]);
      setMenuVisible(false);
    }
  }, [query]);

  /**
   * Function to handle user click from the suggestions menu.
   * @param {string} login - The login username of the selected GitHub user.
   */
  const handleUserClick = (login: string) => {
    onUserSelected(login);
    setMenuVisible(false);
  };

  /**
   * Render the SearchBar component.
   */
  return (
    <div className="flex items-center flex-col linejustify-center bg-gray-800 p-4">
      <input
        type="text"
        placeholder={t("Search GitHub user...")}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-4 py-2 border rounded w-2/3"
      />
      {menuVisible && suggestedUsers.length > 0 && (
        <ul className="relative left-0 mt-2 w-2/3 bg-white border border-gray-300 rounded" role='list'>
          {suggestedUsers.map(user => (
            <li
              key={user.login}
              onClick={() => handleUserClick(user.login)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={user.avatarUrl}
                alt={`${user.login}'s avatar`}
                className="rounded-full h-8 w-8"
              />
              <span className="ml-2">{user.login}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
