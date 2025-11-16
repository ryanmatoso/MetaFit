"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Target, Activity, Utensils, User, Zap, CheckCircle2, Mail, Lock } from "lucide-react";
import type { QuestionnaireData } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    goal: 'lose',
    activityLevel: 'moderate',
    dietPreference: 'balanced',
    gender: 'female'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }
    
    setSignupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateSignup()) {
      // Salvar email no localStorage
      localStorage.setItem('userEmail', email);
      setShowSignup(false);
    }
  };

  const updateField = (field: keyof QuestionnaireData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.goal) newErrors.goal = "Selecione um objetivo";
        break;
      case 2:
        if (!formData.currentWeight) newErrors.currentWeight = "Peso atual obrigatório";
        else if (formData.currentWeight < 30 || formData.currentWeight > 300) 
          newErrors.currentWeight = "Peso deve estar entre 30-300kg";
        
        if (!formData.targetWeight) newErrors.targetWeight = "Peso desejado obrigatório";
        else if (formData.targetWeight < 30 || formData.targetWeight > 300) 
          newErrors.targetWeight = "Peso deve estar entre 30-300kg";
        break;
      case 3:
        if (!formData.height) newErrors.height = "Altura obrigatória";
        else if (formData.height < 100 || formData.height > 250) 
          newErrors.height = "Altura deve estar entre 100-250cm";
        
        if (!formData.age) newErrors.age = "Idade obrigatória";
        else if (formData.age < 15 || formData.age > 100) 
          newErrors.age = "Idade deve estar entre 15-100 anos";
        break;
      case 4:
        if (!formData.gender) newErrors.gender = "Selecione seu gênero";
        break;
      case 5:
        if (!formData.activityLevel) newErrors.activityLevel = "Selecione nível de atividade";
        if (!formData.dietPreference) newErrors.dietPreference = "Selecione preferência alimentar";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const heightInMeters = (formData.height || 0) / 100;
    const bmi = (formData.currentWeight || 0) / (heightInMeters * heightInMeters);
    
    let bmr = 0;
    if (formData.gender === 'female') {
      bmr = 655 + (9.6 * (formData.currentWeight || 0)) + (1.8 * (formData.height || 0)) - (4.7 * (formData.age || 0));
    } else {
      bmr = 66 + (13.7 * (formData.currentWeight || 0)) + (5 * (formData.height || 0)) - (6.8 * (formData.age || 0));
    }

    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    const dailyCalories = Math.round(bmr * activityMultipliers[formData.activityLevel || 'moderate']);
    
    let adjustedCalories = dailyCalories;
    if (formData.goal === 'lose') {
      adjustedCalories = dailyCalories - 500;
    } else if (formData.goal === 'gain') {
      adjustedCalories = dailyCalories + 300;
    }

    const profile = {
      ...formData,
      email,
      bmi: Math.round(bmi * 10) / 10,
      dailyCalories: adjustedCalories,
      weeklyGoal: formData.goal === 'lose' ? 0.5 : formData.goal === 'gain' ? 0.3 : 0,
      completedAt: new Date()
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    router.push('/dashboard');
  };

  // Tela de Cadastro
  if (showSignup) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Bem-vindo</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crie sua Conta
            </h1>
            <p className="text-gray-400 text-lg">
              Comece sua jornada de transformação
            </p>
          </div>

          {/* Signup Card */}
          <Card className="border-0 bg-gray-900/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            {/* Neon Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl"></div>
            <div className="absolute inset-[1px] bg-gray-900/90 rounded-lg"></div>
            
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Cadastro</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Preencha seus dados para continuar
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pb-8">
                {/* Email Input */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-300 text-base flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                    {email && !signupErrors.email && (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (signupErrors.email) {
                          setSignupErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.email;
                            return newErrors;
                          });
                        }
                      }}
                      className={`h-14 text-lg bg-gray-800/50 border-2 ${signupErrors.email ? 'border-red-500/50' : email ? 'border-cyan-500/50' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-cyan-500 transition-colors`}
                    />
                    {signupErrors.email && (
                      <p className="text-red-400 text-sm mt-2">{signupErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-300 text-base flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Senha
                    {password && !signupErrors.password && (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (signupErrors.password) {
                          setSignupErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.password;
                            return newErrors;
                          });
                        }
                      }}
                      className={`h-14 text-lg bg-gray-800/50 border-2 ${signupErrors.password ? 'border-red-500/50' : password ? 'border-purple-500/50' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-purple-500 transition-colors`}
                    />
                    {signupErrors.password && (
                      <p className="text-red-400 text-sm mt-2">{signupErrors.password}</p>
                    )}
                  </div>
                </div>

                {/* Signup Button */}
                <Button
                  onClick={handleSignup}
                  className="w-full h-14 text-base bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                >
                  Criar Conta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
            <span className="text-cyan-400">🔒</span>
            Seus dados são privados e seguros
          </p>
        </div>
      </div>
    );
  }

  // Tela de Questionário (após cadastro)
  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Transformação Inteligente</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sua Jornada Começa Aqui
          </h1>
          <p className="text-gray-400 text-lg">
            Responda 5 perguntas e receba seu plano personalizado
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-400">
              Etapa {step} de {totalSteps}
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {Math.round(progress)}% Completo
            </span>
          </div>
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-0 bg-gray-900/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          {/* Neon Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl"></div>
          <div className="absolute inset-[1px] bg-gray-900/90 rounded-lg"></div>
          
          <div className="relative z-10">
            <CardHeader>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                  {step === 1 && <Target className="w-6 h-6 text-cyan-400" />}
                  {step === 2 && <Activity className="w-6 h-6 text-purple-400" />}
                  {step === 3 && <User className="w-6 h-6 text-pink-400" />}
                  {step === 4 && <User className="w-6 h-6 text-cyan-400" />}
                  {step === 5 && <Utensils className="w-6 h-6 text-purple-400" />}
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">
                    {step === 1 && "Qual é seu objetivo?"}
                    {step === 2 && "Seu peso atual e meta"}
                    {step === 3 && "Informações básicas"}
                    {step === 4 && "Seu perfil"}
                    {step === 5 && "Estilo de vida"}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-base mt-1">
                    {step === 1 && "Defina sua meta principal"}
                    {step === 2 && "Onde você está e onde quer chegar"}
                    {step === 3 && "Para calcular seu plano ideal"}
                    {step === 4 && "Personalização das recomendações"}
                    {step === 5 && "Últimas informações"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              {/* Step 1: Goal */}
              {step === 1 && (
                <RadioGroup
                  value={formData.goal}
                  onValueChange={(value) => updateField('goal', value)}
                  className="space-y-3"
                >
                  {[
                    { value: 'lose', title: 'Perder peso', desc: 'Emagrecer de forma saudável', gradient: 'from-orange-500/20 to-red-500/20', border: 'orange-500/30' },
                    { value: 'maintain', title: 'Manter peso', desc: 'Manter forma atual', gradient: 'from-cyan-500/20 to-blue-500/20', border: 'cyan-500/30' },
                    { value: 'gain', title: 'Ganhar peso', desc: 'Ganhar massa muscular', gradient: 'from-purple-500/20 to-pink-500/20', border: 'purple-500/30' }
                  ].map((option) => (
                    <div key={option.value} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      <div className={`relative flex items-center space-x-4 border-2 ${formData.goal === option.value ? `border-${option.border}` : 'border-gray-800'} bg-gray-800/50 rounded-xl p-5 hover:bg-gray-800/80 transition-all cursor-pointer`}>
                        <RadioGroupItem value={option.value} id={option.value} className="border-gray-600" />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          <div className="font-semibold text-white text-lg">{option.title}</div>
                          <div className="text-sm text-gray-400">{option.desc}</div>
                        </Label>
                        {formData.goal === option.value && (
                          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Step 2: Weight */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="currentWeight" className="text-gray-300 text-base flex items-center gap-2">
                      Peso atual (kg)
                      {formData.currentWeight && !errors.currentWeight && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentWeight"
                        type="number"
                        placeholder="Ex: 75"
                        value={formData.currentWeight || ''}
                        onChange={(e) => updateField('currentWeight', parseFloat(e.target.value))}
                        className={`h-14 text-lg bg-gray-800/50 border-2 ${errors.currentWeight ? 'border-red-500/50' : formData.currentWeight ? 'border-cyan-500/50' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-cyan-500 transition-colors`}
                      />
                      {errors.currentWeight && (
                        <p className="text-red-400 text-sm mt-2">{errors.currentWeight}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="targetWeight" className="text-gray-300 text-base flex items-center gap-2">
                      Peso desejado (kg)
                      {formData.targetWeight && !errors.targetWeight && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="targetWeight"
                        type="number"
                        placeholder="Ex: 65"
                        value={formData.targetWeight || ''}
                        onChange={(e) => updateField('targetWeight', parseFloat(e.target.value))}
                        className={`h-14 text-lg bg-gray-800/50 border-2 ${errors.targetWeight ? 'border-red-500/50' : formData.targetWeight ? 'border-purple-500/50' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-purple-500 transition-colors`}
                      />
                      {errors.targetWeight && (
                        <p className="text-red-400 text-sm mt-2">{errors.targetWeight}</p>
                      )}
                    </div>
                  </div>
                  {formData.currentWeight && formData.targetWeight && !errors.currentWeight && !errors.targetWeight && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4">
                      <p className="text-cyan-400 font-medium">
                        Meta: {Math.abs(formData.currentWeight - formData.targetWeight).toFixed(1)} kg
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Height & Age */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="height" className="text-gray-300 text-base flex items-center gap-2">
                      Altura (cm)
                      {formData.height && !errors.height && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Ex: 170"
                      value={formData.height || ''}
                      onChange={(e) => updateField('height', parseFloat(e.target.value))}
                      className={`h-14 text-lg bg-gray-800/50 border-2 ${errors.height ? 'border-red-500/50' : formData.height ? 'border-pink-500/50' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-pink-500 transition-colors`}
                    />
                    {errors.height && (
                      <p className="text-red-400 text-sm mt-2">{errors.height}</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-gray-300 text-base flex items-center gap-2">
                      Idade
                      {formData.age && !errors.age && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Ex: 30"
                      value={formData.age || ''}
                      onChange={(e) => updateField('age', parseInt(e.target.value))}
                      className={`h-14 text-lg bg-gray-800/50 border-2 ${errors.age ? 'border-red-500/50' : formData.age ? 'border-cyan-500/50' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-cyan-500 transition-colors`}
                    />
                    {errors.age && (
                      <p className="text-red-400 text-sm mt-2">{errors.age}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Gender */}
              {step === 4 && (
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateField('gender', value)}
                  className="space-y-3"
                >
                  {[
                    { value: 'female', label: 'Feminino' },
                    { value: 'male', label: 'Masculino' },
                    { value: 'other', label: 'Outro' }
                  ].map((option) => (
                    <div key={option.value} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className={`relative flex items-center space-x-4 border-2 ${formData.gender === option.value ? 'border-purple-500/50' : 'border-gray-800'} bg-gray-800/50 rounded-xl p-5 hover:bg-gray-800/80 transition-all cursor-pointer`}>
                        <RadioGroupItem value={option.value} id={option.value} className="border-gray-600" />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer text-white text-lg font-medium">
                          {option.label}
                        </Label>
                        {formData.gender === option.value && (
                          <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Step 5: Lifestyle */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-base font-semibold">Nível de atividade física</Label>
                    <RadioGroup
                      value={formData.activityLevel}
                      onValueChange={(value) => updateField('activityLevel', value)}
                      className="space-y-2"
                    >
                      {[
                        { value: 'sedentary', title: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
                        { value: 'light', title: 'Leve', desc: '1-3 dias por semana' },
                        { value: 'moderate', title: 'Moderado', desc: '3-5 dias por semana' },
                        { value: 'active', title: 'Ativo', desc: '6-7 dias por semana' },
                        { value: 'very-active', title: 'Muito Ativo', desc: 'Exercício intenso diário' }
                      ].map((option) => (
                        <div key={option.value} className={`flex items-center space-x-3 border ${formData.activityLevel === option.value ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-gray-800 bg-gray-800/30'} rounded-lg p-4 hover:border-cyan-500/30 transition-all cursor-pointer`}>
                          <RadioGroupItem value={option.value} id={option.value} className="border-gray-600" />
                          <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                            <div className="font-medium text-white">{option.title}</div>
                            <div className="text-xs text-gray-400">{option.desc}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-300 text-base font-semibold">Preferência alimentar</Label>
                    <RadioGroup
                      value={formData.dietPreference}
                      onValueChange={(value) => updateField('dietPreference', value)}
                      className="space-y-2"
                    >
                      {[
                        { value: 'balanced', label: 'Balanceada' },
                        { value: 'low-carb', label: 'Low Carb' },
                        { value: 'vegetarian', label: 'Vegetariana' },
                        { value: 'vegan', label: 'Vegana' }
                      ].map((option) => (
                        <div key={option.value} className={`flex items-center space-x-3 border ${formData.dietPreference === option.value ? 'border-purple-500/50 bg-purple-500/10' : 'border-gray-800 bg-gray-800/30'} rounded-lg p-4 hover:border-purple-500/30 transition-all cursor-pointer`}>
                          <RadioGroupItem value={option.value} id={option.value} className="border-gray-600" />
                          <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium text-white">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-14 text-base border-2 border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:border-gray-600 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 h-14 text-base bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                >
                  {step === totalSteps ? 'Criar Meu Plano' : 'Próximo'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
          <span className="text-cyan-400">🔒</span>
          Seus dados são privados e seguros
        </p>
      </div>
    </div>
  );
}
