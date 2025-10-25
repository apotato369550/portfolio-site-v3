import { NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now()
  const record = rateLimitStore[identifier]

  if (!record || now > record.resetTime) {
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429 }
  )
}
