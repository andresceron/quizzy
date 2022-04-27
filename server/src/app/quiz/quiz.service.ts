import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import Logger from '../../config/logger';
import { QuizEntity } from './quiz.entity';
import { Quiz } from './quiz.model';

export interface deletedMessage {
  message: string;
}

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>
  ) { }

  async findAllQuizzes(): Promise<Quiz[]> {
    return await this.quizRepo.find();
  }

  async findQuiz(uuid: string): Promise<Quiz|null> {
    return await this.quizRepo.findOne({
      where: {
        uuid: uuid
      }
    });
  }

  async deleteQuiz(uuid: string): Promise<deletedMessage> {
    try {
      const quiz = await this.quizRepo.findOne({where:{ uuid: uuid }});
      const quizDeleted = await this.quizRepo.delete({ uuid: uuid });

      if (quizDeleted.affected === 0 ) {
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
      }

      if (quizDeleted) {
        return new Promise((resolve) => resolve({ message: 'quiz was deleted' }));
      }
      throw false;

    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async updateQuiz(uuid: string, quiz: Quiz) {
    try {
      return await this.quizRepo.update({ uuid: uuid }, quiz).catch((e) => {
        throw new HttpException('Quiz could not be updated', HttpStatus.BAD_REQUEST);
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async newQuiz(quiz: Quiz): Promise<Quiz | null> {
    try {
    const quizExist = await this.quizRepo.findOne({ where: { uuid: quiz.uuid } });
      if (quizExist) {
        throw new HttpException('Quiz already exists', HttpStatus.CONFLICT);
      }
      const quizData = this.quizRepo.create(quiz);
      // quizData.questions = quiz;
      return await this.quizRepo.save(quizData);

    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

}
