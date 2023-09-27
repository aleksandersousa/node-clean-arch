import {
  type LoadSurveyResult,
  type SurveyResultModel,
  type LoadSurveyResultRepository,
  type LoadSurveyByIdRepository,
} from '.';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel | null> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);

      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(a => ({ ...a, count: 0, percent: 0 })),
      };
    }

    return surveyResult;
  }
}
