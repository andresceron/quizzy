import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { QuizQuestionEntity } from './quiz-question.entity';

@Entity('quiz')
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  visibility: boolean;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: () => "CURRENT_TIMESTAMP", nullable: true })
  created_at: Date;

  // @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  // updated_at: Date;

  @OneToOne(() => QuizQuestionEntity, quizQuestions => quizQuestions.questions, {onDelete: 'CASCADE'})
  @JoinColumn()
  questions: QuizQuestionEntity;

}