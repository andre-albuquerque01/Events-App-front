import AddToCartButton from '@/components/add-to-cart-button'
import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface EventsProps {
  params: {
    id: number
  }
}

export async function generateMetadata({
  params,
}: EventsProps): Promise<Metadata> {
  const event = await getEvent(params.id)
  return {
    title: event.title,
  }
}

async function getEvent(id: number): Promise<Events> {
  try {
    const response = await fetch(`http://localhost/api/events/${id}`, {
      cache: 'no-cache',
    })
    const reqJson = await response.json()
    return reqJson.data
  } catch (error) {
    redirect('/')
  }
}

export default async function EventList({ params }: EventsProps) {
  const data = await getEvent(params.id)

  const updateDate = (updateAt: string) => {
    const dateUpdate = new Date(Date.parse(updateAt))
    const formattedDate = dateUpdate
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('/')
    return formattedDate
  }

  const cookiesList = cookies()
  const hasCookie = cookiesList.has('token')

  return (
    <div className="relative grid max-h-[806px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={data?.pathName}
          alt="Image do evento"
          width={810}
          height={810}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{data.title}</h1>
        <p className="mt-2 leading-relaxed text-justify text-zinc-400 ">
          {data.description}
        </p>
        <div className="mt-2">
          <span className="text-md text-zinc-400">Quantidade de vagas: </span>
          <span className="text-sm text-zinc-400">{data.occupation}</span>
        </div>
        <div className="mt-2">
          <span className="text-md text-zinc-400">Data do evento: </span>
          <span className="text-sm text-zinc-400">
            {updateDate(data.dateEvent)} às {data.timeEvent} horas
          </span>
        </div>
        <div className="mt-2">
          <span className="text-md text-zinc-400">Departamento: </span>
          <span className="text-sm text-zinc-400">{data.department}</span>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block justify-center rounded-full bg-violet-500 px-5 py-2.5">
            {data.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em {data.qtdParcelamento}x s/ juros de R${' '}
            {(data.price / data.qtdParcelamento).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        {hasCookie ? (
          <AddToCartButton eventId={data.id} />
        ) : (
          <Link
            href="/login"
            className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 bg-opacity-50 font-semibold text-white"
            title="Necessário fazer login"
          >
            Participar do evento
          </Link>
        )}
      </div>
    </div>
  )
}
