import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizEntity } from './quiz.entity';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity])
  ],
  controllers: [
    QuizController
  ],
  providers: [
    QuizService
  ]
})
export class QuizModule {}