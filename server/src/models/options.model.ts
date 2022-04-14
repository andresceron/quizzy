
// Is the interface needed?
export interface Option {
  id: number,
  uuid: string,
  name: string,
  correct: boolean,
  question_id: []
}

export class OptionModel {
  id: number;
  uuid: string;
  name: string;
  correct: boolean;
  question_id: [];

  constructor(quiz: OptionModel) {
    this.id = quiz.id;
    this.uuid = quiz.uuid;
    this.name = quiz.name;
    this.correct = quiz.correct;
    this.question_id = quiz.question_id;
  }
}