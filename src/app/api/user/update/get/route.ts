import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')
  const id = cookiesStore.get('id')
  const xsrf = cookiesStore.get('XSRF-TOKEN')

  const response = await fetch(`http://localhost/api/user/${id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrf?.value,
    },
    Authorization: `Bearer ${token}`,
  })
  console.log(response)

  const data = await response.json()

  return NextResponse.json({ data })
}
