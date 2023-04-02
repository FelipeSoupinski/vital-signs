import { StackExchangeConsumer } from '../index'
import { PrismaClient, Status } from '@prisma/client'

const prisma = new PrismaClient()

export async function GetQuestionsSO(
  tag: string,
  startDate?: number,
  endDate?: number,
) {
  try {
    const api = new StackExchangeConsumer(tag)
    const startExecutionTime = new Date().getTime()

    const lastUpdatedMetadataByTag = await prisma.metadataSO.findFirst({
      where: {
        project_tag: tag,
        status: Status.FINISHED,
        last_question_time: {
          not: null
        }
      },
      orderBy: {
        last_question_id: 'desc'
      },
    })

    if (lastUpdatedMetadataByTag?.last_question_time) {
      console.log("lastUpdatedMetadataByTag.last_question_time", lastUpdatedMetadataByTag.last_question_time)
      startDate = (Number(lastUpdatedMetadataByTag.last_question_time) / 1000) + 1
      console.log("startDate", startDate)
    }

    const metadata = await prisma.metadataSO.create({
      data: {
        project_tag: tag,
        mining_start_date: startDate ? new Date(startDate * 1000) : null,
        mining_end_date: endDate ? new Date(endDate * 1000) : null,
        execution_start_time: new Date(startExecutionTime),
      }
    })

    let questions, lastQuestion
    let iterations = 0

    do {
      questions = await api.getQuestions(startDate, endDate)

      for (const question of questions.items) {
        await prisma.question.create({ 
          data: {
            ...question,
            creation_date: new Date(Number(question.creation_date) * 1000),
            tag
          }
        })
      }

      if (questions.items.length-1 >= 0) {
        lastQuestion = questions.items[questions.items.length-1]
        startDate = Number(lastQuestion.creation_date) + 1
      }

      iterations++
    } while (questions.has_more && questions.quota_remaining > 0)

    if (lastQuestion?.creation_date) {
      metadata.last_question_time = new Date(Number(lastQuestion.creation_date) * 1000) 
    }
    metadata.last_question_id = lastQuestion?.question_id ?? null
    metadata.execution_end_time = new Date()
    metadata.status = Status.FINISHED

    await prisma.metadataSO.update({
      data: metadata,
      where: {
        id: metadata.id
      }
    })

    await prisma.$disconnect()

    console.log('iterations', iterations)
    console.log('quota_remaining', questions.quota_remaining)
    console.log('execution time em seconds', (new Date().getTime() - startExecutionTime) / 1000)

    return true

  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    return false
  }
}
