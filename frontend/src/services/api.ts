import axios from 'axios';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User, Message } from '@/types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulated login for demo - replace with real API call
    // const response = await api.post<AuthResponse>('/auth/login', credentials);
    // return response.data;
    
    // Simulated response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.username && credentials.password) {
      if (credentials.password.length < 3) {
        throw new Error('Senha inválida');
      }
      // return {
      //   token: 'jwt-token-' + Date.now(),
      //   user: {
      //     id: '1',
      //     username: credentials.username,
      //     email: `${credentials.username}@email.com`,
      //     status: 'online',
      //   },
      // };
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    }
    throw new Error('Credenciais inválidas');
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // Simulated register for demo - replace with real API call
    // const response = await api.post<AuthResponse>('/auth/register', credentials);
    // return response.data;
    
    // Simulated response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.name && credentials.username && credentials.password) {
      if (credentials.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }
      if (credentials.username.length < 3) {
        throw new Error('O nome de usuário deve ter pelo menos 3 caracteres');
      }
      const response = await api.post<AuthResponse>('/auth/register', credentials);
      return response.data;
      // return {
      //   token: 'jwt-token-' + Date.now(),
      //   user: {
      //     id: '1',
      //     username: credentials.username,
      //     name: credentials.name,
      //     email: `${credentials.username}@email.com`,
      //     status: 'online',
      //   },
      // };
    }
    throw new Error('Preencha todos os campos');
  },
};

export const userService = {
  getOnlineUsers: async (): Promise<User[]> => {
    // Simulated users for demo
    const response = await api.get<User[]>('/users/online');
    return response.data;
    
    // return [
    //   { id: '2', username: 'Cláudia', status: 'online', avatar: '', lastMessage: 'Você enviou: Sim e você?' },
    //   { id: '3', username: 'Brenda', status: 'offline', avatar: '', lastMessage: 'Eu não estou sabendo de nada...' },
    //   { id: '4', username: 'Carlos', status: 'online', avatar: '', lastMessage: 'Olá!' },
    //   { id: '5', username: 'Ana', status: 'offline', avatar: '', lastMessage: 'Até mais!' },
    // ];
  },
};

export const messageService = {
  getMessages: async (otherUserId: string): Promise<Message[]> => {
    // Simulated messages for demo
    const response = await api.get<Message[]>(`/messages/${otherUserId}`);
    return response.data;
    
    // const now = new Date();
    // const messages: Message[] = [
    //   {
    //     id: '1',
    //     content: 'Oi... Tudo bem?',
    //     senderId: otherUserId,
    //     receiverId: '1',
    //     timestamp: new Date(now.getTime() - 60000),
    //     author: 'other',
    //   },
    //   {
    //     id: '2',
    //     content: 'Sim e você?',
    //     senderId: '1',
    //     receiverId: otherUserId,
    //     timestamp: new Date(now.getTime() - 30000),
    //     author: 'me',
    //   },
    // ];
    
    // return messages;
  },
};

export default api;
