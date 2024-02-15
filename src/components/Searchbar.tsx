import { useState, useEffect } from 'react';
import { searchUsers } from '../api/userSuggestionsCall';
import { useTranslation } from 'react-i18next';

interface User {
  login: string;
  avatarUrl: string;
}

interface SearchBarProps {
  onUserSelected: (user: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onUserSelected }) => {
  const [query, setQuery] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const {t} = useTranslation()

  useEffect(() => {
    if (query.length >= 3) {
      searchUsers(query)
        .then(users => {
          setSuggestedUsers(users);
          setMenuVisible(true);
        })
        .catch(error => console.error('Error searching users:', error));
      } else {
        setSuggestedUsers([])
        setMenuVisible(false)
    }
  }, [query]);

  const handleUserClick = (login: string) => {
    onUserSelected(login);
    setMenuVisible(false); 
  };

  return (
    <div className="relative bg-gray-800 p-4">
      <input
        type="text"
        placeholder={t("Search GitHub user...")}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-4 py-2 border rounded w-full"
      />
      {menuVisible && suggestedUsers.length > 0 && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded">
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
