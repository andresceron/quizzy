import { QuizEntity } from './quiz.entity';

// TODO:: Is the interface needed?
export interface Quiz {
  id: number,
  uuid: string,
  title: string,
  description: string,
  duration: number,
  visibility: boolean,
  questions: QuizQuestion
}

export interface QuizQuestion {
  id: number,
  uuid: string,
  name: string,
  quiz_id: string,
  options: string,
  questions: QuizEntity
}
