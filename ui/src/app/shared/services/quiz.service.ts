import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private answersDisabledSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private timerSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor() {}

  public getTimerStatus(): Observable<boolean> {
    return this.timerSubject.asObservable();
  }

  public setTimerStatus(status: boolean) {
    this.timerSubject.next(status);
  }

  public getAnswersDisabledStatus(): Observable<boolean> {
    return this.answersDisabledSubject.asObservable();
  }

  public setDisableAnswersStatus(status: boolean) {
    this.answersDisabledSubject.next(status);
  }

  public get quizData(): any {
    const data = {
      "id": 1,
      "name": "Quiz Name",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "duration": 5,
      "data": [
        {
          "questionId": 1,
          "questionText": "Question 1?",
          "answerOptions": [
            { "answerId": 1, "answerText": "Answer A", "isCorrect": false },
            { "answerId": 2, "answerText": "Answer B", "isCorrect": false },
            { "answerId": 3, "answerText": "Answer C", "isCorrect": true },
            { "answerId": 4, "answerText": "Answer D", "isCorrect": false }
          ]
        },
        {
          "questionId": 2,
          "questionText": "Question 2?",
          "answerOptions": [
            { "answerId": 1, "answerText": "Answer E", "isCorrect": false },
            { "answerId": 2, "answerText": "Answer F", "isCorrect": false },
            { "answerId": 3, "answerText": "Answer G", "isCorrect": true },
            { "answerId": 4, "answerText": "Answer H", "isCorrect": false }
          ]
        },
        {
          "questionId": 3,
          "questionText": "Question 3?",
          "answerOptions": [
            { "answerId": 1, "answerText": "Answer I", "isCorrect": false },
            { "answerId": 2, "answerText": "Answer J", "isCorrect": false },
            { "answerId": 3, "answerText": "Answer K", "isCorrect": true },
            { "answerId": 4, "answerText": "Answer L", "isCorrect": false }
          ]
        },
        // {
        //   "questionId": 4,
        //   "questionText": "Question 4?",
        //   "answerOptions": [
        //     { "answerId": 1, "answerText": "Answer M", "isCorrect": false },
        //     { "answerId": 2, "answerText": "Answer N", "isCorrect": false },
        //     { "answerId": 3, "answerText": "Answer O", "isCorrect": true },
        //     { "answerId": 4, "answerText": "Answer P", "isCorrect": false }
        //   ]
        // }
      ]
    };

    return data;
    //   public quizResponses = [
    //     {
    //       "questionId": 1,
    //       "questionText": "Question 1?",
    //       "answer": {
    //           "answerId": 1,
    //           "answerText": "Answer A",
    //           "isCorrect": false
    //       }
    //   },
    //   {
    //       "questionId": 2,
    //       "questionText": "Question 2?",
    //       "answer": {
    //           "answerId": 3,
    //           "answerText": "Answer G",
    //           "isCorrect": true
    //       }
    //   },
    //   {
    //       "questionId": 3,
    //       "questionText": "Question 3?",
    //       "answer": {
    //           "answerId": 3,
    //           "answerText": "Answer K",
    //           "isCorrect": true
    //       }
    //   },
    //   {
    //       "questionId": 4,
    //       "questionText": "Question 4?",
    //       "answer": {
    //           "answerId": 3,
    //           "answerText": "Answer O",
    //           "isCorrect": false
    //       }
    //   }
    // ];
  }

}
