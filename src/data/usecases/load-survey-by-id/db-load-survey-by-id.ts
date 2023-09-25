import { type LoadSurveyById } from '@/domain/usecases';
import { type LoadSurveyByIdRepository, type SurveyModel } from '.';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById(id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
