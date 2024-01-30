import LinkPagination from '@/components/linkPagination'
import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
}

interface PropsSearchParams {
  searchParams: {
    page: number
  }
}

interface FeaturedEventsResponse {
  data: Events[]
  countPage: number
}

async function getFeaturedEvents(
  page: number,
): Promise<FeaturedEventsResponse> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/events/home/${page}`,
      {
        next: {
          revalidate: 60,
        },
      },
    )
    const reqJson = await response.json()
    const countPage = reqJson.data.meta.last_page
    const data = reqJson.data.data

    return { data, countPage }
  } catch (error) {
    return { data: [], countPage: 0 }
  }
}

export default async function Home({ searchParams }: PropsSearchParams) {
  let { page: query } = searchParams || 1
  if (query === undefined) query = 1
  const { data, countPage } = await getFeaturedEvents(query)

  return (
    <>
      <div className="flex flex-wrap flex-row justify-center gap-6">
        {data &&
          data.length > 0 &&
          data.map((event) => {
            return (
              <Link
                href={`/events/${event.id}`}
                className="group relative rounded-lg bg-zinc-800 flex justify-center "
                key={event.id}
              >
                <Image
                  src={event.pathName}
                  className="group-hover:scale-105 max-w-[280px] min-w-[280px] h-[269px] overflow-hidden rounded-xl transition-transform duration-500"
                  width={280}
                  height={280}
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
      <div className="flex justify-center mt-4 h-10">
        <LinkPagination query={query} countPage={countPage} />
      </div>
    </>
  )
}
