import { useState, useEffect } from 'react';
import { searchUsers } from '../api/userSuggestionsCall';

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
    <div>
      <input
        type="text"
        placeholder="Search GitHub user..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {menuVisible && suggestedUsers.length > 0 && (
        <ul className='list-none'>
          {suggestedUsers.map(user => (
            <li key={user.login} onClick={() => handleUserClick(user.login)}>
              <img src={user.avatarUrl} alt={`${user.login}'s avatar`} />
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
