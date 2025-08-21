import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export async function cacheGet(key: string) {
  try {
    return await redis.get(key)
  } catch (error) {
    console.error('Redis Get Error:', error)
    return null
  }
}

export async function cacheSet(key: string, value: any, ttl: number = 3600) {
  try {
    return await redis.setex(key, ttl, JSON.stringify(value))
  } catch (error) {
    console.error('Redis Set Error:', error)
    return null
  }
}

