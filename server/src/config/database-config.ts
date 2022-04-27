import config from './config';
import { DataSourceOptions } from 'typeorm';
import { UsersEntity } from '../app/users/users.entity';
import { QuizEntity } from '../app/quiz/quiz.entity';
import { QuizQuestionEntity } from '../app/quiz/quiz-question.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  entities: [UsersEntity, QuizEntity, QuizQuestionEntity],
  synchronize: true
}
