import axios from 'axios'
import PQueue from 'p-queue'
import { IClient } from './protocols'

class Client implements IClient {
  private static instance: Client = new Client()

  private queue: PQueue

  private constructor() {
    this.queue = new PQueue({ concurrency: 1, intervalCap: 1000 })
  }

  async get(path: string) {
    return this.queue.add(() => axios.get(path))
  }

  public static getInstance() {
    return Client.instance
  }
}

export default Client.getInstance()
