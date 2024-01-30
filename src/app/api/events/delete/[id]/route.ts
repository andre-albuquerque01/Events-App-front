import { cookies } from 'next/headers'
import { z } from 'zod'

export async function DELETE(
  _: Request,
  { params }: { params: { id: number } },
) {
  try {
    const id = z.string().parse(params.id)

    await fetch('http://localhost/sanctum/csrf-cookie')
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    await fetch(`http://localhost/api/delete/events/${id}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': xsrf?.value,
        Authorization: `Bearer ${token?.value}`,
      },
    })

    return Response.json({ message: 'Sucess.' }, { status: 200 })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
