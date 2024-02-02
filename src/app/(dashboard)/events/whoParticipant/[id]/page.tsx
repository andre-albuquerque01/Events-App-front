import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Participantes',
}

interface EventsProps {
  params: {
    id: number
  }
}

async function searchEvents(id: number): Promise<Events[]> {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
    const response = await fetch(`http://localhost/api/hasEvents/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    })
    const reqJson = await response.json()

    return reqJson.data
  } catch (error) {
    console.error('')
    return []
  }
}

export default async function WhoParticipant({ params }: EventsProps) {
  const eventos = await searchEvents(params.id)

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="font-sm">
          Lista participantes do evento: <span>{eventos[0]?.title}</span>
        </p>
        <div className="flex flex-row justify-around flex-wrap md:w-[50%]">
          <p className="font-lg w-[50%] text-center truncate">
            Nome do participante
          </p>
          <p className="font-lg w-[50%] text-center truncate">Evento</p>
        </div>
        {eventos.length > 0 ? (
          eventos.map((events) => (
            <div
              className="flex flex-row justify-center items-center flex-wrap md:w-[50%]"
              key={events.idHasEvents}
            >
              <p className="font-sm w-[50%] text-center truncate">
                {events.name}
              </p>
              <Link
                href={`/events/${events.idEvents}`}
                className="font-sm w-[50%] text-center truncate"
              >
                {events.title}
              </Link>
              <div className="w-[100%] h-px bg-zinc-500"></div>
            </div>
          ))
        ) : (
          <p className="font-sm">Nenhum participante neste evento</p>
        )}
      </div>
    </>
  )
}
