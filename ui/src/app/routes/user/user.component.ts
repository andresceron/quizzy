
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletedQuiz, Quiz } from '@interfaces/quiz.interface';
import { PublicUser } from '@interfaces/user.interface';
import { QuizService } from '@services/quiz.service';
import { UsersService } from '@services/users.service';
import { first } from 'rxjs';

@Component({
  selector: 'qz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {
  public currentUserId: string;
  public user: PublicUser;
  public isOwner: boolean;
  public quizzes: Quiz[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private quizService: QuizService
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.paramMap.get('id') || '';
    this.getUserData();
    this.getQuizData();
  }

  private getUserData(): void {
    this.userService
      .getUserData()
      .pipe(first())
      .subscribe(user => {
        console.log(user);
        this.isOwner = this.currentUserId === user.id;
      });

    this.userService
      .getUser(this.currentUserId)
      .pipe(first())
      .subscribe(publicUser => {
        this.user = publicUser;
      });
  }

  private getQuizData(): void {
    this.quizService
      .getUserPublicQuizzes(this.currentUserId)
      .pipe(first())
      .subscribe(quizzes => {
        this.quizzes = quizzes;
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
}
