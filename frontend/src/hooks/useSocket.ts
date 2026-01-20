import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';
import type { Message, User } from '@/types';

const SOCKET_URL = 'ws://localhost:3001';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (receiverId: string, content: string) => void;
  onNewMessage: (callback: (message: Message) => void) => void;
  onUserStatusChange: (callback: (user: User) => void) => void;
}

export const useSocket = (): UseSocketReturn & { disconnect: () => void } => {
  const { token, user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageCallbackRef = useRef<((message: Message) => void) | null>(null);
  const statusCallbackRef = useRef<((user: User) => void) | null>(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
    });

    socketRef.current?.emit('user-online', user._id);
    setIsConnected(true);
  }, [token]);

  const sendMessage = useCallback((to: string, content: string) => {
    if (!user) return;

    const newMessage: Message = {
      content,
      from: user._id,
      to,
      timestamp: new Date(),
      author: user.name,
    };
    // In production:
    socketRef.current?.emit('send-message', newMessage);

    // // For demo, trigger the callback directly
    // if (messageCallbackRef.current) {
    //   messageCallbackRef.current(newMessage);
    // }
  }, [user]);

  const onNewMessage = useCallback((callback: (message: Message) => void) => {
    messageCallbackRef.current = callback;
    socketRef.current?.on('new-message', callback);
  }, []);

  const onUserStatusChange = useCallback((callback: (user: User) => void) => {
    statusCallbackRef.current = callback;
    socketRef.current?.on('update-users', callback);
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setIsConnected(false);
  }, []);


  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    onNewMessage,
    onUserStatusChange,
    disconnect
  };
};
