import { StackExchangeConsumer } from '../index'
import { PrismaClient, Status } from '@prisma/client'

const prisma = new PrismaClient()

export async function GetQuestionsSO() {
  try {
    const startExecutionTime = new Date().getTime()
    const tag = 'typescript'

    const api = new StackExchangeConsumer(tag)
    let startDate = new Date('2023-02-01 00:00').getTime() / 1000
    const endDate = new Date('2023-02-28 23:59').getTime() / 1000


    const metadata = await prisma.metadataSO.create({
      data: {
        project_tag: tag,
        mining_start_date: new Date(startDate),
        mining_end_date: new Date(endDate),
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
            creation_date: new Date(question.creation_date),
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

    metadata.last_question_id = lastQuestion?.question_id ?? null
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
