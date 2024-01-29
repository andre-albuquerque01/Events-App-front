import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch('http://localhost/api/events', {
    // cache: 'no-cache',
    next: {
      revalidate: 60,
    },
  })
  const data = await response.json()

  return NextResponse.json({ data })
}
