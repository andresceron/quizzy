import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'qz-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit, OnDestroy {
  public currentQuestionIndex: number = 0;
  public currentQuestion: any = {};
  public totalQuestions: any = {};
  public nextCall: boolean = false;
  public buttonText: string = 'Next';
  public status: string = 'init';

  public nextActionSubject = new Subject<boolean>();
  public quizTitle: string = 'Quiz Title';

  private quizData = {
    "quizName": "Quiz Name",
    "quizId": 1,
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
      {
        "questionId": 4,
        "questionText": "Question 4?",
        "answerOptions": [
          { "answerId": 1, "answerText": "Answer M", "isCorrect": false },
          { "answerId": 2, "answerText": "Answer N", "isCorrect": false },
          { "answerId": 3, "answerText": "Answer O", "isCorrect": true },
          { "answerId": 4, "answerText": "Answer P", "isCorrect": false }
        ]
      }
    ]
  };

  public quizResponses: any = [];
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

  constructor() {}

  ngOnInit(): void {
    // this.updateStatus('showResults');
    this.setQuizTitle(this.quizData.quizName);
    this.setTotalQuestions(this.quizData.data.length)
  }

  public loadQuiz() {
    this.currentQuestion = this.quizData.data[0];
    this.currentQuestionIndex = 0;
    this.updateStatus('inProgress');
  }

  public updateStatus(value: string) {
    this.status = value;
  }

  public startQuiz() {
    this.loadQuiz();
  }

  public nextQuestion(index: number): void {
    let currIdx = ++index;

    if (currIdx === this.totalQuestions) {
      console.log('here');

      this.updateStatus('showResults');
      return;
    }

    if (currIdx === this.totalQuestions - 1) {
      this.buttonText = 'Finish';
    }

    this.setCurrentQuestion(currIdx);
    this.nextActionSubject.next(true);
  }

  private setCurrentQuestion(number: number) {
    this.currentQuestion = this.quizData.data[number];
    this.currentQuestionIndex = number;
  }

  private setTotalQuestions(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
  }

  private setQuizTitle(title: string) {
    this.quizTitle = title;
  }

  public ngOnDestroy() {
    this.nextActionSubject.complete();
  }

  public questionResponse(event: any) {
    const responseIndex = this.quizResponses.findIndex((response: any) => response.questionId === event.questionId);
    if (responseIndex !== -1 ) {
      this.quizResponses[responseIndex] = event;
    } else {
      this.quizResponses.push(event);
    }
  }

}
