import config from './config';

export const databaseConfig = {
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  connectTimeout: 60,
  connectionLimit: 100,
}
