import axios from 'axios';

type Question = {
  title: string;
  link: string;
  score: number;
};

type IsAnswered = {
  is_answered: boolean,
  creation_date: number,
  question_id: number
}

type ResponseSO<T> = {
  items: T[],
  has_more: boolean,
  quota_remaining: number,
  quota_max: number
}

export class StackExchangeConsumer {
  constructor(
    private readonly tag: string
  ) {}

  async getQuestions(): Promise<ResponseSO<Question>> {
    try {
      const response = await axios.get(
        `${process.env.SO_API_URL}/search/advanced?order=asc&sort=creation&site=${process.env.SO_SITE}`
        + `&tagged=${this.tag}&run=true&key=${process.env.SO_CLIENT_KEY}`
      )
      return response.data.items
    } catch (error) {
      console.error(error)
      throw new Error('Bad API request getQuestions')
    }
  }

  async getAnswerRate(startDate: number, endDate: number): Promise<ResponseSO<IsAnswered>> {
    try {
      const response = await axios.get(
        `${process.env.SO_API_URL}/search/advanced?`
        + `fromdate=${startDate}&todate=${endDate}`
        + `&order=asc&sort=creation&site=${process.env.SO_SITE}`
        + `&filter=!BH*SB7Qos*5JdJDStdB_qOB5mSF46)`
        + `&tagged=${this.tag}&run=true&key=${process.env.SO_CLIENT_KEY}`
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Bad API request getAnswerRate')
    }
  }
}
