import { type Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRespository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logMongoRespository);
};
