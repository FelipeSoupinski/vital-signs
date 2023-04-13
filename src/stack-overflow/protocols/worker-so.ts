export interface WorkerSO {
  resolve: (startDate?: number, endDate?: number) => Promise<boolean>
}
