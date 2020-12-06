import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';
import { useToast } from './toast';

interface IUser {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: Date;
}

export interface IRequest {
  email: string;
  password: string;
}

interface IDataAuth {
  user: IUser;
  token: string;
}

export interface IRequestSignUp {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IRequestProfile extends IUser {
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface IAuthContextData {
  user: IUser;
  isLoading: boolean;
  signIn(data: IRequest): Promise<void>;
  signUp(data: IRequestSignUp): Promise<void>;
  updateProfile(data: IRequestProfile): Promise<void>;
  updateImage(file: File): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IDataAuth>(() => {
    const user = localStorage.getItem('@StoreDreshoes:user');
    const token = localStorage.getItem('@StoreDreshoes:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        user: JSON.parse(user),
        token,
      };
    }

    return {} as IDataAuth;
  });

  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();

  const signIn = useCallback(
    async (credentials: IRequest) => {
      setIsLoading(true);

      try {
        const response = await api.post('session-client', credentials);
        setData(response.data);
        localStorage.setItem(
          '@StoreDreshoes:user',
          JSON.stringify(response.data.user),
        );
        localStorage.setItem('@StoreDreshoes:token', response.data.token);

        api.defaults.headers.authorization = `Bearer ${response.data.token}`;

        addToast({
          type: 'success',
          title: 'Logado com sucesso',
          description: `Seja bem-vindo ${response.data.user.name}`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  const signUp = useCallback(
    async (credentials: IRequestSignUp) => {
      setIsLoading(true);

      try {
        await api.post('clients', credentials);

        addToast({
          type: 'success',
          title: 'Conta criada com sucesso',
          description: `Faça o login para continuar a usar`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  const signOut = useCallback(async () => {
    addToast({
      type: 'success',
      title: 'Logout',
      description: `Até a próxima ${data.user.name}`,
    });

    setData({} as IDataAuth);
    localStorage.removeItem('@StoreDreshoes:user');
  }, [addToast, data.user]);

  const updateProfile = useCallback(
    async (profile: IRequestProfile) => {
      const {
        old_password,
        password,
        password_confirmation,
        name,
        email,
      } = profile;

      const update = {
        name,
        email,
      };

      if (old_password) {
        Object.assign(update, {
          old_password,
          password,
          password_confirmation,
        });
      }

      const response = await api.put(`profile-client`, update);

      setData({
        user: response.data,
        token: data.token,
      });

      localStorage.setItem('@StoreDreshoes:token', data.token);
      localStorage.setItem(
        '@StoreDreshoes:user',
        JSON.stringify(response.data),
      );
    },
    [data],
  );

  const updateImage = useCallback(
    async (file: File) => {
      const dataFile = new FormData();
      dataFile.append('file', file);

      const response = await api.post(`profile-client/avatar`, dataFile);

      setData({
        user: response.data,
        token: data.token,
      });

      localStorage.setItem('@StoreDreshoes:token', data.token);
      localStorage.setItem(
        '@StoreDreshoes:user',
        JSON.stringify(response.data),
      );
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        isLoading,
        signIn,
        signOut,
        signUp,
        updateImage,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
