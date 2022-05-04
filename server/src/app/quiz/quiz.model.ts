// TODO:: Is the interface needed?
export interface Quiz {
  id: string,
  title: string,
  description: string,
  duration: number,
  visibility: string,
  created_at: Date,
  updated_at: Date,
  questions: QuizQuestion[],
  visited: number,
  played: number
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
  is_correct: boolean,
  question_id: string
}
