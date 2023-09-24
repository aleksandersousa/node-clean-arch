import { type Controller } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator';
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRespository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logMongoRespository);
};
