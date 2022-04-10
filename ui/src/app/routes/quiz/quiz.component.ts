import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '@services/quiz.service';
import { Subject } from 'rxjs';

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
  public buttonText: string = 'Next Question';
  public status: string = 'init';

  public readonly nextActionSubject = new Subject<boolean>();
  public readonly resetTimerSubject = new Subject<void>();

  public quizName: string = 'Quiz Title';
  public quizDescription: string = 'Quiz Description';
  public isNextBtnDisabled: boolean = true;
  public hasTimeEnded: boolean = false;


  public duration: number = 0;
  public quizResponses: any = [];
  private quizData = this.quizService.quizData;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.setQuizBasics(this.quizData);
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
    this.checkAnswerOption();
    let currIdx = ++index;

    if (currIdx === this.totalQuestions) {
      this.updateStatus('showResults');
      this.buttonText = 'Finish Quiz';
      return;
    }

    if (currIdx === this.totalQuestions - 1) {
      this.buttonText = 'Show Results';
    }

    this.setCurrentQuestion(currIdx);
    this.nextActionSubject.next(true);
    this.resetTimerSubject.next();
    this.quizService.setDisableAnswersStatus(false);
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

    console.log(this.quizResponses);

  }

  public copyLink(val: string) {
    navigator.clipboard.writeText(val);
  }

  public timerCallback(hasTimeEnded: boolean) {
    this.quizService.setDisableAnswersStatus(hasTimeEnded);
  }

  private setCurrentQuestion(number: number) {
    this.currentQuestion = this.quizData.data[number];
    this.currentQuestionIndex = number;
  }

  private setTotalQuestions(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
  }

  private setQuizBasics(data: any) {
    this.quizName = data.name;
    this.quizDescription = data.description;
    this.duration = data.duration;
  }

  private checkAnswerOption() {
    console.log('quizResLen ', this.quizResponses.length);
    console.log('currentQuestionIndex ', this.currentQuestionIndex);

    const emptyAnswer = {
      questionId: this.quizData.data[this.currentQuestionIndex].questionId,
      questionText: this.quizData.data[this.currentQuestionIndex].questionText,
      answer: {
        answerId: null,
        answerText: 'Not answered',
        isCorrect: false
      }
    }

    const hasBeenAnswered = !!this.quizResponses.find((response: any) => response.questionId === this.quizData.data[this.currentQuestionIndex].questionId);
    if (!hasBeenAnswered) {
      this.quizResponses.push(emptyAnswer);
    }
  }

}
