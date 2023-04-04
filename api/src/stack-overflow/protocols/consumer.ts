import { ResponseSO } from "./"
import { Prisma } from '@prisma/client'

export interface Consumer {
  getQuestions: (startDate?: number, endDate?: number) => Promise<ResponseSO<Prisma.QuestionCreateInput>>
}
