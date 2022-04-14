
// Is the interface needed?
export interface AnswerAnalytics {
  id: number,
  uuid: string,
  question_id: string,
  success: boolean
  created_at: boolean
}

export class AnswerAnalyticsModel {
  id: number;
  uuid: string;
  question_id: string;
  success: boolean;
  created_at: boolean;

  constructor(quiz: AnswerAnalyticsModel) {
    this.id = quiz.id;
    this.uuid = quiz.uuid;
    this.question_id = quiz.question_id;
    this.success = quiz.success;
    this.created_at = quiz.created_at;
  }
}