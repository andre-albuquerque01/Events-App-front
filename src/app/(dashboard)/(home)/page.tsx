import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedEvents(): Promise<Events[]> {
  const response = await fetch('http://localhost:3000/api/events/home', {
    // cache: 'no-store',
    // next: {
    //   revalidate: 60,
    // },
  })
  const reqJson = await response.json()
  return reqJson.data.data
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const data = await getFeaturedEvents()

  return (
    <div className="flex flex-wrap flex-row justify-center gap-6">
      {data.map((event) => {
        return (
          <Link
            href={`/events/${event.id}`}
            className="group relative rounded-lg bg-zinc-800 flex justify-center "
            key={event.id}
          >
            <Image
              src={event.pathName}
              className="group-hover:scale-105 max-w-[280px] min-w-[280px] h-[269.4px] rounded-xl transition-transform duration-500"
              width={400}
              height={400}
              quality={80}
              alt=""
            />
            <div className="absolute bottom-10 right-5 h-12 flex items-center gap-2 max-w-[230px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
