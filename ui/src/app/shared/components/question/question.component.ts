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
  selector: 'qz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() questionNumber: number = 0;
  @Input() questionTotal: number = 0;
  @Input() resetSelected = new Subject<boolean>();
  @Input() class: string;
  @Output() questionResponse = new EventEmitter<{id: number, name: string, option: any}>();

  public isSelected: number | null = null;

  constructor(
  ) { }

  public ngOnInit(): void {
  }

  public selectedAnswerOption(event: any) {
    this.questionResponse.emit({id: this.question.id, name: this.question.name, option: event})
  }

}
