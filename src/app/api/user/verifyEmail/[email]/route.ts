import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function GET(
  _: Request,
  { params }: { params: { email: string } },
) {
  const email = z.string().parse(params.email)

  const response = await fetch(`http://localhost/api/verifyEmail/${email}`, {
    method: 'GET',
  })

  if (response.ok) return redirect('/login')
  else return redirect('/')
}
