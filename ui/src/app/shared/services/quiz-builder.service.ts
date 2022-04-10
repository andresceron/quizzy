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

  public mainQuizForm(): any {
  }

}
