import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn } from 'typeorm';
import { QuizQuestionEntity } from './quiz-question.entity';

@Entity('options')
export class QuizOptionEntity extends BaseEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  name: string;

  @Column()
  is_correct: false;

  @ManyToOne(() => QuizQuestionEntity, (quizQuestion) => quizQuestion.options, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id'})
  question_id: string;
}