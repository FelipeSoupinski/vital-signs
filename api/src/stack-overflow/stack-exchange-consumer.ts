import client from "./client";
import { Prisma } from "@prisma/client";
import { Consumer, ResponseSO } from "./protocols";

export class StackExchangeConsumer implements Consumer {
  constructor(private readonly tag: string) {}

  async getQuestions(
    startDate?: number,
    endDate?: number
  ): Promise<ResponseSO<Prisma.QuestionCreateInput>> {
    try {
      let queryUrl = `${process.env.SO_API_URL}/search/advanced?`;

      if (startDate) queryUrl += `fromdate=${startDate}`;

      if (startDate && endDate) queryUrl += `&todate=${endDate}`;
      else if (endDate) queryUrl += `todate=${endDate}`;

      queryUrl +=
        `&order=asc&sort=creation&site=${process.env.SO_SITE}&pagesize=100` +
        `&filter=!m()D0hGBUSIeCfI2Xo7TEcCTCLFnDz0kyM33*WmH4pJaCgs7hjd4.9df` +
        `&tagged=${this.tag}&run=true&key=${process.env.SO_CLIENT_KEY}`;

      const response = await client.get(queryUrl);
      return response?.data ?? response;
    } catch (error) {
      console.error(error);
      throw new Error("Bad API request getQuestions");
    }
  }
}
