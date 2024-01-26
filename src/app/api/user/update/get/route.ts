import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')
  const id = cookiesStore.get('id')
  const xsrf = cookiesStore.get('XSRF-TOKEN')

  const response = await fetch(`http://localhost/api/user/${id?.value}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrf?.value,
    },
  })

  const data = await response.json()

  return NextResponse.json({ data })
}
