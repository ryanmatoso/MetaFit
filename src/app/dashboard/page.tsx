"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Activity, 
  Flame, 
  Calendar,
  Apple,
  Droplets,
  Moon,
  Award,
  ArrowLeft,
  Dumbbell,
  Play,
  Clock,
  Zap,
  Filter,
  Heart,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import type { UserProfile, Workout } from "@/lib/types";
import { workoutsDatabase } from "@/lib/workouts-data";

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [todayCalories, setTodayCalories] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (!savedProfile) {
      router.push('/');
      return;
    }
    setProfile(JSON.parse(savedProfile));
    
    // Carregar favoritos
    const savedFavorites = localStorage.getItem('favoriteWorkouts');
    if (savedFavorites) {
      setFavoriteWorkouts(JSON.parse(savedFavorites));
    }
  }, [router]);

  // Timer do treino
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive && activeWorkout) {
      interval = setInterval(() => {
        setWorkoutTime(prev => {
          if (prev >= activeWorkout.duration * 60) {
            setIsWorkoutActive(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, activeWorkout]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Carregando seu plano...</p>
        </div>
      </div>
    );
  }

  const weightDifference = Math.abs((profile.currentWeight || 0) - (profile.targetWeight || 0));
  const weeklyProgress = profile.weeklyGoal || 0;
  const estimatedWeeks = weeklyProgress > 0 ? Math.ceil(weightDifference / weeklyProgress) : 0;
  const caloriesProgress = (todayCalories / (profile.dailyCalories || 2000)) * 100;
  const waterGoal = 8;
  const waterProgress = (waterIntake / waterGoal) * 100;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Abaixo do peso", color: "text-blue-400" };
    if (bmi < 25) return { text: "Peso normal", color: "text-green-400" };
    if (bmi < 30) return { text: "Sobrepeso", color: "text-yellow-400" };
    return { text: "Obesidade", color: "text-red-400" };
  };

  const bmiCategory = getBMICategory(profile.bmi || 0);

  // Filtrar treinos
  const filteredWorkouts = workoutsDatabase.filter(workout => {
    if (selectedLevel !== 'all' && workout.level !== selectedLevel) return false;
    if (selectedDuration !== 'all') {
      if (selectedDuration === '15' && workout.duration > 15) return false;
      if (selectedDuration === '30' && (workout.duration < 16 || workout.duration > 30)) return false;
      if (selectedDuration === '45' && workout.duration < 31) return false;
    }
    if (selectedType !== 'all' && workout.type !== selectedType) return false;
    return true;
  });

  const toggleFavorite = (workoutId: string) => {
    const newFavorites = favoriteWorkouts.includes(workoutId)
      ? favoriteWorkouts.filter(id => id !== workoutId)
      : [...favoriteWorkouts, workoutId];
    setFavoriteWorkouts(newFavorites);
    localStorage.setItem('favoriteWorkouts', JSON.stringify(newFavorites));
  };

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
    setWorkoutTime(0);
    setIsWorkoutActive(true);
  };

  const stopWorkout = () => {
    setIsWorkoutActive(false);
    setActiveWorkout(null);
    setWorkoutTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const mealPlan = {
    breakfast: [
      "2 ovos mexidos com espinafre",
      "1 fatia de pão integral",
      "1 xícara de café com leite desnatado",
      "1 fruta (banana ou maçã)"
    ],
    lunch: [
      "150g de frango grelhado",
      "1 xícara de arroz integral",
      "Salada verde à vontade",
      "Legumes cozidos no vapor"
    ],
    snack: [
      "1 iogurte natural",
      "Castanhas (30g)",
      "1 fruta"
    ],
    dinner: [
      "150g de peixe assado",
      "Batata doce (150g)",
      "Brócolis no vapor",
      "Salada verde"
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="gap-2 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Seu Plano Personalizado
                </h1>
                <p className="text-sm text-gray-400">
                  Acompanhe seu progresso diário
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-400">
                <Target className="w-4 h-4 text-cyan-400" />
                Meta de Peso
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white">{profile.targetWeight} kg</div>
              <p className="text-cyan-400 text-sm mt-1">
                Faltam {weightDifference.toFixed(1)} kg
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 relative overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-400">
                <Activity className="w-4 h-4 text-purple-400" />
                IMC Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white">{profile.bmi}</div>
              <p className={`text-sm mt-1 ${bmiCategory.color}`}>
                {bmiCategory.text}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-orange-500/30 relative overflow-hidden group hover:border-orange-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-400">
                <Flame className="w-4 h-4 text-orange-400" />
                Calorias Diárias
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white">{profile.dailyCalories}</div>
              <p className="text-orange-400 text-sm mt-1">
                kcal por dia
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-pink-500/30 relative overflow-hidden group hover:border-pink-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4 text-pink-400" />
                Tempo Estimado
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white">{estimatedWeeks}</div>
              <p className="text-pink-400 text-sm mt-1">
                semanas para a meta
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Flame className="w-5 h-5 text-orange-400" />
                Calorias de Hoje
              </CardTitle>
              <CardDescription className="text-gray-400">
                {todayCalories} / {profile.dailyCalories} kcal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(caloriesProgress, 100)}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setTodayCalories(prev => Math.min(prev + 300, profile.dailyCalories || 2000))}
                  className="h-20 flex flex-col gap-1 bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-cyan-500/50 transition-all"
                >
                  <Apple className="w-6 h-6 text-cyan-400" />
                  <span className="text-xs text-gray-400">Café da Manhã</span>
                  <span className="text-xs font-bold text-white">+300 kcal</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTodayCalories(prev => Math.min(prev + 500, profile.dailyCalories || 2000))}
                  className="h-20 flex flex-col gap-1 bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-purple-500/50 transition-all"
                >
                  <Apple className="w-6 h-6 text-purple-400" />
                  <span className="text-xs text-gray-400">Almoço</span>
                  <span className="text-xs font-bold text-white">+500 kcal</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTodayCalories(prev => Math.min(prev + 400, profile.dailyCalories || 2000))}
                  className="h-20 flex flex-col gap-1 bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-pink-500/50 transition-all"
                >
                  <Moon className="w-6 h-6 text-pink-400" />
                  <span className="text-xs text-gray-400">Jantar</span>
                  <span className="text-xs font-bold text-white">+400 kcal</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Droplets className="w-5 h-5 text-blue-400" />
                Hidratação
              </CardTitle>
              <CardDescription className="text-gray-400">
                {waterIntake} / {waterGoal} copos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-6">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(waterProgress, 100)}%` }}
                ></div>
              </div>
              <Button
                onClick={() => setWaterIntake(prev => Math.min(prev + 1, waterGoal))}
                disabled={waterIntake >= waterGoal}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30"
              >
                <Droplets className="w-4 h-4 mr-2" />
                Adicionar Copo
              </Button>
              {waterIntake >= waterGoal && (
                <p className="text-center text-sm text-green-400 mt-3 font-medium">
                  ✓ Meta de água atingida!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabs with Plans */}
        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="workouts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              Treinos em Casa
            </TabsTrigger>
            <TabsTrigger value="meals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              Plano Alimentar
            </TabsTrigger>
          </TabsList>

          {/* Treinos em Casa */}
          <TabsContent value="workouts" className="space-y-6">
            {/* Filtros */}
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Nível</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'iniciante', 'intermediario', 'avancado'].map(level => (
                        <Button
                          key={level}
                          size="sm"
                          variant={selectedLevel === level ? 'default' : 'outline'}
                          onClick={() => setSelectedLevel(level)}
                          className={selectedLevel === level 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                            : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white'}
                        >
                          {level === 'all' ? 'Todos' : level.charAt(0).toUpperCase() + level.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Duração</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', '15', '30', '45'].map(duration => (
                        <Button
                          key={duration}
                          size="sm"
                          variant={selectedDuration === duration ? 'default' : 'outline'}
                          onClick={() => setSelectedDuration(duration)}
                          className={selectedDuration === duration 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                            : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white'}
                        >
                          {duration === 'all' ? 'Todos' : `${duration} min`}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Tipo</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'HIIT', 'yoga', 'forca', 'cardio'].map(type => (
                        <Button
                          key={type}
                          size="sm"
                          variant={selectedType === type ? 'default' : 'outline'}
                          onClick={() => setSelectedType(type)}
                          className={selectedType === type 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                            : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white'}
                        >
                          {type === 'all' ? 'Todos' : type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treino Ativo */}
            {activeWorkout && (
              <Card className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      Treino em Andamento
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      Ativo
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{activeWorkout.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(workoutTime)} / {activeWorkout.duration}:00
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          ~{activeWorkout.calories} kcal
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={(workoutTime / (activeWorkout.duration * 60)) * 100} 
                      className="h-2"
                    />
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      >
                        {isWorkoutActive ? 'Pausar' : 'Continuar'}
                      </Button>
                      <Button
                        onClick={stopWorkout}
                        variant="outline"
                        className="flex-1 bg-gray-800/50 border-gray-700 text-white hover:bg-red-500/20 hover:border-red-500/50"
                      >
                        Finalizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de Treinos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkouts.map((workout) => (
                <Card 
                  key={workout.id} 
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Thumbnail */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={workout.thumbnail} 
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleFavorite(workout.id)}
                      className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900"
                    >
                      <Heart 
                        className={`w-5 h-5 ${favoriteWorkouts.includes(workout.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                      />
                    </Button>
                    <Badge className="absolute bottom-2 left-2 bg-gray-900/80 backdrop-blur-sm border-cyan-500/50 text-cyan-400">
                      {workout.level}
                    </Badge>
                  </div>

                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg text-white">{workout.name}</CardTitle>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {workout.calories} kcal
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-3">
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
                        <p className="text-xs text-gray-500 mb-1">Músculos:</p>
                        <div className="flex flex-wrap gap-1">
                          {workout.muscleGroups.map((muscle, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-400">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => router.push(`/workout/${workout.id}`)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg shadow-cyan-500/20"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar Treino
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorkouts.length === 0 && (
              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                <CardContent className="py-12 text-center">
                  <Dumbbell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Nenhum treino encontrado com esses filtros</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Plano Alimentar */}
          <TabsContent value="meals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">☀️ Café da Manhã</CardTitle>
                  <CardDescription className="text-gray-400">~300-400 kcal</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mealPlan.breakfast.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🍽️ Almoço</CardTitle>
                  <CardDescription className="text-gray-400">~500-600 kcal</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mealPlan.lunch.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🥤 Lanche</CardTitle>
                  <CardDescription className="text-gray-400">~150-200 kcal</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mealPlan.snack.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-pink-400 mt-1">•</span>
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🌙 Jantar</CardTitle>
                  <CardDescription className="text-gray-400">~400-500 kcal</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mealPlan.dinner.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30">
              <CardContent className="pt-6">
                <p className="text-sm text-cyan-300">
                  💡 <strong>Dica:</strong> Ajuste as porções de acordo com sua fome e necessidades. 
                  Beba água antes das refeições e mastigue devagar.
                </p>
              </CardContent>
            </Card>

            {/* Tabela de Substituições Inteligentes */}
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-green-400" />
                  Substituições Inteligentes
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Alternativas mais acessíveis e econômicas com o mesmo valor nutricional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Alimento Original</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Substituição</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Benefício</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Equivalente Nutricional</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Proteínas */}
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Filé de salmão</td>
                        <td className="py-3 px-4 text-cyan-400">Ovos ou sardinha em lata</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            60% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Mesmo ômega-3 e proteína</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Peito de frango</td>
                        <td className="py-3 px-4 text-cyan-400">Coxa de frango sem pele</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            40% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Mesma proteína, pouco mais gordura</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Whey protein</td>
                        <td className="py-3 px-4 text-cyan-400">Leite em pó desnatado</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            70% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Alta proteína, fácil de encontrar</td>
                      </tr>
                      
                      {/* Carboidratos */}
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Quinoa</td>
                        <td className="py-3 px-4 text-cyan-400">Arroz integral</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            50% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Carboidratos complexos, fibras</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Batata doce</td>
                        <td className="py-3 px-4 text-cyan-400">Mandioca ou inhame</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            30% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Mesmo índice glicêmico, fibras</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Aveia importada</td>
                        <td className="py-3 px-4 text-cyan-400">Aveia nacional</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            50% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Mesmas fibras e nutrientes</td>
                      </tr>

                      {/* Gorduras Saudáveis */}
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Azeite extra virgem</td>
                        <td className="py-3 px-4 text-cyan-400">Óleo de canola</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            60% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Gorduras monoinsaturadas</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Castanhas importadas</td>
                        <td className="py-3 px-4 text-cyan-400">Amendoim torrado</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            70% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Proteína e gorduras boas</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Abacate</td>
                        <td className="py-3 px-4 text-cyan-400">Pasta de amendoim natural</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            40% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Gorduras saudáveis, vitamina E</td>
                      </tr>

                      {/* Vegetais e Frutas */}
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Aspargos</td>
                        <td className="py-3 px-4 text-cyan-400">Brócolis ou couve-flor</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            50% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Fibras, vitaminas, minerais</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Frutas vermelhas importadas</td>
                        <td className="py-3 px-4 text-cyan-400">Banana ou maçã</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            60% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Fibras, vitaminas, antioxidantes</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Rúcula</td>
                        <td className="py-3 px-4 text-cyan-400">Alface ou couve</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            40% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Fibras, vitaminas A, C, K</td>
                      </tr>

                      {/* Laticínios */}
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Iogurte grego</td>
                        <td className="py-3 px-4 text-cyan-400">Iogurte natural + whey</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            50% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Alta proteína, probióticos</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-white">Queijo cottage</td>
                        <td className="py-3 px-4 text-cyan-400">Ricota fresca</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            40% mais barato
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">Proteína, cálcio, baixa gordura</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Filtros de Substituição */}
                <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <h4 className="text-sm font-semibold text-white mb-3">💡 Dicas de Substituição:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-cyan-400 font-medium mb-1">🥩 Proteínas</p>
                      <p className="text-gray-400">Ovos, frango, sardinha e leite em pó são opções econômicas</p>
                    </div>
                    <div>
                      <p className="text-purple-400 font-medium mb-1">🌾 Carboidratos</p>
                      <p className="text-gray-400">Arroz integral, mandioca e aveia nacional são acessíveis</p>
                    </div>
                    <div>
                      <p className="text-pink-400 font-medium mb-1">🥑 Gorduras</p>
                      <p className="text-gray-400">Amendoim, óleo de canola e pasta de amendoim são baratos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Dicas para o Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-300">🎯 Consistência</h4>
                <p className="text-sm text-gray-400">
                  Pequenos passos todos os dias são melhores que grandes mudanças esporádicas.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-300">😴 Sono</h4>
                <p className="text-sm text-gray-400">
                  Durma 7-8 horas por noite. O sono adequado é essencial para o emagrecimento.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-300">📊 Acompanhamento</h4>
                <p className="text-sm text-gray-400">
                  Pese-se semanalmente no mesmo horário e acompanhe suas medidas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
