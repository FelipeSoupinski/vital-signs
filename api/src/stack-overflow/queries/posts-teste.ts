import { StackExchangeConsumer } from '../index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function QuestionTests() {
  try {
    const startExecutionTime = new Date().getTime()
    const tag = 'typescript'

    const api = new StackExchangeConsumer(tag)
    let startDate = new Date('2023-02-01 00:00').getTime() / 1000
    const endDate = new Date('2023-02-28 23:59').getTime() / 1000

    let questions
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

      if (questions.items.length-1 >= 0)
        startDate = Number(questions.items[questions.items.length-1].creation_date) + 1

      iterations++
    } while (questions.has_more && questions.quota_remaining > 0)

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
