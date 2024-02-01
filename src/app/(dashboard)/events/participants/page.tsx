import ButtonPainelDeleteHasEvent from '@/components/button-delete-hasEvent'
import LinkPaginationPainel from '@/components/linkPaginationPainel'
import { Events } from '@/data/types/events'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
}
interface PropsSearchParams {
  searchParams: {
    page: number
  }
}

interface FeaturedEventsResponse {
  events: Events[]
  countPage: number
}

async function searchEvents(
  page: number,
  token: unknown,
): Promise<FeaturedEventsResponse> {
  try {
    const response = await fetch(
      `http://localhost/api/hasEvents?page=${page}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    const reqJson = await response.json()

    const events = reqJson.data
    const countPage = reqJson.meta.last_page

    return { events, countPage }
  } catch (error) {
    return { events: [], countPage: 0 }
  }
}

export default async function HasEventUser({
  searchParams,
}: PropsSearchParams) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')
  let { page: query } = searchParams || 1
  if (query === undefined) query = 1
  const { events, countPage } = await searchEvents(query, token?.value)

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="font-sm">Lista dos eventos participando</p>
        <div className="flex flex-row justify-center flex-wrap gap-6">
          {events &&
            events.length > 0 &&
            events.map((eventos, key) => (
              <>
                <Link
                  href={`/events/${eventos.id}`}
                  className="group relative rounded-lg w-[280px] h-[280px] bg-zinc-800 overflow-hidden flex justify-center items-end"
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
                  <div className="absolute top-1 right-5 h-12 flex items-center max-w-[50px] rounded-xl border-2 border-zinc-500 bg-black/60 p-1">
                    <ButtonPainelDeleteHasEvent
                      idHasEvents={eventos.idHasEvents}
                    />
                  </div>
                  <div className="absolute bottom-10 right-5 h-12 flex items-center gap-2 max-w-[240px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
      <div className="flex justify-center mt-4 h-10">
        <LinkPaginationPainel query={query} countPage={countPage} />
      </div>
    </>
  )
}
