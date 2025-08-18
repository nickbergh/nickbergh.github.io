export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
  points?: number;
}

export interface ArchetypeOption {
  key: string;
  label: string;
  body: string;
}

export interface QuizLevel {
  id: number;
  name: string;
  title: string;
  blurb: string;
  minScore: number;
  maxScore: number;
  hubUrl: string;
}

export interface QuizResult {
  score: number;
  levelId: number;
  levelName: string;
  levelTitle: string;
  levelBlurb: string;
  levelHubUrl: string;
  archetype: ArchetypeOption;
  email: string;
}

export interface QuizAnswers {
  [questionId: string]: string;
}