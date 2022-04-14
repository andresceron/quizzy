import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import { LOCAL, LOG_LEVELS, NODE_ENV } from '../constants/constants';

const envFound = dotenv.config();
if (process.env.ENV === LOCAL && envFound.error) {
  throw new Error('Could not find .env file');
}

const envVarsSchema = Joi.object({
  LOG_LEVEL: Joi.string()
    .valid(LOG_LEVELS.ERROR, LOG_LEVELS.WARNING, LOG_LEVELS.INFO, LOG_LEVELS.HTTP, LOG_LEVELS.VERBOSE, LOG_LEVELS.DEBUG)
    .default(LOG_LEVELS.INFO),
  NODE_ENV: Joi.string().valid(NODE_ENV.DEV, NODE_ENV.TEST, NODE_ENV.PROD).default(NODE_ENV.DEV),
  PORT: Joi.number(),
  MYSQL_HOST: Joi.string().required().description('MySQL DB URI'),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required()
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logs: {
    level: envVars.LOG_LEVEL
  },
  env: envVars.NODE_ENV,
  port: envVars.PORT || 80,
  baseUrl:
    envVars.NODE_ENV === NODE_ENV.PROD
      ? 'https://quizzy.app/'
      : 'http://quizzy.local/' + (envVars.PORT || 80),
  database: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    database: envVars.MYSQL_DATABASE
  }
};

export default config;
