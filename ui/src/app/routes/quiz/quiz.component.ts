import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@interfaces/quiz.interface';
import { QuizService } from '@services/quiz.service';
import { first, Subject } from 'rxjs';

@Component({
  selector: 'qz-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit, OnDestroy {
  public quiz: Quiz;

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

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.configureQuiz();
  }

  private configureQuiz() {
    this.quizService.getQuiz('qz_1234').pipe(first()).subscribe((quiz: Quiz) => {
      this.quiz = quiz;
      this.setQuizBasics(this.quiz);
      this.setTotalQuestions(this.quiz.questions.length)
    });
  }

  public loadQuiz() {
    this.currentQuestion = this.quiz.questions[0];
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
  }

  public copyLink(quizId: string) {
    const link = `https://www.quizzy.com/quiz/${quizId}`
    navigator.clipboard.writeText(link);
  }

  public timerCallback(hasTimeEnded: boolean) {
    this.quizService.setDisableAnswersStatus(hasTimeEnded);
  }

  private setCurrentQuestion(number: number) {
    this.currentQuestion = this.quiz.questions[number];
    this.currentQuestionIndex = number;
  }

  private setTotalQuestions(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
  }

  private setQuizBasics(data: any) {
    this.quizName = data.title;
    this.quizDescription = data.description;
    this.duration = data.duration;
  }

  private checkAnswerOption() {
    const emptyAnswer = {
      id: this.quiz.questions[this.currentQuestionIndex].id,
      name: this.quiz.questions[this.currentQuestionIndex].name,
      option: {
        id: null,
        name: 'Not answered',
        is_correct: false
      }
    }

    const hasBeenAnswered = !!this.quizResponses.find((response: any) => response.id === this.quiz.questions[this.currentQuestionIndex].id);

    if (!hasBeenAnswered) {
      this.quizResponses.push(emptyAnswer);
    }
  }

}
