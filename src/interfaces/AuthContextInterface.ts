export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthContextType = {
  token: string | null;
  user: User | null;
  setToken: (newValue: string) => void;
  logout: () => void;
  isManager: boolean;
};
