import axios from 'axios';

type Question = {
  title: string;
  link: string;
  score: number;
};

export class StackExchangeConsumer {
  private readonly site: string;
  private readonly apiUrl: string;

  constructor(site: string) {
    this.site = site;
    this.apiUrl = `https://api.stackexchange.com/2.3`;
  }

  async query(sql: string): Promise<Question[]> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/questions?order=desc&sort=votes&site=${this.site}&filter=!-*jbN0CeyJH`
        + `&run=true&key=${process.env.SO_KEY}&sort=votes&q=${encodeURIComponent(sql)}`
      );
      return response.data.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
