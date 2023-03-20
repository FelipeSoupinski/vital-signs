import { StackExchangeConsumer } from '../index'

export async function PostTests() {
  const api = new StackExchangeConsumer('phantomjs')
  const questions = await api.getQuestions()
  console.log('Questions:', questions)
  return questions
}
