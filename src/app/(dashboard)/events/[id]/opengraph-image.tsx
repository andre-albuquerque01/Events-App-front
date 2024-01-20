import { Events } from '@/data/types/events'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getEvent(id: number): Promise<Events> {
  const response = await fetch(`http://localhost/api/events/${id}`, {
    next: {
      revalidate: 60,
    },
  })
  const reqJson = await response.json()
  return reqJson.data
}

export default async function OgImage({ params }: { params: { id: number } }) {
  const event = await getEvent(params.id)

  const eventImageUrl = new URL(event.pathName, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={eventImageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
  )
}
