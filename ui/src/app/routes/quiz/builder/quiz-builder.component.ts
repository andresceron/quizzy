import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '@interfaces/quiz.interface';
import { User } from '@interfaces/user.interface';
import { NotificationService } from '@services/notification.service';
import { QuizBuilderService } from '@services/quiz-builder.service';
import { UsersService } from '@services/users.service';
import { first } from 'rxjs';

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
  private user: User;
  private quizId: string | null;
  private editMode: boolean;
  private currentQuizId: string | undefined;

  constructor(
    private quizBuilderService: QuizBuilderService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.editMode = this.quizId?.startsWith('qz_') || false;
    this.currentQuizId = this.quizBuilderService.currentQuizId;

    // TODO:: check if ID exits, if not, return... or redirect to new quiz?

    if (this.quizId === 'new' && this.currentQuizId !== this.quizBuilderService.newQuizId) {
      this.quizBuilderService.destroyQuiz();
    }

    if (this.quizId === 'new') {
      this.quizBuilderService.setCurrentQuizId(this.quizBuilderService.newQuizId);
    }

    this.initForm();
    this.getUser();

    if (this.quizId !== 'new' && this.editMode) {
      this.setFormData();
    }

    this.updateStep('inProgress');
  }

  public showSuccessMessage(message: string) {
    this.notificationService.success(message, 3000);
  }

  public showWarningMessage(message: string) {
    this.notificationService.warning(message, 3000);
  }

  public startBuilding() {
    this.loadQuiz();
  }

  public onExit() {
    // TODO:: before:unload?
    this.quizBuilderService.destroyQuiz();
    this.showWarningMessage('You have exited the quiz builder without saving');
    this.router.navigate([`user/${this.user.id}`]);
  }

  public onEditQuestion(questionId: string) {
    this.router.navigate([`q/${questionId}`], {relativeTo: this.route});
  }

  public onRemoveQuestion(questionIndex: number) {
    this.quizQuestions.removeAt(questionIndex);
  }

  public onBack() {
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

    if (!!this.quizId && this.editMode) {
      this.quizBuilderService.updateAndSaveQuiz(this.quizId, this.quizBuilderForm.value).pipe(first()).subscribe((quiz: Quiz) => {
        if (!!quiz.id) {
          this.showSuccessMessage('Quiz was updated');
          this.quizBuilderService.destroyQuiz();
          this.router.navigate([`/user/${this.user.id}`])
        }
      })
    } else {
      this.quizBuilderService.createAndSaveQuiz(this.quizBuilderForm.value).pipe(first()).subscribe((quiz: Quiz) => {
        if (!!quiz.id) {
          this.showSuccessMessage('Quiz was created');
          this.quizBuilderService.destroyQuiz();
          this.router.navigate([`/user/${this.user.id}`])
        }
      })
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

  private getUser() {
    this.usersService
      .getUserData()
      .pipe(first())
      .subscribe(user => {
        this.user = user;
      });
  }

  private initForm() {
    this.quizBuilderForm = this.quizBuilderService.quiz;
  }

  private setFormData() {
    if (!!this.quizBuilderService.currentQuizIdValue) {
      return;
    }

    this.quizBuilderService.getQuizData(this.quizId)?.pipe(first()).subscribe(quiz => {
      if (!!quiz?.id) {
        this.currentQuizId = quiz.id;
        this.quizBuilderService.setQuizData(quiz);
      }
    });
  }

  private loadQuiz() {
    this.updateStep('inProgress');
  }

}
