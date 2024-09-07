export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  gender?: string;
  height?: number;
  weight?: number;
  experienceLevel?: string;
  goals?: string[];
}
