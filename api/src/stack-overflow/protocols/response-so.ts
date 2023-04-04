export type ResponseSO<T> = {
  items: T[],
  has_more: boolean,
  quota_remaining: number,
  quota_max: number
}
