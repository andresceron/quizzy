import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'qz-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})

export class JoinComponent implements OnInit {

  public joinFormGroup: FormGroup = this.fb.group({
    quizId: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void { }

  public onSubmit() {
    console.log(this.joinFormGroup.value.quizId)
    if (this.joinFormGroup.value.quizId === 'quiz123') {
      this.goToPage(this.joinFormGroup.value.quizId);
    } else {
      console.log('no correct id');
    }
  }

  private goToPage(id: string): void {
    this.router.navigate([`/quiz/${id}`]);
  }

}
