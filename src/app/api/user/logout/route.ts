import { cookies } from 'next/headers'

export async function POST() {
  try {
    await fetch('http://localhost/sanctum/csrf-cookie')

    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    const response = await fetch(`http://localhost/api/logout`, {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf?.value,
        Authorization: `Bearer ${token?.value}`,
      },
    })

    const data = await response.json()
    if (data.error !== undefined) {
      return new Response(JSON.stringify({ error: 'Error', status: 400 }), {
        status: 400,
      })
    }

    cookiesStore.delete('id')
    cookiesStore.delete('token')
    cookiesStore.delete('r')

    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
