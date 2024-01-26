import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  try {
    const requestBody = await request.json()

    await fetch('http://localhost/sanctum/csrf-cookie')

    const cookiesStore = cookies()
    const xsrf = cookiesStore.get('XSRF-TOKEN')
    const tokenRecover = cookiesStore.get('tokenRecover')

    const response = await fetch(
      `http://localhost/api/updatePassword/${tokenRecover?.value}`,
      {
        method: 'PUT',
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrf?.value,
        },
        body: JSON.stringify(requestBody),
      },
    )
    cookiesStore.delete('tokenRecover')
    const data = await response.json()
    console.log(data)

    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
