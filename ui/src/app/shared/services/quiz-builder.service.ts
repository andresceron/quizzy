import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioButtonCheckedValidator } from '@shared/validators/require-option.validator';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root'
})

export class QuizBuilderService {
  private questions = new Map<string, FormGroup>();
  private newQuestionId: string;

  private quizBuilderForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.min(2), Validators.max(60)]],
    description: ['', [Validators.max(300)]],
    duration: [30, [Validators.required, Validators.min(5), Validators.max(60)]],
    visibility: ['public', Validators.required],
    questions: this.fb.array([])
  });

  private quizQuestionForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  public get quiz(): FormGroup {
    return this.quizBuilderForm;
  }

  public addNewQuestion() {
    this.newQuestionId = this.generateQuestionId;
    this.quizQuestionForm = this.getCreateQuestion(this.newQuestionId);
    this.questions.set(this.newQuestionId, this.getCreateQuestion(this.newQuestionId));
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
    console.log('hascurrentquestionid:: ', questionId);

    return this.questions.has(questionId);
  }

  public get quizQuestions(): FormArray {
    return this.quizBuilderForm.get('questions') as FormArray;
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
      correct: [false]
    });
  }

  private get generateQuestionId() {
    return 'q_' + nanoid(6);
  }

  private get generateOptionId() {
    return 'o_' + nanoid(6);
  }

  public mainQuizForm(): any {
  }

}
