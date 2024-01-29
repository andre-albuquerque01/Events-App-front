import ButtonPainel from '@/components/button-painel'
import { Events } from '@/data/types/events'
import Image from 'next/image'
import Link from 'next/link'

async function searchEvents(): Promise<Events[]> {
  // `http://localhost:3000/api/events/search?q=${query}`,
  const response = await fetch(`http://localhost/api/events`)
  const reqJson = await response.json()

  return reqJson.data
}

export default async function Painel() {
  const events = await searchEvents()

  return (
    <div className="flex flex-col gap-4">
      <p className="font-sm">Eventos listados</p>
      <div className="flex flex-row justify-center flex-wrap gap-6">
        {events &&
          events.length > 0 &&
          events.map((eventos, key) => (
            <>
              <Link
                href={`/events/${eventos.id}`}
                className="group relative rounded-lg w-[350px] h-[350px] bg-zinc-800 overflow-hidden flex justify-center items-end"
                key={key}
              >
                <Image
                  src={eventos.pathName}
                  className="group-hover:scale-110 transition-transform duration-500"
                  width={350}
                  height={350}
                  quality={100}
                  alt=""
                />
                <div className="absolute top-1 right-10 h-12 flex items-center max-w-[100px] rounded-full border-2 border-zinc-500 bg-black/60 p-1">
                  <ButtonPainel idEvents={eventos.id} />
                </div>
                <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                  <span className="text-sm truncate">{eventos.title}</span>
                  <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                    {eventos.price?.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </Link>
            </>
          ))}
      </div>
    </div>
  )
}
