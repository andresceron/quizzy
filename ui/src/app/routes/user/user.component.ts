
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '@interfaces/quiz.interface';
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
    this.userService.getUserData().pipe(first()).subscribe(user => {
      this.isOwner = this.currentUserId === user.id;
    })

    this.userService
      .getPublicUser(this.currentUserId)
      .pipe(first())
      .subscribe(publicUser => {
        this.user = publicUser;
    })

    this.quizService
      .getUserPublicQuizzes(this.currentUserId)
      .pipe(first())
      .subscribe(quizzes => {
        this.quizzes = quizzes;
    });

  }

  public openMenu(e: Event) {
    console.log('openMenu');
    e.stopPropagation();
  }

  public newQuiz() {
    this.router.navigate(['/quiz/builder']);
  }

  public goToQuiz(e: Event) {
    console.log('goToQuiz');
  }

}
