import React from 'react';

interface UserAvatarProps {
  name: string;
  status?: 'online' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getColorFromName = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  status,
  size = 'md',
  showStatus = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  return (
    <div className="relative inline-block">
      <div
        className={`${sizeClasses[size]} ${getColorFromName(name)} rounded-full flex items-center justify-center text-white font-semibold`}
      >
        {getInitials(name)}
      </div>
      {showStatus && status && (
        <span
          className={`status-dot ${status ? 'status-online' : 'status-offline'}`}
        />
      )}
    </div>
  );
};
