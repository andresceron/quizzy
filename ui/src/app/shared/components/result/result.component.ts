import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Question } from '@interfaces/quiz.interface';

@Component({
  selector: 'qz-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent implements OnInit {
  @Input() set resultData(data: Question[]) {
    this.result = data;
    this.calculateScore();
  }
  @Input() class: string;
  public totalCorrect: number = 0;
  public percentage: number = 0;
  public result: any[] = [];

  constructor(
  ) { }

  public ngOnInit(): void {
  }

  private calculateScore() {
    this.totalCorrect = this.result.reduce((count: number, question: any) => {
      return !!question.option.is_correct ? count = count + 1 : count;
    }, 0);

    this.percentage = Math.floor((this.totalCorrect / this.result.length) * 100);
  }

}
