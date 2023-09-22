import { type LoadSurveys, type Controller, type HttpRequest, type HttpResponse } from '.';
import { ok } from '../../../helpers/http/http-helper';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load();
    return ok(surveys);
  }
}
