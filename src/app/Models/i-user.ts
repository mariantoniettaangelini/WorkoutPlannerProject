import { IProgress } from "./i-progress";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  gender?: string;
  height?: number;
  weight?: number;
  experienceLevel?: string;
  goals?: string;
  progresses?: IProgress[];
}
