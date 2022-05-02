import { Injectable } from '@angular/core';
import { Quiz } from '@interfaces/quiz.interface';
import { first, Observable, ReplaySubject, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private answersDisabledSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private timerSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private apiService: ApiService) {}

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

  public getPublicQuizzes(): Observable<Quiz[]> {
    return this.apiService
      .get(`quiz`)
      .pipe(
        first(),
        map((res: any) => {
          return res;
        })
      )
  }

  public getQuiz(quizId: string): Observable<Quiz> {
    return this.apiService
      .get(`quiz/${quizId}`)
      .pipe(
        first(),
        map((res: any) => {
          return res;
        })
      )
  }

}
