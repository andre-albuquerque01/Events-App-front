import { Events } from '@/data/types/events'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedEvents(): Promise<Events[]> {
  const response = await fetch('http://localhost/api/events', {
    method: 'GET',
  })
  const reqJson = await response.json()
  console.log(reqJson)

  return reqJson
}

export default async function Home() {
  const {
    data: [highlightedEvents, ...otherEvents],
  } = await getFeaturedEvents()

  return (
    <div className="grid max-h-[856px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href="/"
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-800 overflow-hidden flex justify-center"
      >
        <Image
          src="/moletomGreen.png"
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedEvents.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedEvents.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherEvents.map((event) => {
        return (
          <Link
            href="/"
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-800 overflow-hidden flex justify-center"
            key={event.id}
          >
            <Image
              src="/moletomGreen.png"
              className="group-hover:scale-105 transition-transform duration-500"
              width={920}
              height={920}
              quality={100}
              alt=""
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{event.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {event.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}

      {/* <Link
        href="/"
        className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-800 overflow-hidden flex justify-center"
      >
        <Image
          src="/moletomGreen.png"
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">Moletom verde</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            R$ 128
          </span>
        </div>
      </Link> */}
    </div>
  )
}
