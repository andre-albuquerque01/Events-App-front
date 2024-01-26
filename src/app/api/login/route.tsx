import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()

    await fetch('http://localhost/sanctum/csrf-cookie')
    const cookiesStore = cookies()
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    const response = await fetch('http://localhost/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf?.value,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    cookiesStore.set('token', data.data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
    })
    cookiesStore.set('id', data.data.idUser, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
    })
    if (data.data.r === 'JesusIsKingADM') {
      cookiesStore.set('r', data.data.r, {
        expires: Date.now() + 2 * 60 * 60 * 1000,
        secure: true,
      })
    }
    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
