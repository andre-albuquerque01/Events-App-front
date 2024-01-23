import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()

    await fetch('http://localhost/sanctum/csrf-cookie')
    const cookiesStore = cookies()
    const token = cookiesStore.get('XSRF-TOKEN')

    const response = await fetch('http://localhost/api/auth', {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token?.value,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
