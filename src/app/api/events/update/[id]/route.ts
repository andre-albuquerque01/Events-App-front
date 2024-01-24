import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(_: Request, { params }: { params: { id: number } }) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const id = z.string().parse(params.id)

  const response = await fetch(`http://localhost/api/events/${id}`, {
    cache: 'no-store',
  })
  const data = await response.json()

  if (!response) {
    return Response.json({ message: 'Event not found.' }, { status: 400 })
  }

  return NextResponse.json({ data })
}
