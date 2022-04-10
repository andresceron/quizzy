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
  selector: 'qz-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent implements OnInit {
  @Input() resultData: any;
  public totalCorrect: number = 0;
  public percentage: number = 0;

  constructor(
  ) { }

  public ngOnInit(): void {
    console.log(this.resultData);
    this.calculateScore();
  }

  private calculateScore() {
    this.totalCorrect = this.resultData.reduce((count: number, question: any) => {
      return !!question.answer.isCorrect ? count = count + 1 : count;
    }, 0);

    this.percentage = Math.floor((this.totalCorrect / this.resultData.length) * 100);
  }

}
