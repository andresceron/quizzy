import { createPool, Pool } from 'mysql';
import { databaseConfig } from './database-config';
import Logger from './logger';

let pool: Pool;

export const dbInit = () => {
  try {
    pool = createPool(databaseConfig);
    Logger.info(`⚡️[db] Connected to mysql quizzy database ⚡️`);
  } catch (error) {
    Logger.error(`⚡️[db]⚡️ ${error}`);
  }
}

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const dbExecute = <T>(query: string, params: string[] | object): Promise<T> => {
  try {
    if (!pool) {
      Logger.error('Pool was not created. Ensure pool is created when running the app.');
    }

    // promisify(pool.query).bind(pool);

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  } catch (error) {
    Logger.error('failed to execute MySQL query??');
    throw new Error('failed to execute MySQL query');
  }
}