import { MetadataSO, Prisma, Status } from "@prisma/client";
import { ResponseSO } from "./response-so";

export interface IMetadataControl {
  getLastUpdatedMetadataByTag: () => Promise<MetadataSO | null>
  createMetadata: (startDate?: number, endDate?: number) => Promise<MetadataSO>
  updateMetadata: (
    lastQuestion: Prisma.QuestionCreateInput | undefined,
    metadata: MetadataSO,
    responseSO: ResponseSO<Prisma.QuestionCreateInput>,
    status: Status
  ) => Promise<void>
  saveMetadataOnError: (metadataId: number, errorMessage: string) => Promise<void>
}
