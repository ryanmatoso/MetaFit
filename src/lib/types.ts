export interface QuestionnaireData {
  goal: 'lose' | 'maintain' | 'gain';
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: 'female' | 'male' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  dietPreference: 'balanced' | 'low-carb' | 'vegetarian' | 'vegan';
}

export interface UserProfile extends QuestionnaireData {
  bmi: number;
  dailyCalories: number;
  weeklyGoal: number;
  completedAt: Date;
}

export interface Workout {
  id: string;
  name: string;
  duration: number; // em minutos
  level: 'iniciante' | 'intermediario' | 'avancado';
  type: 'HIIT' | 'yoga' | 'forca' | 'cardio' | 'flexibilidade';
  equipment: string[];
  muscleGroups: string[];
  calories: number;
  exercises: Exercise[];
  thumbnail?: string;
}

export interface Exercise {
  name: string;
  duration: number; // em segundos
  reps?: number;
  sets?: number;
  rest?: number; // em segundos
  description: string;
}

export interface WorkoutPreferences {
  levels: ('iniciante' | 'intermediario' | 'avancado')[];
  types: ('HIIT' | 'yoga' | 'forca' | 'cardio' | 'flexibilidade')[];
  maxDuration: number;
  equipment: string[];
  muscleGroups: string[];
}

export interface WorkoutHistory {
  workoutId: string;
  completedAt: Date;
  duration: number;
  caloriesBurned: number;
}
