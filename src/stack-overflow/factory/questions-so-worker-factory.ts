import { StackExchangeConsumer } from '../stack-exchange-consumer'
import { MetadataSOModel } from '../../model/metadata-so-model'
import { QuestionsSOWorker } from '../queries/questions'
import client from '../client'

export function makeQuestionsSOWorker(tag: string) {
  const consumer = new StackExchangeConsumer(tag, client)
  const metadataModel = new MetadataSOModel()
  return new QuestionsSOWorker(tag, consumer, metadataModel)
}
