import { type LoadSurveysRepository, type LoadSurveys, type SurveyModel } from '.';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll();
    return [];
  }
}
