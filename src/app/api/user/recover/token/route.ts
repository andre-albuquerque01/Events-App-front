import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()

    await fetch('http://localhost/sanctum/csrf-cookie')

    const cookiesStore = cookies()
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    const response = await fetch(`http://localhost/api/verifyTokenRecover`, {
      method: 'POST',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf?.value,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (data.token === undefined) {
      return new Response(JSON.stringify({ error: 'Error', status: 400 }), {
        status: 400,
      })
    }
    cookiesStore.set('tokenRecover', data.token, {
      expires: Date.now() + 10 * 60 * 1000,
    })
    return Response.json({ data })
  } catch (error) {
    console.error(error)
  }
}
