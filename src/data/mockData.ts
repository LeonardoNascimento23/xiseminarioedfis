import { ActivitySchedule, User, Lecture, NewsArticle } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'participant'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'participant'
  }
];

export const mockSchedule: ActivitySchedule[] = [
  {
    id: '1',
    title: 'Festival de Dança, apresentações artísticas e culturais',
    date: '2025-06-23',
    startTime: '19:00',
    endTime: '22:30',
    type: 'event',
    location: 'Auditório da UFGD – Unidade 2',
    description: 'Apresentações artísticas e culturais dos alunos do curso de Educação Física.',
    status: 'Aguardando'
  },
  {
    id: '2',
    title: 'Bancas de trabalho de conclusão de curso e apresentações de estágio supervisionado',
    date: '2025-06-24',
    startTime: '19:00',
    endTime: '22:30',
    type: 'presentation',
    location: 'FAED',
    description: 'Apresentação dos trabalhos de conclusão de curso e estágios supervisionados.',
    status: 'Aguardando'
  },
  {
    id: '3',
    title: 'Bancas de trabalho de conclusão de curso e apresentações de estágio supervisionado',
    date: '2025-06-25',
    startTime: '19:00',
    endTime: '22:30',
    type: 'presentation',
    location: 'FAED',
    description: 'Apresentação dos trabalhos de conclusão de curso e estágios supervisionados.',
    status: 'Aguardando'
  },
  {
    id: '4',
    title: 'Oficina Atividade Física Funcional',
    date: '2025-06-26',
    startTime: '08:00',
    endTime: '12:00',
    type: 'workshop',
    location: 'Sala de Ginástica - UFGD',
    description: 'Oficina ministrada pela Doutora Karla Soares Bertuccini sobre Atividade Física Funcional.',
    status: 'Aguardando'
  },
  {
    id: '5',
    title: 'Oficina Esportes de Aventura',
    date: '2025-06-26',
    startTime: '13:00',
    endTime: '17:00',
    type: 'workshop',
    location: 'Área Externa - UFGD',
    description: 'Oficina ministrada pelo Professor Lucas da Silva Ferreira sobre Esportes de Aventura, com foco em Slackline.',
    status: 'Aguardando'
  },
  {
    id: '6',
    title: 'Oficina Ginástica Rítmica',
    date: '2025-06-26',
    startTime: '08:00',
    endTime: '12:00',
    type: 'workshop',
    location: 'Sala de Dança - UFGD',
    description: 'Oficina ministrada pela Professora Paola Gouveia Schemberger Levandoski sobre Ginástica Rítmica.',
    status: 'Aguardando'
  },
  {
    id: '7',
    title: 'Oficina Introdução ao Beach Tennis',
    date: '2025-06-26',
    startTime: '13:00',
    endTime: '17:00',
    type: 'workshop',
    location: 'Quadra de Areia - UFGD',
    description: 'Oficina ministrada pelo Instrutor Jader Morilla sobre Beach Tennis.',
    status: 'Aguardando'
  },
  {
    id: '8',
    title: 'Oficina Nutrição Esportiva Aplicada à Hipertrofia e Redução de Massa Gorda',
    date: '2025-06-26',
    startTime: '19:00',
    endTime: '22:00',
    type: 'workshop',
    location: 'Auditório - UFGD',
    description: 'Oficina ministrada pelo Doutor Paulo Christiano Barboso Lollo sobre Nutrição Esportiva.',
    status: 'Aguardando'
  }
];

export const mockLectures: Lecture[] = [
  {
    id: '1',
    title: 'Práticas Pedagógicas Inovadoras em Educação Física',
    speaker: 'Dra. Maria Santos',
    speakerBio: 'Doutora em Educação Física pela USP, com mais de 15 anos de experiência em metodologias ativas de ensino. Pesquisadora na área de práticas pedagógicas inovadoras e tecnologia aplicada à Educação Física.',
    description: 'Uma análise aprofundada das metodologias contemporâneas no ensino da Educação Física, explorando abordagens inovadoras e sua aplicação prática em diferentes contextos educacionais.',
    date: '2025-06-24',
    time: '19:00',
    location: 'Auditório Principal - FAED',
    imageUrl: 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg',
    maxParticipants: 100,
    currentParticipants: 45,
    learningPoints: [
      'Metodologias ativas aplicadas à Educação Física',
      'Integração de tecnologia nas aulas práticas',
      'Avaliação formativa no contexto da Educação Física',
      'Estratégias para engajamento dos alunos'
    ]
  },
  {
    id: '2',
    title: 'Educação Física Inclusiva: Desafios e Possibilidades',
    speaker: 'Dr. Carlos Oliveira',
    speakerBio: 'Especialista em Educação Física Adaptada, com vasta experiência em programas de inclusão. Coordenador do Núcleo de Acessibilidade e Inclusão da UFMG.',
    description: 'Estratégias práticas e fundamentação teórica para uma prática inclusiva e adaptada nas aulas de Educação Física, considerando diferentes necessidades e habilidades.',
    date: '2025-06-25',
    time: '19:00',
    location: 'Auditório Principal - FAED',
    imageUrl: 'https://images.pexels.com/photos/3755435/pexels-photo-3755435.jpeg',
    maxParticipants: 80,
    currentParticipants: 65,
    learningPoints: [
      'Adaptação de atividades para diferentes necessidades',
      'Comunicação efetiva com alunos com deficiência',
      'Recursos e materiais adaptados',
      'Avaliação inclusiva em Educação Física'
    ]
  },
  {
    id: '3',
    title: 'Pesquisa em Educação Física: Tendências Atuais',
    speaker: 'Dra. Ana Paula Silva',
    speakerBio: 'Pesquisadora renomada com publicações internacionais na área de Educação Física. Coordenadora do Laboratório de Pesquisa em Movimento Humano da UFRJ.',
    description: 'Panorama completo das principais linhas de pesquisa em Educação Física no Brasil e no mundo, com foco em metodologias inovadoras e resultados práticos.',
    date: '2025-06-26',
    time: '19:00',
    location: 'Auditório Principal - FAED',
    imageUrl: 'https://images.pexels.com/photos/3755442/pexels-photo-3755442.jpeg',
    maxParticipants: 120,
    currentParticipants: 85,
    learningPoints: [
      'Métodos de pesquisa em Educação Física',
      'Análise de dados em estudos do movimento',
      'Publicação científica na área',
      'Integração entre pesquisa e prática profissional'
    ]
  }
];

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Inscrições Abertas para o XI Seminário',
    content: `O XI Seminário de Práticas de Ensino, Pesquisa e Extensão em Educação Física está com inscrições abertas! Este ano, o evento promete ser ainda mais especial, trazendo palestrantes renomados e discussões fundamentais para a área.

    O seminário acontecerá nos dias 10 e 11 de junho de 2025, no Campus Universitário da UFGD, e contará com uma programação diversificada que inclui palestras, workshops, apresentações de trabalhos e atividades culturais.

    Entre os destaques da programação, teremos discussões sobre metodologias ativas no ensino da Educação Física, inclusão e adaptação de atividades físicas, e as últimas tendências em pesquisa na área.

    As inscrições podem ser realizadas através do nosso site até o dia 8 de junho. Não perca esta oportunidade de participar de um dos maiores eventos acadêmicos da área!`,
    summary: 'Participe deste importante evento acadêmico que acontecerá nos dias 10 e 11 de junho de 2025.',
    date: '2025-05-15',
    author: 'Comissão Organizadora',
    category: 'Eventos',
    imageUrl: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg',
    tags: ['inscrições', 'seminário', 'educação física', 'evento acadêmico'],
    relatedArticles: ['2', '3']
  },
  {
    id: '2',
    title: 'Programação Completa Divulgada',
    content: `A Comissão Organizadora do XI Seminário de Práticas de Ensino, Pesquisa e Extensão em Educação Física tem o prazer de anunciar a programação completa do evento!

    Este ano, preparamos uma programação especial que abrange diferentes aspectos da Educação Física, desde práticas pedagógicas inovadoras até as mais recentes pesquisas na área.

    Destaques da Programação:
    - Palestras com especialistas renomados
    - Workshops práticos e interativos
    - Sessões de apresentação de trabalhos
    - Atividades culturais e artísticas
    - Momentos de networking e troca de experiências

    Todas as atividades foram cuidadosamente planejadas para proporcionar uma experiência enriquecedora aos participantes, combinando teoria e prática.

    Confira a programação completa na seção "Programação" do nosso site e planeje sua participação!`,
    summary: 'Confira a programação completa do evento, incluindo palestras, workshops e apresentações culturais.',
    date: '2025-05-20',
    author: 'Coordenação do Evento',
    category: 'Programação',
    imageUrl: 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg',
    tags: ['programação', 'palestras', 'workshops', 'atividades'],
    relatedArticles: ['1', '3']
  },
  {
    id: '3',
    title: 'Chamada para Submissão de Trabalhos',
    content: `Está aberta a chamada para submissão de trabalhos acadêmicos para o XI Seminário de Práticas de Ensino, Pesquisa e Extensão em Educação Física!

    Esta é uma excelente oportunidade para compartilhar suas pesquisas, experiências e projetos com a comunidade acadêmica. Aceitamos trabalhos nas seguintes modalidades:

    - Artigos completos
    - Resumos expandidos
    - Relatos de experiência
    - Projetos de pesquisa em andamento

    Áreas Temáticas:
    1. Práticas Pedagógicas em Educação Física
    2. Inclusão e Adaptação em Educação Física
    3. Tecnologia e Inovação no Ensino
    4. Saúde e Qualidade de Vida
    5. Formação Profissional em Educação Física

    Os trabalhos aprovados serão apresentados durante o evento e publicados nos anais do seminário.

    Prazo para submissão: 30 de maio de 2025
    Resultado da avaliação: 10 de junho de 2025

    Consulte as diretrizes para submissão no nosso site.`,
    summary: 'Está aberta a chamada para submissão de trabalhos acadêmicos. Compartilhe suas pesquisas e experiências!',
    date: '2025-05-10',
    author: 'Comitê Científico',
    category: 'Acadêmico',
    imageUrl: 'https://images.pexels.com/photos/3755763/pexels-photo-3755763.jpeg',
    tags: ['submissão', 'trabalhos acadêmicos', 'pesquisa', 'prazo'],
    relatedArticles: ['1', '2']
  }
];

export const eventInfo = {
  title: 'XI Seminário de Práticas de Ensino, Pesquisa e Extensão em Educação Física',
  description: 'O XI Seminário de Práticas de Ensino, Pesquisa e Extensão em Educação Física é uma iniciativa dos/as professores/as do Curso de Licenciatura em Educação Física com o objetivo de apresentar os produtos finais das disciplinas de Estágio Supervisionado e Trabalho de Conclusão de Curso e promover a interação entre a universidade e a sociedade, levando os conhecimentos e recursos produzidos dentro da instituição para fora dos muros, beneficiando a comunidade e contribuindo para o desenvolvimento social, cultural e econômico.',
  registrationDeadline: '2025-06-08',
  contact: {
    email: 'pamela@email.com',
    phone: '(67) XXXX-XXXX'
  },
  organizers: [
    {
      name: 'Emily Alves da Silva',
      role: 'Membro da Comissão Organizadora',
      course: 'Educação Física',
      institution: 'UFGD'
    },
    {
      name: 'Jhenyffer Freire de Oliveira',
      role: 'Membro da Comissão Organizadora',
      course: 'Educação Física',
      institution: 'UFGD'
    },
    {
      name: 'Leonardo Meira Nantes',
      role: 'Membro da Comissão Organizadora',
      course: 'Educação Física',
      institution: 'UFGD'
    },
    {
      name: 'Leonardo Vital Martin do Nascimento',
      role: 'Membro da Comissão Organizadora',
      course: 'Sistemas de Informação',
      institution: 'UFGD'
    },
    {
      name: 'Mariana Zucão Barbosa Espindola',
      role: 'Coordenador(a), Membro da Comissão Organizadora',
      course: 'Educação Física',
      institution: 'UFGD'
    },
    {
      name: 'Pâmela Talita Valdez de Lima',
      role: 'Comissão Organizadora',
      course: 'Educação Física Licenciatura',
      institution: 'UFGD'
    }
  ],
  logos: {
    ufgd: '/images/logotipoufgd.png',
    edFisica: '/images/EducacaoFisica.png',
    faed: '/images/FAEDlogo.png'
  }
};