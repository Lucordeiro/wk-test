import React from 'react';
import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const formatTime = (date: Date) => {
  const d = new Date(date);
  return `Hoje, ${d.getHours()}h${d.getMinutes().toString().padStart(2, '0')}`;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isOwn ? 'message-bubble-sent' : 'message-bubble-received'}`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
