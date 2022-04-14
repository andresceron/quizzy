
// Is the interface needed?
export interface Quiz {
  id: number,
  uuid: string,
  title: string,
  description: string,
  duration: number,
  visibility: boolean
}

export class QuizModel {
  id: number;
  uuid: string;
  title: string;
  description: string;
  duration: number;
  visibility: boolean;

  constructor(quiz: QuizModel) {
    this.id = quiz.id;
    this.uuid = quiz.uuid;
    this.title = quiz.title;
    this.description = quiz.description;
    this.duration = quiz.duration;
    this.visibility = quiz.visibility;
  }
}