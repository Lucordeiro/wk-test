import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSocket } from '@/hooks/useSocket';
import { userService, messageService } from '@/services/api';
import { UserList } from '@/components/chat/UserList';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { UserAvatar } from '@/components/chat/UserAvatar';
import { useToast } from '@/hooks/use-toast';
import type { User, Message } from '@/types';

const Chat: React.FC = () => {
  const { user, logout, onlineUsers, setOnlineUsers } = useAuth();
  const { sendMessage, onNewMessage, onUserStatusChange, isConnected, disconnect } = useSocket();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await userService.getOnlineUsers();
        setOnlineUsers(users);
      } catch (error) {
        toast({
          title: 'Erro ao carregar usuários',
          variant: 'destructive',
        });
      }
    };

    loadUsers();
  }, [setOnlineUsers, toast]);

  // Load messages when user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const loadMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const msgs = await messageService.getMessages(selectedUser._id);
        setMessages(msgs);
      } catch (error) {
        toast({
          title: 'Erro ao carregar mensagens',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();
  }, [selectedUser, toast]);

  // Handle new messages
  useEffect(() => {
    onNewMessage((message: Message) => {
      setMessages((prev) => [...prev, message]);
      
      // Show toast for messages from others
      if (message.from !== user?._id) {
        toast({
          title: 'Nova mensagem',
          description: message.content.slice(0, 50),
        });
      }
    });
  }, [onNewMessage, user?._id, toast]);
  
  // Handle someone changed status
  useEffect(() => {
    onUserStatusChange((users: User[] = []) => {
      setOnlineUsers(users.filter((item) => item._id !== user._id));
      setSelectedUser(users.find(item => item._id === selectedUser._id));
      
      
    });
  }, [onUserStatusChange]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!selectedUser) return;
    sendMessage(selectedUser._id, content);
  };

  const handleLogout = () => {
    disconnect()
    logout();
    navigate('/');
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setMessages([]);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-5xl h-[80vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Mensagens</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <UserList
              users={onlineUsers}
              selectedUserId={selectedUser?._id ?? null}
              onSelectUser={handleSelectUser}
            />
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header with user info */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex-1">
              <ChatHeader selectedUser={selectedUser} />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-foreground">{user?.username}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <UserAvatar name={user?.username || 'U'} status="online" showStatus={false} />
              <button
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {!selectedUser ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Selecione um usuário para iniciar uma conversa
              </div>
            ) : isLoadingMessages ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Carregando mensagens...
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Nenhuma mensagem ainda. Diga olá!
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <MessageBubble
                    key={message._id}
                    message={message}
                    isOwn={message.from === user?._id || message.author === 'me'}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <MessageInput
            onSend={handleSendMessage}
            disabled={!selectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
