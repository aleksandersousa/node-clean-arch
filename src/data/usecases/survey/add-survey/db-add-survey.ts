import { type AddSurveyRepository, type AddSurvey, type AddSurveyModel } from '.';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data);
  }
}
