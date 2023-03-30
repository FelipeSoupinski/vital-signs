import axios from 'axios';

type Question = {
  title: string;
  link: string;
  score: number;
  is_answered: boolean,
  creation_date: number,
  question_id: number
};

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

  async getQuestions(startDate: number, endDate: number): Promise<ResponseSO<Question>> {
    try {
      const response = await axios.get(
        `${process.env.SO_API_URL}/search/advanced?`
        + `fromdate=${startDate}&todate=${endDate}`
        + `&order=asc&sort=creation&site=${process.env.SO_SITE}&pagesize=100`
        + `&filter=!m()D0hHD1-.cAdT.pjsAjkZHRYozZjv55JmeIEMlPkEH2B_F8nNAsq0A`
        + `&tagged=${this.tag}&run=true&key=${process.env.SO_CLIENT_KEY}`
      )
      return response.data.items
    } catch (error) {
      console.error(error)
      throw new Error('Bad API request getQuestions')
    }
  }
}
