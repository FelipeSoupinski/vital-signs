import axios from 'axios';

type Question = {
  title: string;
  link: string;
  score: number;
};

export class StackExchangeConsumer {
  constructor(
    private readonly tag: string
  ) {}

  async getQuestions(): Promise<Question[]> {
    try {
      const response = await axios.get(
        `${process.env.SO_API_URL}/search/advanced?order=asc&sort=creation&site=${process.env.SO_SITE}`
        + `&tagged=${this.tag}&run=true&key=${process.env.SO_CLIENT_KEY}`
      )
      return response.data.items
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
