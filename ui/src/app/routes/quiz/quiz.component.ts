import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, Quiz, SelectedQuestion } from '@interfaces/quiz.interface';
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
  public buttonText: string = 'Next Question';
  public status: string = 'init';
  public quizName: string = 'Quiz Title';
  public quizDescription: string = 'Quiz Description';
  public duration: number = 0;
  public quizResponses: SelectedQuestion[] = [];
  public quizResults: Question[] = [];

  public readonly nextActionSubject = new Subject<boolean>();
  public readonly resetTimerSubject = new Subject<void>();

  private randomizedQuestions: Question[] = [];
  private quizId: string;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id') || '';
    this.configureQuiz();
  }

  private configureQuiz() {
    this.quizService.getQuiz(this.quizId).pipe(first()).subscribe((quiz: Quiz) => {
      this.quiz = quiz;
      this.randomizeQuestions(this.quiz.questions);
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
      this.showResults();
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

  public questionResponse(event: SelectedQuestion) {
    const responseIndex = this.quizResponses.findIndex((response: SelectedQuestion) => response.id === event.id);
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

  private showResults() {
    this.updateStatus('showResults');
    this.buttonText = 'Finish Quiz';

    // console.log('set:: ', ...new Set(this.quizResponses)); // TODO: use set??
    this.quizService.checkAnswers(this.quizId, this.quizResponses).pipe(first()).subscribe(res => {
      this.quizResults = res;
    });
  }

  private setCurrentQuestion(number: number) {
    this.currentQuestion = this.quiz.questions[number];
    this.currentQuestionIndex = number;
  }

  private setTotalQuestions(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
  }

  private setQuizBasics(data: Quiz) {
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
        name: 'Not answered'
      }
    }

    const hasBeenAnswered = !!this.quizResponses.find((response: SelectedQuestion) => response.id === this.quiz.questions[this.currentQuestionIndex].id);

    if (!hasBeenAnswered) {
      this.quizResponses.push(emptyAnswer);
    }
  }

  private randomizeQuestions(questions: Question[]) {
    this.quiz.questions =
      questions.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
  }

}
