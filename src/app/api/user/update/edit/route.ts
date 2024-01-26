import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  try {
    const requestBody = await request.json()

    await fetch('http://localhost/sanctum/csrf-cookie')

    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
    const id = cookiesStore.get('id')
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    const response = await fetch(`http://localhost/api/user/${id?.value}`, {
      method: 'PUT',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf?.value,
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    if (data.error !== undefined) {
      return new Response(JSON.stringify({ error: 'Error', status: 400 }), {
        status: 400,
      })
    }

    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
