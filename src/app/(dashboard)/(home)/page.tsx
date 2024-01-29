import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedEvents(): Promise<Events[]> {
  const response = await fetch('http://localhost:3000/api/events/home', {
    // cache: 'no-store',
    next: {
      revalidate: 60,
    },
  })
  const reqJson = await response.json()
  return reqJson.data.data
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highlightedEvents, ...otherEvents] = await getFeaturedEvents()

  return (
    <div className="grid max-h-[856px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/events/${highlightedEvents?.id}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-800 overflow-hidden flex justify-center"
      >
        <Image
          src="/moletomGreen.png"
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={80}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedEvents?.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedEvents?.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </Link>
      {otherEvents.map((event) => {
        return (
          <Link
            href={`/events/${event.id}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-800 overflow-hidden flex justify-center "
            key={event.id}
          >
            <Image
              src="/moletomGreen.png"
              className="group-hover:scale-105 transition-transform duration-500"
              width={920}
              height={920}
              quality={80}
              alt=""
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{event.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {event.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
