import { Router, type Express } from 'express';
import fg from 'fast-glob';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  fg.sync('src/main/routes/**routes.ts').map(async (file): Promise<void> => {
    (await import(`../../../${file}`)).default(router);
  });
};