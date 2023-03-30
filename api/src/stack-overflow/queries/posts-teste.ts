import { StackExchangeConsumer } from '../index'

export async function QuestionTests() {
  const startExecutionTime = new Date().getTime()

  const api = new StackExchangeConsumer('typescript')
  let startDate = new Date('2023-02-01 00:00').getTime() / 1000
  const endDate = new Date('2023-02-28 23:59').getTime() / 1000

  let questions
  let iterations = 0

  do {
    questions = await api.getQuestions(startDate, endDate)

    // for (const question of questions.items) {
    //   // insert in DB
    // }

    if (questions.items.length-1 >= 0)
      startDate = questions.items[questions.items.length-1].creation_date

    iterations++
  } while (questions.has_more && questions.quota_remaining > 0)

  console.log('iterations', iterations)
  console.log('quota_remaining', questions.quota_remaining)
  
  console.log('execution time em seconds', (new Date().getTime() - startExecutionTime) / 1000)

  return true
}
