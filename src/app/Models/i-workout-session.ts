import { IExercise } from "./i-exercise";

export interface IWorkoutSession {
  id: number;
  name: string;
  description?: string;
  level: string;
  duration: number;
  image?: string;
  type: string;
  exercises?: IExercise[];
}
