import { UserDetails } from '../utils/interfaces';

const UserCard: React.FC<{ user: UserDetails }> = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <img src={user.avatarUrl} alt={`${user.login}'s avatar`} />
    <p>{user.bio}</p>
  </div>
);

export default UserCard;
