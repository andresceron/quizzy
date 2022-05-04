import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  BaseEntity,
  PrimaryColumn,
  ManyToOne
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { QuizQuestionEntity } from './quiz-question.entity';
import { QuizQuestion } from './quiz.model';

@Entity('quiz')
export class QuizEntity extends BaseEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  visibility: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => QuizQuestionEntity, (quizQuestions) => quizQuestions.quiz_id, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
  questions: QuizQuestion[];

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'owner'})
  owner: string;
}