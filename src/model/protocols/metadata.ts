import { MetadataSO, Prisma, Status } from "@prisma/client"
import { ResponseSO } from "../../stack-overflow/protocols"

export interface IMetadataModel {
  getLastUpdatedMetadataByTag: (tag: string) => Promise<MetadataSO | null>
  createMetadata: (tag: string, startDate?: number, endDate?: number) => Promise<MetadataSO>
  updateMetadata: (
    lastQuestion: Prisma.QuestionCreateInput | undefined,
    metadata: MetadataSO,
    responseSO: ResponseSO<Prisma.QuestionCreateInput>,
    status: Status
  ) => Promise<void>
  saveMetadataOnError: (tag: string, metadataId: number, errorMessage: string) => Promise<void>
}
