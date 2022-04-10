import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { QuizBuilderService } from '@services/quiz-builder.service';

@Component({
  selector: 'qz-quiz-builder-question',
  templateUrl: './quiz-builder-question.component.html',
  styleUrls: ['./quiz-builder-question.component.scss']
})

export class QuizBuilderQuestionComponent implements OnInit, OnDestroy {
  public step: string = 'init';
  public quizBuilderTitle: string = 'Quiz Builder';
  public duration: number = 0;
  public formSubmitted: boolean = false;
  public showMessage: boolean = false;
  public messageStatus: string;
  private quizQuestionForm: FormGroup;
  private currentQuestionId: string;
  private questionId: string;

  constructor(
    private fb: FormBuilder,
    private quizBuilderService: QuizBuilderService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  public onQuestionSave() {
    this.formSubmitted = true;
    if (!this.questionForm.valid) {
      return;
    }

    const questionIndex: number = this.quizBuilderService.quizQuestions.value.findIndex((v: any) => v.id === this.currentQuestionId);
    if (questionIndex !== -1) {
      this.quizBuilderService.quizQuestions.at(questionIndex).patchValue(this.questionForm);
    } else {
      this.quizBuilderService.quizQuestions.push(this.questionForm);
    }

    this.goToQuizBuilderMain();
  }

  public addOption(): void {
    if (this.formOptionsArray.length > 5) {
      this.messageStatus = 'You have reached the limit of options values that is 6';
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 1000);

      return;
    }
    this.formOptionsArray?.push(this.addOptionsTemplate);
  }

  public optionChange(option: AbstractControl): void {
    this.formOptionsArray?.controls?.forEach(control => {
      if (control.get('id')?.value === option.get('id')?.value) {
        control.get('correct')?.setValue(true);
      } else {
        control.get('correct')?.setValue(false);
      }
      control.updateValueAndValidity();
    });
  }

  public removeOption(index: number): void {
    this.formOptionsArray?.removeAt(index);
  }

  public onBack() {
    // TODO: Add check unsaved changes before leaving.
    this.goToQuizBuilderMain();
  }

  public showNotification(): void {
    this.notificationService.success('message', 3000);
  }

  public ngOnDestroy() {
  }

  public get form(): { [key: string]: AbstractControl } {
    return this.quizQuestionForm.controls;
  }

  public get questionForm(): FormGroup {
    return this.quizQuestionForm;
  }

  public get formOptionsArray(): FormArray {
    return this.quizQuestionForm?.get('options') as FormArray;
  }

  private get addOptionsTemplate(): FormGroup {
    return this.quizBuilderService.createOptionsTemplate;
  }

  private initSubscriptions() {
    this.currentQuestionId = this.route.snapshot.paramMap.get('questionId') || '';
    if (!this.quizBuilderService.hasCurrentQuestion(this.currentQuestionId)) {
      this.goToQuizBuilderMain();
      return;
    }

    this.initData();
  }

  private initData() {
    this.quizQuestionForm = this.quizBuilderService.getCurrentQuestion(this.currentQuestionId) || new FormGroup({}); // Another way to do this?
  }

  private goToQuizBuilderMain() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
