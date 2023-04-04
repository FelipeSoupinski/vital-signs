import { QuestionsSOWorker } from "../queries/questions"
import { StackExchangeConsumer } from "../stack-exchange-consumer"

export function makeQuestionsSOWorker(tag: string) {
  const consumer = new StackExchangeConsumer(tag)
  return new QuestionsSOWorker(tag, consumer)
}
