import { UserDetails } from '../utils/interfaces';
import React from 'react';

/**
 * Functional component representing an user card that displays the user details.
 *
 * @component
 * @example
 * // Example usage:
 * <UserCard user={UserDetails} />
 *
 * @param {Object} props - Component properties.
 * @param {UserDetails} props.user - User details object containing login, name, avatarUrl, bio, and repositories.
 */

const UserCard: React.FC<{ user: UserDetails }> = ({ user }) => (
  <div className=" relative mx-4 bg-gray-200 p-4 mb-4 rounded-lg flex flex-col items-center justify-center max-w-screen-md lg:mx-auto">
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
