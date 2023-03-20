import { StackExchangeConsumer } from '../index'

export async function QuestionTests() {
  const api = new StackExchangeConsumer('phantomjs')
  const questions = await api.getQuestions()
  console.log('Questions:', questions)
  return questions
}

export async function AnswerRateTest() {
  const startExecutionTime = new Date().getTime()

  const api = new StackExchangeConsumer('typescript')
  let startDate = new Date('2023-02-01 00:00').getTime() / 1000
  const endDate = new Date('2023-02-28 23:59').getTime() / 1000

  const answerRate = {
    answered: 0,
    unanswered: 0,  
  }

  let questions
  let iterations = 0

  do {
    questions = await api.getAnswerRate(startDate, endDate)

    for (const question of questions.items) {
      if (question.is_answered) {
        answerRate.answered++
      } else {
        answerRate.unanswered++
      }
    }

    if (questions.items.length-1 >= 0)
      startDate = questions.items[questions.items.length-1].creation_date

    iterations++
  } while (questions.has_more && questions.quota_remaining > 0)

  const answerRateTotal = answerRate.answered / ((answerRate.answered + answerRate.unanswered) || 1)

  console.log('iterations', iterations)
  console.log('answerRateTotal', answerRateTotal)
  console.log('quota_remaining', questions.quota_remaining)
  
  console.log('execution time em seconds', (startExecutionTime - new Date().getTime()) / 1000)

  return answerRateTotal
}
