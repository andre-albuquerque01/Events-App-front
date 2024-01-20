import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  const { searchParams } = request.nextUrl

  const title = z.string().parse(searchParams.get('q'))

  // `http://localhost/api/eventsTitle/${title.toLocaleLowerCase()}`,
  const response = await fetch(`http://localhost/api/eventsTitle/${title}`, {
    next: {
      revalidate: 60,
    },
  })
  const data = await response.json()

  if (!response) {
    return Response.json({ message: 'Event not found.' }, { status: 400 })
  }

  return NextResponse.json({ data })
}
