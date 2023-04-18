export type ResponseSO<T> = {
  status: number,
  data: {
    items: T[]
    has_more: boolean
    quota_remaining: number
    quota_max: number
    total: number
  }
}
