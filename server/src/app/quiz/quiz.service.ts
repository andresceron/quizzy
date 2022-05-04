import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import Logger from '../../config/logger';
import { QuizEntity } from './quiz.entity';
import { Quiz } from './quiz.model';

export interface deletedMessage {
  deleted: boolean,
  message: string
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
      .where('q.visibility = :visibility', { visibility: 'public' })
      .getMany();
  }

  async findUsersPublicQuizzes(userId: string): Promise<Quiz[]> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.owner = :owner', { owner: userId })
      .andWhere('q.visibility = :visibility', { visibility: 'public' })
      .getMany();
  }

  async findUsersAllQuizzes(userId: string): Promise<Quiz[]> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.owner = :owner', { owner: userId })
      .getMany();
  }

  async findQuiz(id: string, userId: string): Promise<Quiz | null> {
    return await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.id = :id', { id: id })
      .andWhere('q.owner = :owner', { owner: userId })
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

  async deleteQuiz(id: string, userId: string): Promise<deletedMessage> {
    try {

      const quiz = await this.quizRepo
        .createQueryBuilder('q')
        .select(['q.id'])
        .where('q.id = :id', { id: id })
        .andWhere('q.owner = :owner', { owner: userId })
        .getOne();

      let quizDeleted;

      if (quiz?.id) {
        quizDeleted = await this.quizRepo.delete({ id: quiz.id });
      }

      if (quizDeleted?.affected === 0 ) {
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
      }

      if (quizDeleted) {
        return new Promise((resolve) => resolve({
          deleted: true,
          message: 'Quiz was deleted'
        }));
      }

      throw false;

    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async updateQuiz(userId: string, id: string, quiz: Quiz): Promise<Quiz> {

    // const quizUpdate = await this.quizRepo
    //   .createQueryBuilder('q')
    //   .leftJoinAndSelect('q.questions', 'qt')
    //   .leftJoinAndSelect('qt.options', 'o')
    //   .update(quiz)
    //   .where('q.id = :id', { id: id })
    //   // .andWhere('q.owner = :owner', { owner: userId })
    //   .execute();
    // return quizUpdate;

    // try {
    //   return await this.quizRepo.update({ id: id }, quiz).catch((e) => {
    //     throw new HttpException('Quiz could not be updated', HttpStatus.BAD_REQUEST);
    //   });
    // } catch (err) {
    //   Logger.error(err);
    //   throw err;
    // }

    try {
      const hasQuiz = await this.quizRepo.preload(quiz);
      if (!!hasQuiz) {
        return await this.quizRepo.save(quiz);
      } else {
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
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

  // TEMPORAL?? DO IT DIFFERNTLY?
  async checkQuizAnswers(quizId: string, answers: any[]): Promise<string[]> {
    const data = await this.quizRepo.createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .where('q.id = :id', { id: quizId })
      .getOne();

    const correctData: any[] = [];
    data?.questions.forEach(q => {
      q.options.forEach(o => {
        if (o.is_correct) {
          correctData.push({
            questionId: q.id,
            optionId: o.id
          });
        }
      })
    })

    const checkCorrect = (qId: string, o: any) => {
      return {
        id: o.id,
        name: o.name,
        is_correct: correctData.some(d => d.questionId === qId && d.optionId === o.id) || false
      }
    }

    const responseData = answers.map(q => {
      return {...q, option: checkCorrect(q.id, q.option) }
    })

    return responseData;
  }

}
