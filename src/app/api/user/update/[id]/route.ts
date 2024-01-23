import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET({ params }: { params: { id: number } }) {
  const id = z.string().parse(params.id)

  const cookiesStore = cookies()
  const token = cookiesStore.get('token')
  const xsrf = cookiesStore.get('XSRF-TOKEN')

  const response = await fetch(`http://localhost/api/user/${id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrf?.value,
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()

  return NextResponse.json({ data })
}
