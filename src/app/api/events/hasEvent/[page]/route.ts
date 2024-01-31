import { cookies } from 'next/headers'

export async function GET(
  request: Request,
  { params }: { params: { page: number; token: string } },
) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
    console.log(token?.value)

    const response = await fetch(
      `http://localhost/api/hasEvents?page=${params.page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.value}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    const data = await response.json()
    console.log(data)
    return Response.json({ data })
  } catch (error) {
    console.error(error)
  }
}
