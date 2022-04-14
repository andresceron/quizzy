
// Is the interface needed?
export interface Quesiton {
  id: number,
  uuid: string,
  name: string,
  quiz_id: string,
  options: []
}

export class QuesitonModel {
  id: number;
  uuid: string;
  name: string;
  quiz_id: string;
  options: [];

  constructor(quiz: QuesitonModel) {
    this.id = quiz.id;
    this.uuid = quiz.uuid;
    this.name = quiz.name;
    this.quiz_id = quiz.quiz_id;
    this.options = quiz.options;
  }
}