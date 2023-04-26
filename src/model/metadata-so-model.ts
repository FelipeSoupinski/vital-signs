import { MetadataSO, Prisma, PrismaClient, Status } from '@prisma/client'
import { ResponseSO } from '../stack-overflow/protocols'
import { IMetadataModel } from './protocols'

const prisma = new PrismaClient()

export class MetadataSOModel implements IMetadataModel {

  async getAll() {
    try {
      return await prisma.metadataSO.findMany()
    } catch (error) {
      console.error(error)
    }
  }

  async getLastUpdatedMetadataByTag(tag: string) {
    try {
      return await prisma.metadataSO.findFirst({
        where: {
          project_tag: tag,
          status: {
            not: Status.RUNNING
          },
          last_question_time: {
            not: null
          }
        },
        orderBy: {
          last_question_id: 'desc'
        }
      })

    } catch (error) {
      console.error(error)
      return null
    }
  }

  async createMetadata(tag: string, startDate?: number, endDate?: number) {
    const startExecutionTime = new Date().getTime()

    return await prisma.metadataSO.create({
      data: {
        project_tag: tag,
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

  async saveMetadataOnError(tag: string, metadataId: number, errorMessage: string) {
    const lastQuestion = await prisma.question.findFirst({
      where: {
        tag: tag
      },
      orderBy: {
        question_id: 'desc'
      }
    })

    await prisma.metadataSO.update({
      data: {
        status: Status.ERROR,
        info_message: errorMessage,
        last_question_id: lastQuestion?.question_id,
        last_question_time: lastQuestion?.creation_date
      },
      where: {
        id: metadataId
      }
    })
  }

}
