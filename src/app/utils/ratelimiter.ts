import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
  timeout: 10000,
})

export const inactivelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '60 s'),
  analytics: true,
  timeout: 10000,
})
