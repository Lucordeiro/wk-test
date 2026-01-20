export interface User {
  _id: string;
  username: string;
  name?: string;
  email?: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastMessage?: string;
}

export interface Message {
  content: string;
  from: string;
  to: string;
  timestamp: Date;
  author: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  username: string;
  password: string;
}
