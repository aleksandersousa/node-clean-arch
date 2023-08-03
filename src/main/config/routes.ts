/* eslint-disable n/no-path-concat */
import { Router, type Express } from 'express';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  readdirSync(`${__dirname}/../routes`).map(async (file): Promise<void> => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
};
