import type { Workout } from './types';

export const workoutsDatabase: Workout[] = [
  {
    id: 'hiit-beginner-15',
    name: 'HIIT Iniciante - Queima Rápida',
    duration: 15,
    level: 'iniciante',
    type: 'HIIT',
    equipment: ['Nenhum - Peso corporal'],
    muscleGroups: ['Corpo todo'],
    calories: 150,
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Polichinelos', duration: 30, description: '1. Fique em pé com os pés juntos\n2. Salte abrindo as pernas e levantando os braços acima da cabeça\n3. Retorne à posição inicial\n4. Mantenha um ritmo constante' },
      { name: 'Descanso', duration: 15, description: 'Respire fundo e recupere o fôlego' },
      { name: 'Agachamento', duration: 30, reps: 15, description: '1. Fique em pé com os pés na largura dos ombros\n2. Desça como se fosse sentar em uma cadeira\n3. Desça até as coxas ficarem paralelas ao chão\n4. Suba empurrando pelos calcanhares' },
      { name: 'Descanso', duration: 15, description: 'Recupere o fôlego' },
      { name: 'Prancha', duration: 20, description: '1. Apoie os antebraços e dedos dos pés no chão\n2. Mantenha o corpo reto como uma prancha\n3. Contraia o abdômen\n4. Não deixe o quadril cair' },
      { name: 'Descanso', duration: 15, description: 'Respire' },
      { name: 'Mountain Climbers', duration: 30, description: '1. Posição de prancha alta\n2. Alterne trazendo os joelhos ao peito rapidamente\n3. Mantenha o core contraído\n4. Movimento rápido e controlado' },
      { name: 'Descanso', duration: 15, description: 'Recupere' }
    ]
  },
  {
    id: 'dumbbell-upper-30',
    name: 'Treino com Halteres - Parte Superior',
    duration: 30,
    level: 'intermediario',
    type: 'forca',
    equipment: ['Halteres (2-5kg)'],
    muscleGroups: ['Peito', 'Braços', 'Ombros'],
    calories: 220,
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    exercises: [
      { 
        name: 'Supino com halteres', 
        duration: 60, 
        reps: 12, 
        sets: 3, 
        rest: 30, 
        description: '1. Deite-se em um banco ou no chão\n2. Segure um halter em cada mão na altura do peito\n3. Empurre os halteres para cima até esticar os braços\n4. Desça controladamente até a posição inicial\n5. Mantenha os cotovelos a 45 graus do corpo' 
      },
      { 
        name: 'Rosca direta', 
        duration: 60, 
        reps: 15, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com um halter em cada mão\n2. Braços estendidos ao lado do corpo, palmas para frente\n3. Flexione os cotovelos levantando os halteres\n4. Contraia o bíceps no topo\n5. Desça controladamente' 
      },
      { 
        name: 'Desenvolvimento de ombros', 
        duration: 60, 
        reps: 12, 
        sets: 3, 
        rest: 30, 
        description: '1. Sentado ou em pé, halteres na altura dos ombros\n2. Palmas voltadas para frente\n3. Empurre os halteres para cima até esticar os braços\n4. Desça controladamente até os ombros\n5. Não arqueie as costas' 
      },
      { 
        name: 'Elevação lateral', 
        duration: 60, 
        reps: 15, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com um halter em cada mão ao lado do corpo\n2. Levante os braços lateralmente até a altura dos ombros\n3. Cotovelos levemente flexionados\n4. Desça controladamente\n5. Não balance o corpo' 
      },
      { 
        name: 'Tríceps testa', 
        duration: 60, 
        reps: 12, 
        sets: 3, 
        rest: 30, 
        description: '1. Deite-se com os braços estendidos para cima\n2. Segure um halter em cada mão\n3. Flexione apenas os cotovelos, levando os halteres em direção à testa\n4. Estenda os braços voltando à posição inicial\n5. Mantenha os cotovelos fixos' 
      }
    ]
  },
  {
    id: 'dumbbell-lower-30',
    name: 'Treino com Halteres - Pernas e Glúteos',
    duration: 30,
    level: 'intermediario',
    type: 'forca',
    equipment: ['Halteres (3-8kg)'],
    muscleGroups: ['Pernas', 'Glúteos', 'Core'],
    calories: 250,
    thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
    exercises: [
      { 
        name: 'Agachamento com halteres', 
        duration: 60, 
        reps: 15, 
        sets: 4, 
        rest: 30, 
        description: '1. Fique em pé com um halter em cada mão ao lado do corpo\n2. Pés na largura dos ombros\n3. Desça como se fosse sentar, mantendo as costas retas\n4. Desça até as coxas ficarem paralelas ao chão\n5. Suba empurrando pelos calcanhares' 
      },
      { 
        name: 'Afundo com halteres', 
        duration: 60, 
        reps: 12, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com um halter em cada mão\n2. Dê um passo à frente com uma perna\n3. Desça até o joelho traseiro quase tocar o chão\n4. Joelho da frente não deve ultrapassar a ponta do pé\n5. Volte à posição inicial e alterne as pernas' 
      },
      { 
        name: 'Stiff com halteres', 
        duration: 60, 
        reps: 15, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com um halter em cada mão na frente das coxas\n2. Pernas levemente flexionadas\n3. Incline o tronco para frente mantendo as costas retas\n4. Desça os halteres até a altura das canelas\n5. Suba contraindo glúteos e posteriores de coxa' 
      },
      { 
        name: 'Agachamento sumô', 
        duration: 60, 
        reps: 15, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com as pernas bem abertas\n2. Pés apontando para fora a 45 graus\n3. Segure um halter com as duas mãos entre as pernas\n4. Desça mantendo o tronco ereto\n5. Suba contraindo glúteos e parte interna das coxas' 
      },
      { 
        name: 'Elevação de panturrilha', 
        duration: 60, 
        reps: 20, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com um halter em cada mão\n2. Suba na ponta dos pés o máximo que conseguir\n3. Contraia as panturrilhas no topo\n4. Desça controladamente\n5. Pode fazer em um degrau para maior amplitude' 
      }
    ]
  },
  {
    id: 'home-beginner-20',
    name: 'Treino em Casa - Iniciante Completo',
    duration: 20,
    level: 'iniciante',
    type: 'forca',
    equipment: ['Nenhum - Peso corporal'],
    muscleGroups: ['Corpo todo'],
    calories: 180,
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    exercises: [
      { 
        name: 'Flexão de joelhos', 
        duration: 60, 
        reps: 10, 
        sets: 3, 
        rest: 30, 
        description: '1. Posição de flexão, mas apoie os joelhos no chão\n2. Mãos um pouco mais largas que os ombros\n3. Desça o peito em direção ao chão\n4. Suba empurrando o chão\n5. Mantenha o corpo alinhado' 
      },
      { 
        name: 'Agachamento', 
        duration: 60, 
        reps: 15, 
        sets: 3, 
        rest: 30, 
        description: '1. Fique em pé com os pés na largura dos ombros\n2. Braços estendidos à frente para equilíbrio\n3. Desça como se fosse sentar\n4. Mantenha o peso nos calcanhares\n5. Suba contraindo glúteos' 
      },
      { 
        name: 'Prancha', 
        duration: 30, 
        sets: 3, 
        rest: 30, 
        description: '1. Apoie os antebraços e dedos dos pés\n2. Corpo reto da cabeça aos pés\n3. Contraia abdômen e glúteos\n4. Olhe para o chão\n5. Respire normalmente' 
      },
      { 
        name: 'Ponte de glúteo', 
        duration: 60, 
        reps: 15, 
        sets: 3, 
        rest: 30, 
        description: '1. Deite de costas, joelhos flexionados, pés no chão\n2. Braços ao lado do corpo\n3. Levante o quadril contraindo os glúteos\n4. Forme uma linha reta dos ombros aos joelhos\n5. Desça controladamente' 
      },
      { 
        name: 'Superman', 
        duration: 60, 
        reps: 12, 
        sets: 3, 
        rest: 30, 
        description: '1. Deite de barriga para baixo\n2. Braços estendidos à frente\n3. Levante simultaneamente braços, peito e pernas\n4. Contraia as costas\n5. Segure por 2 segundos e desça' 
      }
    ]
  },
  {
    id: 'yoga-morning-20',
    name: 'Yoga Matinal - Energia do Dia',
    duration: 20,
    level: 'iniciante',
    type: 'yoga',
    equipment: ['Tapete de yoga (opcional)'],
    muscleGroups: ['Corpo todo', 'Flexibilidade'],
    calories: 80,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Respiração Profunda', duration: 60, description: '1. Sente-se confortavelmente\n2. Inspire profundamente pelo nariz por 4 segundos\n3. Segure por 2 segundos\n4. Expire pela boca por 6 segundos\n5. Repita focando na respiração' },
      { name: 'Saudação ao Sol', duration: 120, reps: 3, description: '1. Comece em pé, mãos em prece\n2. Estenda braços para cima\n3. Incline para frente tocando o chão\n4. Posição de prancha\n5. Cachorro olhando para baixo\n6. Retorne à posição inicial' },
      { name: 'Postura do Guerreiro I', duration: 45, description: '1. Perna direita à frente, joelho a 90 graus\n2. Perna esquerda esticada atrás\n3. Braços estendidos para cima\n4. Olhe para as mãos\n5. Repita do outro lado' },
      { name: 'Postura do Guerreiro II', duration: 45, description: '1. Mesma base do Guerreiro I\n2. Abra os braços lateralmente\n3. Olhe para a mão da frente\n4. Mantenha o tronco ereto\n5. Repita do outro lado' },
      { name: 'Postura da Árvore', duration: 40, description: '1. Fique em pé, peso em uma perna\n2. Apoie o pé da outra perna na coxa ou panturrilha\n3. Mãos em prece no peito ou acima da cabeça\n4. Foque em um ponto fixo\n5. Repita do outro lado' },
      { name: 'Postura da Criança', duration: 60, description: '1. Ajoelhe-se e sente sobre os calcanhares\n2. Incline o tronco para frente\n3. Estenda os braços à frente\n4. Testa no chão\n5. Relaxe e respire' },
      { name: 'Meditação Final', duration: 120, description: '1. Deite de costas, pernas e braços relaxados\n2. Feche os olhos\n3. Respire naturalmente\n4. Relaxe cada parte do corpo\n5. Permaneça em paz' }
    ]
  },
  {
    id: 'strength-upper-30',
    name: 'Força - Membros Superiores',
    duration: 30,
    level: 'intermediario',
    type: 'forca',
    equipment: ['Halteres (opcional)', 'Peso corporal'],
    muscleGroups: ['Peito', 'Braços', 'Ombros', 'Costas'],
    calories: 200,
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Flexões', duration: 60, reps: 15, sets: 3, rest: 30, description: '1. Posição de prancha, mãos na largura dos ombros\n2. Desça o peito até quase tocar o chão\n3. Cotovelos a 45 graus do corpo\n4. Suba empurrando o chão\n5. Mantenha o core contraído' },
      { name: 'Tríceps no banco', duration: 60, reps: 12, sets: 3, rest: 30, description: '1. Apoie as mãos em uma cadeira ou banco\n2. Pernas estendidas à frente\n3. Desça flexionando os cotovelos\n4. Suba estendendo os braços\n5. Mantenha os cotovelos próximos ao corpo' },
      { name: 'Rosca bíceps', duration: 60, reps: 15, sets: 3, rest: 30, description: '1. Use halteres ou garrafas com água\n2. Braços estendidos ao lado do corpo\n3. Flexione os cotovelos levantando o peso\n4. Contraia o bíceps no topo\n5. Desça controladamente' },
      { name: 'Elevação lateral', duration: 60, reps: 12, sets: 3, rest: 30, description: '1. Halteres ou garrafas ao lado do corpo\n2. Levante os braços lateralmente\n3. Até a altura dos ombros\n4. Cotovelos levemente flexionados\n5. Desça controladamente' },
      { name: 'Prancha alta', duration: 45, sets: 3, rest: 30, description: '1. Posição de flexão, braços estendidos\n2. Corpo reto da cabeça aos pés\n3. Contraia abdômen e glúteos\n4. Olhe para o chão\n5. Mantenha a posição' },
      { name: 'Superman', duration: 45, reps: 15, sets: 3, rest: 30, description: '1. Deite de barriga para baixo\n2. Estenda braços e pernas\n3. Levante simultaneamente\n4. Contraia as costas\n5. Segure e desça' }
    ]
  },
  {
    id: 'hiit-advanced-30',
    name: 'HIIT Avançado - Máxima Queima',
    duration: 30,
    level: 'avancado',
    type: 'HIIT',
    equipment: ['Nenhum - Peso corporal'],
    muscleGroups: ['Corpo todo'],
    calories: 350,
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Burpees', duration: 40, description: '1. Comece em pé\n2. Agache e apoie as mãos no chão\n3. Jogue as pernas para trás (prancha)\n4. Faça uma flexão\n5. Pule as pernas de volta e salte' },
      { name: 'Descanso', duration: 20, description: 'Recuperação ativa - ande no lugar' },
      { name: 'Jump Squats', duration: 40, reps: 20, description: '1. Agachamento normal\n2. Ao subir, salte explosivamente\n3. Aterrisse suavemente\n4. Desça imediatamente para próximo agachamento\n5. Mantenha o ritmo' },
      { name: 'Descanso', duration: 20, description: 'Respire profundamente' },
      { name: 'Mountain Climbers', duration: 40, description: '1. Posição de prancha alta\n2. Traga joelho direito ao peito\n3. Alterne rapidamente com joelho esquerdo\n4. Mantenha quadril baixo\n5. Velocidade máxima' },
      { name: 'Descanso', duration: 20, description: 'Recupere o fôlego' },
      { name: 'Prancha com toque', duration: 40, description: '1. Posição de prancha alta\n2. Toque ombro direito com mão esquerda\n3. Alterne os lados\n4. Mantenha quadril estável\n5. Movimento controlado' },
      { name: 'Descanso', duration: 20, description: 'Prepare-se para o final' },
      { name: 'High Knees', duration: 40, description: '1. Corra no lugar\n2. Levante os joelhos até a altura do quadril\n3. Velocidade máxima\n4. Balance os braços\n5. Mantenha o ritmo' },
      { name: 'Descanso', duration: 20, description: 'Última recuperação' }
    ]
  },
  {
    id: 'strength-lower-30',
    name: 'Força - Membros Inferiores',
    duration: 30,
    level: 'intermediario',
    type: 'forca',
    equipment: ['Nenhum - Peso corporal'],
    muscleGroups: ['Pernas', 'Glúteos', 'Core'],
    calories: 220,
    thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Agachamento', duration: 60, reps: 20, sets: 4, rest: 30, description: '1. Pés na largura dos ombros\n2. Desça até coxas paralelas ao chão\n3. Peso nos calcanhares\n4. Costas retas\n5. Suba contraindo glúteos' },
      { name: 'Afundo', duration: 60, reps: 15, sets: 3, rest: 30, description: '1. Passo largo à frente\n2. Desça até joelho traseiro quase tocar o chão\n3. Joelho da frente não ultrapassa o pé\n4. Suba e alterne as pernas\n5. Mantenha o equilíbrio' },
      { name: 'Ponte de glúteo', duration: 60, reps: 20, sets: 3, rest: 30, description: '1. Deite de costas, joelhos flexionados\n2. Levante o quadril\n3. Contraia glúteos no topo\n4. Forme linha reta\n5. Desça controladamente' },
      { name: 'Agachamento sumô', duration: 60, reps: 15, sets: 3, rest: 30, description: '1. Pernas bem abertas\n2. Pés apontando para fora\n3. Desça mantendo tronco ereto\n4. Joelhos na direção dos pés\n5. Suba contraindo glúteos' },
      { name: 'Elevação de panturrilha', duration: 60, reps: 25, sets: 3, rest: 30, description: '1. Fique em pé\n2. Suba na ponta dos pés\n3. Contraia panturrilhas no topo\n4. Desça controladamente\n5. Pode usar degrau para amplitude' },
      { name: 'Prancha lateral', duration: 40, sets: 2, rest: 30, description: '1. Apoie antebraço e lateral do pé\n2. Corpo reto lateral\n3. Quadril elevado\n4. Contraia oblíquos\n5. Repita do outro lado' }
    ]
  },
  {
    id: 'cardio-dance-30',
    name: 'Cardio Dance - Diversão Garantida',
    duration: 30,
    level: 'iniciante',
    type: 'cardio',
    equipment: ['Nenhum'],
    muscleGroups: ['Corpo todo', 'Cardio'],
    calories: 250,
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Aquecimento - Marcha', duration: 120, description: '1. Marche no lugar\n2. Levante bem os joelhos\n3. Balance os braços\n4. Aumente gradualmente a intensidade\n5. Sorria e divirta-se!' },
      { name: 'Passos laterais', duration: 180, description: '1. Dê passos laterais para direita e esquerda\n2. Adicione movimento de braços\n3. Mantenha o ritmo\n4. Varie a velocidade\n5. Sinta a música' },
      { name: 'Giros e braços', duration: 180, description: '1. Gire o corpo suavemente\n2. Movimente os braços livremente\n3. Coordene com as pernas\n4. Explore diferentes movimentos\n5. Deixe o corpo fluir' },
      { name: 'Saltos suaves', duration: 180, description: '1. Saltos leves no lugar\n2. Adicione variações\n3. Saltos laterais\n4. Saltos para frente e trás\n5. Mantenha o impacto baixo' },
      { name: 'Movimentos livres', duration: 300, description: '1. Dance livremente\n2. Combine todos os movimentos\n3. Deixe a música guiar\n4. Não tenha vergonha\n5. Aproveite o momento!' },
      { name: 'Resfriamento', duration: 120, description: '1. Diminua gradualmente o ritmo\n2. Movimentos mais lentos\n3. Respire profundamente\n4. Alongue suavemente\n5. Relaxe' }
    ]
  },
  {
    id: 'flexibility-stretch-20',
    name: 'Alongamento Completo',
    duration: 20,
    level: 'iniciante',
    type: 'flexibilidade',
    equipment: ['Tapete (opcional)'],
    muscleGroups: ['Corpo todo', 'Flexibilidade'],
    calories: 60,
    thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Alongamento de pescoço', duration: 60, description: '1. Incline a cabeça para o lado direito\n2. Segure por 15 segundos\n3. Repita para o lado esquerdo\n4. Incline para frente e para trás\n5. Movimentos suaves e controlados' },
      { name: 'Alongamento de ombros', duration: 60, description: '1. Puxe o braço direito através do peito\n2. Use o braço esquerdo para segurar\n3. Segure por 30 segundos\n4. Repita com o outro braço\n5. Mantenha os ombros relaxados' },
      { name: 'Alongamento de tríceps', duration: 60, description: '1. Leve o braço direito acima da cabeça\n2. Flexione o cotovelo, mão nas costas\n3. Use a mão esquerda para empurrar suavemente\n4. Segure por 30 segundos\n5. Repita com o outro braço' },
      { name: 'Torção de tronco', duration: 60, description: '1. Sente-se com pernas cruzadas\n2. Gire o tronco para a direita\n3. Use as mãos para apoio\n4. Segure por 30 segundos\n5. Repita para o outro lado' },
      { name: 'Alongamento de isquiotibiais', duration: 90, description: '1. Sente-se com pernas estendidas\n2. Incline o tronco para frente\n3. Tente tocar os pés\n4. Mantenha as costas retas\n5. Respire e relaxe' },
      { name: 'Alongamento de quadríceps', duration: 60, description: '1. Fique em pé, segure em algo para equilíbrio\n2. Flexione o joelho direito\n3. Puxe o pé em direção ao glúteo\n4. Segure por 30 segundos\n5. Repita com a outra perna' },
      { name: 'Alongamento de panturrilha', duration: 60, description: '1. Perna direita estendida à frente\n2. Puxe os dedos do pé em sua direção\n3. Segure por 30 segundos\n4. Repita com a outra perna\n5. Sinta o alongamento na panturrilha' },
      { name: 'Postura do pombo', duration: 90, description: '1. Perna direita flexionada à frente\n2. Perna esquerda estendida atrás\n3. Incline o tronco para frente\n4. Segure por 45 segundos cada lado\n5. Abre profundamente o quadril' }
    ]
  },
  {
    id: 'hiit-tabata-20',
    name: 'Tabata Intenso - 4 Minutos',
    duration: 20,
    level: 'avancado',
    type: 'HIIT',
    equipment: ['Nenhum'],
    muscleGroups: ['Corpo todo'],
    calories: 200,
    thumbnail: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop',
    exercises: [
      { name: 'Aquecimento', duration: 180, description: '1. Marcha no lugar\n2. Rotação de braços\n3. Agachamentos leves\n4. Aumente gradualmente a intensidade\n5. Prepare o corpo' },
      { name: 'Burpees', duration: 20, description: '1. Máxima intensidade\n2. Movimento completo\n3. Explosão no salto\n4. Aterrissagem controlada\n5. Não pare!' },
      { name: 'Descanso', duration: 10, description: 'Recuperação rápida - respire' },
      { name: 'Jump Squats', duration: 20, description: '1. Explosão máxima\n2. Salto alto\n3. Aterrissagem suave\n4. Próximo rep imediato\n5. Força total!' },
      { name: 'Descanso', duration: 10, description: 'Respire fundo' },
      { name: 'Mountain Climbers', duration: 20, description: '1. Velocidade máxima\n2. Joelhos ao peito\n3. Quadril baixo\n4. Core contraído\n5. Não desista!' },
      { name: 'Descanso', duration: 10, description: 'Recupere rapidamente' },
      { name: 'High Knees', duration: 20, description: '1. Joelhos bem altos\n2. Velocidade máxima\n3. Balance os braços\n4. Mantenha o ritmo\n5. Última rodada!' },
      { name: 'Descanso', duration: 10, description: 'Última pausa' },
      { name: 'Resfriamento', duration: 120, description: '1. Diminua a intensidade\n2. Marcha leve\n3. Respire profundamente\n4. Alongue suavemente\n5. Parabéns!' }
    ]
  }
];

export const equipmentOptions = [
  'Nenhum - Peso corporal',
  'Halteres',
  'Faixa elástica',
  'Tapete de yoga',
  'Barra de pull-up',
  'Kettlebell',
  'Corda de pular'
];

export const muscleGroupOptions = [
  'Corpo todo',
  'Peito',
  'Costas',
  'Braços',
  'Ombros',
  'Pernas',
  'Glúteos',
  'Core',
  'Cardio',
  'Flexibilidade'
];
