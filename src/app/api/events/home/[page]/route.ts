import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { page: number } },
) {
  const response = await fetch(
    `http://localhost/api/events?page=${params.page}`,
    {
      next: {
        revalidate: 60,
      },
    },
  )
  const data = await response.json()

  return NextResponse.json({ data })
}
