import { cookies } from 'next/headers'

export async function GET(
  _: Request,
  { params }: { params: { page: number } },
) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await fetch(
      `http://localhost/api/hasEvents?page=${params.page}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
      },
    )
    if (response.headers.get('content-type') === 'application/json') {
      const data = await response.json()
      console.log(data)
    } else {
      console.error('Received non-JSON response:', await response.text())
    }

    if (!response) {
      return Response.json({ message: 'Not found.' }, { status: 400 })
    }

    // return Response.json({ data })
  } catch (error) {
    console.error(error)
  }
}
