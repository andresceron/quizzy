import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { QuizService } from '@services/quiz.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'qz-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnswersComponent implements OnInit {
  @Input() set options(data: any[]) {
    this.randomizeOptions(data)
  }

  @Input() questionNumber: number = 0;
  @Input() resetSelected = new Subject<boolean>();
  @Output() selectedAnswer = new EventEmitter<any>();

  public randomizedOptions: any = [];
  public isSelected: number | null = null;
  public isDisabled: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private quizService: QuizService
  ) { }

  public ngOnInit(): void {
    this.resetSelected.subscribe(() => {
      this.isSelected = null;
    })

    this.quizService.getAnswersDisabledStatus().subscribe((status) => {
      this.isDisabled = status;
      this.cdr.markForCheck();
    });
  }

  private randomizeOptions(options: any[]) {
    this.randomizedOptions =
      options.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
  }

  public selected(option: any, index: number) {
    this.isSelected = index;
    this.selectedAnswer.emit(option);
  }

}
