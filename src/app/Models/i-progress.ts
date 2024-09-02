import { IUser } from "./i-user";
import { IWorkoutSession } from "./i-workout-session";

export interface IProgress {
  id: number;
  workoutSessionId: number;
  userId: number;
  user?: IUser;
  workoutSession?: IWorkoutSession;
  isCompleted: boolean;
}
