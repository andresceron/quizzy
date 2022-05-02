import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAllPublicQuizzes(): Promise<Quiz[]> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.visibility = :visibility', { visibility: true })
      .getMany();
  }

  async findUsersQuizzes(userId: string): Promise<Quiz[]> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.user_id = :user_id', { user_id: userId })
      .getMany();
  }

  async findQuiz(id: string): Promise<Quiz | null> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.id = :id', { id: id})
      .getOne();

    // This works as well
    return await this.quizRepo.findOne({ where: { id: id }, relations: ['questions', 'questions.options']});
  }

  async findQuizWithoutAnswers(id: string): Promise<Quiz | null> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoin('qt.options', 'o')
      .select('q', 'quiz')
      .addSelect('qt', 'questions')
      .addSelect(['o.id', 'o.name'])
      .where('q.id = :id', { id: id })
      .getOne();
  }

  async deleteQuiz(id: string): Promise<deletedMessage> {
    try {
      const quizDeleted = await this.quizRepo.delete({ id: id });

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

  async updateQuiz(id: string, quiz: Quiz) {
    try {
      return await this.quizRepo.update({ id: id }, quiz).catch((e) => {
        throw new HttpException('Quiz could not be updated', HttpStatus.BAD_REQUEST);
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async newQuiz(userId: string, quiz: Quiz): Promise<Quiz | null> {
    try {
    const quizExist = await this.quizRepo.findOne({ where: { id: quiz.id } });
      if (quizExist) {
        throw new HttpException('Quiz already exists', HttpStatus.CONFLICT);
      }

      const quizData = this.quizRepo.create(quiz);
      quizData.owner = userId;
      return await this.quizRepo.save(quizData);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

}
