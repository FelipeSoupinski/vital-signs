import { PrismaClient, Status, Prisma } from '@prisma/client'
import { IMetadataModel } from '../../model/protocols'
import { Consumer, WorkerSO } from '../protocols'

const prisma = new PrismaClient()

export class QuestionsSOWorker implements WorkerSO {
  constructor(
    private readonly tag: string,
    private readonly consumer: Consumer,
    private readonly metadata: IMetadataModel,
  ) { }

  async resolve(startDate?: number, endDate?: number) {
    let metadataId

    try {
      const lastUpdatedMetadataByTag = await this.metadata.getLastUpdatedMetadataByTag(this.tag)

      if (lastUpdatedMetadataByTag?.last_question_time) {
        startDate = (Number(lastUpdatedMetadataByTag.last_question_time) / 1000) + 1
      }

      const metadata = await this.metadata.createMetadata(this.tag)
      let questions, lastQuestion, response
      let iterations = 0

      metadataId = metadata.id

      do {
        response = await this.consumer.getQuestions(startDate, endDate)
        questions = response.data

        for (const question of questions.items) {
          const data = {
            ...question,
            creation_date: new Date(Number(question.creation_date) * 1000),
            tag: this.tag
          }

          await prisma.question.upsert({
            where: {
              question_id: question.question_id
            },
            update: data,
            create: data
          })
        }

        if (questions.items.length - 1 >= 0) {
          lastQuestion = questions.items[questions.items.length - 1]
          startDate = Number(lastQuestion.creation_date) + 1
        }

        iterations++
        await this.metadata.updateMetadata(lastQuestion, metadata, response, Status.RUNNING)
      } while (questions.has_more && questions.quota_remaining > 0)

      await this.metadata.updateMetadata(lastQuestion, metadata, response, Status.FINISHED)
      return true

    } catch (error) {
      console.error(error)
      let errorMessage = String(error)
      if (metadataId) {
        await this.metadata.saveMetadataOnError(this.tag, metadataId, errorMessage)
      }
      return false
    }
  }
}
