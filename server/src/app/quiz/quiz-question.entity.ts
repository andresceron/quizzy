import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { QuizOptionEntity } from './quiz-option.entity';
import { QuizEntity } from './quiz.entity';
import { QuizOption } from './quiz.model';

@Entity('question')
export class QuizQuestionEntity extends BaseEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'quiz_id'})
  quiz_id: string;

  @OneToMany(() => QuizOptionEntity, (quizOptions) => quizOptions.question_id, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
  options: QuizOption[];
}