import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
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

  constructor(
  ) { }

  public ngOnInit(): void {
    this.resetSelected.subscribe(() => {
      this.isSelected = null;
    })
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
