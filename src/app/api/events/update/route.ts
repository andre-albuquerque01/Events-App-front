import { cookies } from 'next/headers'

export async function POST(
  request: Request,
  { params }: { params: { id: number } },
) {
  try {
    const requestBody = await request.json()

    await fetch('http://localhost/sanctum/csrf-cookie')

    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    const response = await fetch(`http://localhost/api/events/${params.id}`, {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf?.value,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    console.log(data.error)

    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
