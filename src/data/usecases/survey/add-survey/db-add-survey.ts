import { type AddSurveyRepository, type AddSurvey, type AddSurveyParams } from '.';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data);
  }
}
