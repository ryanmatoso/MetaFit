"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  Check, 
  Clock,
  Flame,
  Dumbbell,
  Target,
  RefreshCw
} from "lucide-react";
import type { Workout, Exercise } from "@/lib/types";
import { workoutsDatabase } from "@/lib/workouts-data";

export default function WorkoutDetailPage() {
  const router = useRouter();
  const params = useParams();
  const workoutId = params.id as string;
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    const foundWorkout = workoutsDatabase.find(w => w.id === workoutId);
    if (foundWorkout) {
      setWorkout(foundWorkout);
      setTimeRemaining(foundWorkout.exercises[0]?.duration || 0);
    } else {
      router.push('/dashboard');
    }
  }, [workoutId, router]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Carregando treino...</p>
        </div>
      </div>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCompletedExercises([...completedExercises, currentExerciseIndex]);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeRemaining(workout.exercises[currentExerciseIndex + 1].duration);
      setIsPlaying(false);
    }
  };

  const handleComplete = () => {
    setCompletedExercises([...completedExercises, currentExerciseIndex]);
    if (currentExerciseIndex < workout.exercises.length - 1) {
      handleNext();
    } else {
      // Treino completo
      alert('🎉 Parabéns! Treino completo!');
      router.push('/dashboard');
    }
  };

  const handleRestart = () => {
    setCurrentExerciseIndex(0);
    setTimeRemaining(workout.exercises[0].duration);
    setIsPlaying(false);
    setCompletedExercises([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="gap-2 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {workout.name}
              </h1>
              <div className="flex items-center justify-center gap-4 mt-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {workout.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  {workout.calories} kcal
                </span>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                  {workout.level}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRestart}
              className="gap-2 text-gray-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
              Reiniciar
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Progress Bar */}
        <Card className="mb-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Exercício {currentExerciseIndex + 1} de {workout.exercises.length}
              </span>
              <span className="text-sm font-bold text-cyan-400">
                {Math.round(progress)}% completo
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Exercise Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Exercise Card */}
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-white flex items-center justify-between">
                  <span>{currentExercise.name}</span>
                  {completedExercises.includes(currentExerciseIndex) && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      <Check className="w-4 h-4 mr-1" />
                      Feito
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                {/* Timer Display */}
                <div className="text-center">
                  <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={handlePlayPause}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg shadow-cyan-500/30 px-8"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Iniciar
                        </>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleNext}
                      disabled={currentExerciseIndex >= workout.exercises.length - 1}
                      className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800 hover:border-purple-500/50"
                    >
                      <SkipForward className="w-5 h-5 mr-2" />
                      Pular
                    </Button>
                  </div>
                </div>

                {/* Exercise Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentExercise.reps && (
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
                      <div className="text-2xl font-bold text-cyan-400">{currentExercise.reps}</div>
                      <div className="text-xs text-gray-400 mt-1">Repetições</div>
                    </div>
                  )}
                  {currentExercise.sets && (
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
                      <div className="text-2xl font-bold text-purple-400">{currentExercise.sets}</div>
                      <div className="text-xs text-gray-400 mt-1">Séries</div>
                    </div>
                  )}
                  {currentExercise.rest && (
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
                      <div className="text-2xl font-bold text-pink-400">{currentExercise.rest}s</div>
                      <div className="text-xs text-gray-400 mt-1">Descanso</div>
                    </div>
                  )}
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
                    <div className="text-2xl font-bold text-orange-400">{currentExercise.duration}s</div>
                    <div className="text-xs text-gray-400 mt-1">Duração</div>
                  </div>
                </div>

                {/* Passo a Passo - Tabela */}
                <Card className="bg-gray-800/30 border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-cyan-400" />
                      Como Executar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="py-3 px-4 text-sm font-semibold text-cyan-400">Passo</th>
                            <th className="py-3 px-4 text-sm font-semibold text-cyan-400">Instrução</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentExercise.description.split('.').filter(step => step.trim()).map((step, index) => (
                            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                              <td className="py-3 px-4 text-gray-400 font-medium">{index + 1}</td>
                              <td className="py-3 px-4 text-gray-300">{step.trim()}.</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Complete Button */}
                <Button
                  size="lg"
                  onClick={handleComplete}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30"
                >
                  <Check className="w-5 h-5 mr-2" />
                  {currentExerciseIndex < workout.exercises.length - 1 ? 'Marcar como Feito e Avançar' : 'Finalizar Treino'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Exercise List */}
          <div className="space-y-4">
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg text-white">Lista de Exercícios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {workout.exercises.map((exercise, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentExerciseIndex(index);
                      setTimeRemaining(exercise.duration);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      index === currentExerciseIndex
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                        : completedExercises.includes(index)
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">#{index + 1}</span>
                        <span className="text-sm font-medium">{exercise.name}</span>
                      </div>
                      {completedExercises.includes(index) && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span>{exercise.duration}s</span>
                      {exercise.reps && <span>• {exercise.reps} reps</span>}
                      {exercise.sets && <span>• {exercise.sets} séries</span>}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Workout Info */}
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Equipamento:</p>
                  <div className="flex flex-wrap gap-1">
                    {workout.equipment.map((eq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-gray-800/50 border-gray-700 text-gray-400">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Músculos Trabalhados:</p>
                  <div className="flex flex-wrap gap-1">
                    {workout.muscleGroups.map((muscle, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-400">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
