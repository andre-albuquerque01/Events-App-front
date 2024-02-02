import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET({ params }: { params: { id: number } }) {
  // console.log(params.id)
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')
  const xsrf = cookiesStore.get('XSRF-TOKEN')

  const response = await fetch(`http://localhost/api/hasEvents/${params.id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrf?.value,
    },
  })

  const data = await response.json()
  console.log(data)

  return NextResponse.json({ data })
}
