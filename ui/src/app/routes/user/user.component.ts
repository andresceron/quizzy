import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletedQuiz, Quiz } from '@interfaces/quiz.interface';
import { PublicUser } from '@interfaces/user.interface';
import { QuizBuilderService } from '@services/quiz-builder.service';
import { QuizService } from '@services/quiz.service';
import { UsersService } from '@services/users.service';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'qz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {
  public currentUserId: string;
  public publicUser$: Observable<PublicUser>;
  public isOwner: boolean;
  public quizzes: Quiz[];
  public quizCount: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private quizService: QuizService,
    private quizBuilderSerivce: QuizBuilderService
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.paramMap.get('id') || '';
    this.quizBuilderSerivce.destroyQuiz();
    this.getUserData();
    this.getQuizData();
  }

  private getUserData(): void {
    this.userService
      .getUserData()
      .pipe(first())
      .subscribe(user => {
        this.isOwner = this.currentUserId === user.id;
      });

    this.publicUser$ = this.userService.getUser(this.currentUserId);
  }

  private getQuizData(): void {
    this.quizService
      .getUserQuizzes(this.currentUserId)
      .pipe(first())
      .subscribe(quizzes => {
        this.quizzes = quizzes;
        this.setQuizCount(this.quizzes);
      });
  }

  public onEditQuiz(e: Event, id: string) {
    e.stopPropagation();
    this.router.navigate([`quiz/builder/${id}`])
  }

  public onDeleteQuiz(e: Event, id: string) {
    e.stopPropagation();

    this.quizService.deleteQuiz(id).pipe(first()).subscribe((data: DeletedQuiz) => {
      if (!!data?.deleted) {
        this.getQuizData();
      }
    })
  }

  public goToQuiz(e: Event, id: string) {
    e.stopPropagation();
    this.router.navigate(['/quiz/', id]);
  }

  public newQuiz() {
    this.router.navigate(['/quiz/builder']);
  }

  private setQuizCount(quizzes: Quiz[]) {
    this.quizCount = quizzes.reduce((acc, val) => acc + val.visited, 0);
  }
}
