// TODO:: Is the interface needed?
export interface Quiz {
  id: string,
  title: string,
  description: string,
  duration: number,
  visibility: boolean,
  created_at: Date,
  updated_at: Date
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string,
  name: string,
  quiz_id: string,
  options: QuizOption[]
}

export interface QuizOption {
  id: string,
  name: string,
  correct: boolean,
  question_id: string
}
