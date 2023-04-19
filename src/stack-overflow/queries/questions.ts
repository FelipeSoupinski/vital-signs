import { PrismaClient, Prisma, Status, MetadataSO } from '@prisma/client'
import { Consumer, ResponseSO, WorkerSO } from '../protocols'

const prisma = new PrismaClient()

export class QuestionsSOWorker implements WorkerSO {
  constructor(
    private readonly tag: string,
    private readonly consumer: Consumer
  ) { }

  async resolve(startDate?: number, endDate?: number) {
    let metadataId

    try {
      const lastUpdatedMetadataByTag = await this.getLastUpdatedMetadataByTag()

      if (lastUpdatedMetadataByTag?.last_question_time) {
        startDate = Number(lastUpdatedMetadataByTag.last_question_time) / 1000 + 1
      }

      const metadata = await this.createMetadata()
      let questions, lastQuestion, response
      let iterations = 0

      metadataId = metadata.id

      do {
        response = await this.consumer.getQuestions(startDate, endDate)
        questions = response.data

        for (const question of questions.items) {
          await prisma.question.create({
            data: {
              ...question,
              creation_date: new Date(Number(question.creation_date) * 1000),
              tag: this.tag
            }
          })
        }

        if (questions.items.length - 1 >= 0) {
          lastQuestion = questions.items[questions.items.length - 1]
          startDate = Number(lastQuestion.creation_date) + 1
        }

        iterations++
        await this.updateMetadata(lastQuestion, metadata, response, Status.RUNNING)
      } while (questions.has_more && questions.quota_remaining > 0)

      await this.updateMetadata(lastQuestion, metadata, response, Status.FINISHED)
      return true
    } catch (error) {
      console.error(error)

      await prisma.metadataSO.update({
        data: { status: Status.ERROR },
        where: {
          id: metadataId
        }
      })
      return false
    }
  }

  async getLastUpdatedMetadataByTag() {
    return await prisma.metadataSO.findFirst({
      where: {
        project_tag: this.tag,
        status: Status.FINISHED,
        last_question_time: {
          not: null
        }
      },
      orderBy: {
        last_question_id: 'desc'
      }
    })
  }

  async createMetadata(startDate?: number, endDate?: number) {
    const startExecutionTime = new Date().getTime()

    return await prisma.metadataSO.create({
      data: {
        project_tag: this.tag,
        mining_start_date: startDate ? new Date(startDate * 1000) : null,
        mining_end_date: endDate ? new Date(endDate * 1000) : null,
        execution_start_time: new Date(startExecutionTime),
        total_questions: 0,
        total_questions_processed: 0,
      }
    })
  }

  async updateMetadata(
    lastQuestion: Prisma.QuestionCreateInput | undefined,
    metadata: MetadataSO,
    responseSO: ResponseSO<Prisma.QuestionCreateInput>,
    status: Status
  ) {
    if (lastQuestion?.creation_date) {
      metadata.last_question_time = new Date(
        Number(lastQuestion.creation_date) * 1000
      )
    }
    metadata.last_question_id = lastQuestion?.question_id ?? null
    metadata.execution_end_time = new Date()
    metadata.status = status
    metadata.total_questions = metadata.total_questions
      ? metadata.total_questions
      : responseSO.data.total
    metadata.total_questions_processed = metadata.total_questions_processed
      ? metadata.total_questions_processed + responseSO.data.items.length
      : responseSO.data.items.length

    await prisma.metadataSO.update({
      data: metadata,
      where: {
        id: metadata.id
      }
    })
  }
}
