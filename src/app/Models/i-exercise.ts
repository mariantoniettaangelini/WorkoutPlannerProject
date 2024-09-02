import { IWorkoutSession } from "./i-workout-session";

export interface IExercise {
  id: number;
  name: string;
  description?: string;
  type?: string;
  muscleGroup?: string;
  image?: string;
  workoutSessions?: IWorkoutSession[];
}
