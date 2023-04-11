import { QuestionsSOWorker } from '../queries/questions'
import { StackExchangeConsumer } from '../stack-exchange-consumer'
import client from '../client'

export function makeQuestionsSOWorker(tag: string) {
  const consumer = new StackExchangeConsumer(tag, client)
  return new QuestionsSOWorker(tag, consumer)
}
