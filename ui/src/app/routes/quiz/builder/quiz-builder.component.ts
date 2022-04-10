import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { QuizBuilderService } from '@services/quiz-builder.service';

@Component({
  selector: 'qz-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.scss']
})

export class QuizBuilderComponent implements OnInit, OnDestroy {
  public step: string = 'init';
  public quizBuilderTitle: string = 'Quiz Builder';
  public duration: number = 0;
  public formSubmitted: boolean = false;
  public showMessage: boolean = false;
  public messageStatus: string;
  public quizBuilderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizBuilderService: QuizBuilderService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.updateStep('inProgress');
  }

  private initForm() {
    this.quizBuilderForm = this.quizBuilderService.quiz;
    console.log(this.quizBuilderForm);

  }

  public showNotification() {
    this.notificationService.success('message', 3000);
  }

  public startBuilding() {
    this.loadQuiz();
  }

  public onExit() {
    console.log('exit quiz but warn before?');
  }

  public onEditQuestion(questionId: string) {
    console.log(this.quizBuilderService.getQuestions())

    this.router.navigate([`q/${questionId}`], {relativeTo: this.route});
  }

  public onRemoveQuestion(questionIndex: number) {
    this.quizQuestions.removeAt(questionIndex);
  }

  public onBack() {
    console.log('go back?');
    this.updateStep('inProgress');
  }

  public loadQuiz() {
    this.updateStep('inProgress');
  }

  public updateStep(value: string) {
    this.step = value;
  }

  public addNewQuestion() {
    this.quizBuilderService.addNewQuestion();
    this.router.navigate([`q/${this.quizBuilderService.assignedQuestionId}`], {relativeTo: this.route});
  }

  public get quizQuestions(): FormArray {
    return this.quizBuilderForm.get('questions') as FormArray;
  }

  public onSubmit() {
    this.formSubmitted = true;
    if (this.quizBuilderForm.invalid) {
      return;
    }
  }

  public get form(): { [key: string]: AbstractControl } {
    return this.quizBuilderForm.controls;
  }

  public get formOptionsArray(): FormArray {
    return this.quizQuestions.controls[this.quizQuestions.length - 1].get('options') as FormArray;
  }

  public ngOnDestroy() {
  }
}
