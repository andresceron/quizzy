import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option, Question, Quiz } from '@interfaces/quiz.interface';
import { RadioButtonCheckedValidator } from '@shared/validators/require-option.validator';
import { nanoid } from 'nanoid';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class QuizBuilderService {
  private questions = new Map<string, FormGroup>();
  private newQuestionId: string;
  private quizQuestionForm: FormGroup;
  private quizIdSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public currentQuizId: string | undefined;
  public newQuizId: string = this.generateQuizId;

  private quizBuilderForm: FormGroup = this.getInitQuizForm();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  public get quiz(): FormGroup {
    return this.quizBuilderForm;
  }

  public get currentQuizIdValue(): string | undefined {
    return this.quizIdSubject?.value;
  }

  public getCurrentQuiz(): Observable<string | undefined> {
    return this.quizIdSubject.asObservable();
  }

  public setCurrentQuizId(id: string | undefined): void {
    this.currentQuizId = id;
    this.quizIdSubject.next(id);
  }

  public setNewQuizId(): void {
    this.currentQuizId = this.newQuizId;
    this.quizIdSubject.next(this.newQuizId);
  }

  public addNewQuestion() {
    this.newQuestionId = this.generateQuestionId;
    this.quizQuestionForm = this.getCreateQuestion(this.newQuestionId);
    this.questions.set(this.newQuestionId, this.quizQuestionForm);
  }

  public get assignedQuestionId() {
    return this.newQuestionId;
  }

  public getCurrentQuestion(questionId: string): FormGroup | undefined {
    return this.questions.get(questionId);
  }

  public getQuestions() {
    return this.questions;
  }

  public hasCurrentQuestion(questionId: string): boolean {
    return this.questions.has(questionId);
  }

  public get quizQuestions(): FormArray {
    return this.quizBuilderForm.get('questions') as FormArray;
  }

  public get quizOptions(): FormArray {
    return this.quizBuilderForm.get('questions')?.get('options') as FormArray;
  }

  public getCreateQuestion(questionId: string): FormGroup {
    return this.fb.group({
      id: questionId,
      name: ['', Validators.required],
      options: this.fb.array([
        this.createOptionsTemplate,
        this.createOptionsTemplate
      ], [Validators.required, RadioButtonCheckedValidator(1)])
    })
  }

  public get createOptionsTemplate(): FormGroup {
    return this.fb.group({
      id: this.generateOptionId,
      name: ['', Validators.required],
      is_correct: [false]
    });
  }

  public createAndSaveQuiz(data: Quiz) {
    return this.apiService.post('quiz', data).pipe(
      first(),
      map((quiz: any) => {
        return quiz;
      })
    )
  }

  public updateAndSaveQuiz(quizId: string, data: Quiz) {
    return this.apiService.put(`quiz/${quizId}`, data).pipe(
      first(),
      map((quiz: any) => {
        return quiz;
      })
    )
  }

  public getQuizData(quizId: string | null) {
    if (!!this.currentQuizIdValue) {
      return;
    }

    return this.apiService.get(`quiz/builder/${quizId}`).pipe(
      first(),
      map((quiz: any) => {
        this.setCurrentQuizId(quiz.id);
        return quiz;
      })
    )
  }

  public setQuizData(quiz: Quiz) {
    this.quiz.patchValue(quiz);
    quiz.questions.forEach(question => {
      const createQuestion = this.setQuestionData(question)
      this.quizQuestions.push(createQuestion);
      this.questions.set(question.id, createQuestion);
      question.options.forEach(option => {
        const options = this.getCurrentQuestion(question.id)?.get('options') as FormArray;
        options.push(this.setOptionData(option));
      });
    });
  }

  public destroyQuiz() {
    this.setCurrentQuizId(undefined);
    this.quizBuilderForm.reset();
    this.quizBuilderForm = this.getInitQuizForm();
    this.questions.clear();
  }

  private setQuestionData(question: Question) {
    return this.fb.group({
      id: question.id,
      name: [question.name, Validators.required],
      options: this.fb.array([], [Validators.required, RadioButtonCheckedValidator(1)])
    })
  }

  private setOptionData(option: Option) {
    return this.fb.group({
      id: option.id,
      name: [option.name, Validators.required],
      is_correct: [option.is_correct]
    })
  }

  private getInitQuizForm() {
    const formData = this.fb.group({
      id: [this.newQuizId, Validators.required],
      title: ['', [Validators.required, Validators.min(2), Validators.max(60)]],
      description: ['', [Validators.max(300)]],
      duration: [30, [Validators.required, Validators.min(5), Validators.max(60)]],
      visibility: ['public', Validators.required],
      questions: this.fb.array([])
    });

    return formData;
  }

  private get generateQuizId() {
    return 'qz_' + nanoid(6);
  }

  private get generateQuestionId() {
    return 'q_' + nanoid(6);
  }

  private get generateOptionId() {
    return 'o_' + nanoid(6);
  }

}
