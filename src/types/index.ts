export type ThemeMode = 'light' | 'dark';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Notification: undefined;
  UserProfile: undefined;
  AddModule: undefined;
  News: undefined;
  NewsDetail: {
    newsItem: {
      id: string;
      time: string;
      title: string;
      imageUrl?: string;
      content?: string;
      source?: string;
      category?: string;
    };
  };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  PriceBoard: undefined;
  AI: undefined;
  GroupHub: undefined;
  Dashboard: undefined;
  NewsDetail: {
    newsItem: {
      id: string;
      time: string;
      title: string;
      imageUrl?: string;
      content?: string;
      source?: string;
      category?: string;
    };
  };
};
