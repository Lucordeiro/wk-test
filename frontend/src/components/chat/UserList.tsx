import React from 'react';
import { UserAvatar } from './UserAvatar';
import type { User } from '@/types';

interface UserListProps {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  selectedUserId,
  onSelectUser,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectUser(user)}
          className={`user-item ${selectedUserId === user._id ? 'active' : ''}`}
        >
          <UserAvatar name={user.username} status={user.status} />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{user.username}</p>
            {user.lastMessage && (
              <p className="text-sm text-muted-foreground truncate">
                {user.lastMessage}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
