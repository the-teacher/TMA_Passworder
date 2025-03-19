import { ServiceType } from '@actions/users/types';

export type AuthProvider = {
  id: number;
  userId: number;
  provider: string;
  providerId: string;
  providerData?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  uid: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

export type UserWithProvider = User & {
  provider: ServiceType;
  providerId: string;
};
