import { AxiosResponse } from "axios"

export interface IClient {
  get: (path: string) => Promise<AxiosResponse>
}
