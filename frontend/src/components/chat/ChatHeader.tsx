import React from 'react';
import { UserAvatar } from './UserAvatar';
import type { User } from '@/types';

interface ChatHeaderProps {
  selectedUser: User | null;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="p-4 border-b border-border">
        <p className="text-muted-foreground">Selecione um usuário para conversar</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-border flex items-center gap-3">
      <UserAvatar name={selectedUser.username} status={selectedUser.status} />
      <div>
        <h3 className="font-semibold text-foreground">{selectedUser.username}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${selectedUser.status ? 'bg-green-500' : 'bg-red-500'}`} />
          {selectedUser.status ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  );
};
