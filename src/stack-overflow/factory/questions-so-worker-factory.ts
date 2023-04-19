import { QuestionsSOWorker } from '../queries/questions'
import { StackExchangeConsumer } from '../stack-exchange-consumer'
import client from '../client'
import { MetadataControl } from '../utils/metadata-control'

export function makeQuestionsSOWorker(tag: string) {
  const consumer = new StackExchangeConsumer(tag, client)
  const metadataControl = new MetadataControl(tag)
  return new QuestionsSOWorker(tag, consumer, metadataControl)
}
