import AddToCartButton from '@/components/add-to-cart-button'
import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import Image from 'next/image'

interface EventsProps {
  params: {
    id: number
  }
}

async function getEvent(id: number): Promise<Events> {
  const response = await fetch(`http://localhost/api/events/${id}`, {
    next: {
      revalidate: 60,
    },
  })
  const reqJson = await response.json()
  return reqJson.data
}

export async function generateMetadata({
  params,
}: EventsProps): Promise<Metadata> {
  const event = await getEvent(params.id)
  return {
    title: event.title,
  }
}

export default async function EventList({ params }: EventsProps) {
  const data = await getEvent(params.id)

  return (
    <div className="relative grid max-h-[856px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src=""
          alt="Image do evento"
          width={1000}
          height={1000}
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
            {data.dateEvent} às {data.timeEvent} horas
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

        <AddToCartButton eventId={data.idEvents} />
      </div>
    </div>
  )
}
