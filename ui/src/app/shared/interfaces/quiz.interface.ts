export interface Quiz {
  id: string,
  title: string,
  description: string,
  duration: number,
  visibility: string,
  questions: Question[]
  created_at?: string;
  updated_at?: string;
}

export interface Question {
  id: string,
  name: string,
  options: Option[]
}

export interface SelectedQuestion {
  id: string,
  name: string,
  option: Option
}

export interface Option {
  id: string,
  name: string,
  is_correct: boolean
}

export interface DeletedQuiz {
  deleted: boolean,
  message: string
}