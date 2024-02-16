import { UserDetails } from '../utils/interfaces';
import React from 'react';

const UserCard: React.FC<{ user: UserDetails }> = ({ user }) => (
<div className="bg-gray-200 p-4 mb-4 rounded-lg flex flex-col items-center justify-center">
  <h2 className="text-2xl mb-2">{user.name}</h2>
  <img
    src={user.avatarUrl}
    alt={`${user.login}'s avatar`}
    className="rounded-full h-20 w-20 object-cover mb-2"
  />
  <p className="text-gray-800">{user.bio}</p>
</div>

);

export default UserCard;
