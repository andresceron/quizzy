import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { QuizEntity } from './quiz.entity';

@Entity('question')
export class QuizQuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  quiz_id: string;

  @Column()
  options: string;

  @OneToOne(() => QuizEntity, quiz => quiz.uuid)
  questions: QuizEntity;

  // @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: () => "CURRENT_TIMESTAMP", nullable: true })
  // created_at: Date;

  // @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  // updated_at: Date;

}