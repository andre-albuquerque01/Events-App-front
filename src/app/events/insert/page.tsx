'use client'
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  CircleUserRound,
  File,
  Hash,
  Layers,
  Receipt,
  SquareUserIcon,
  Timer,
} from 'lucide-react'
import Link from 'next/link'
import { FormEvent } from 'react'

async function postEvents(body: object) {
  const response = await fetch('http://localhost:3000/api/events/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (response.ok) {
    alert('Evento inserido com sucesso')
    window.location.replace('/configuration')
  } else
    alert(
      'Houve erro ao cadastrar o evento, se o error persistir, contact um administrador.',
    )
}

export default function InsertEvents() {
  async function handlePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // formData.append('pathName', image)
    const data = Object.fromEntries(formData)

    await postEvents(data)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handlePost}
        className="bg-zinc-700 flex flex-col items-center justify-center w-[420px] min-h-[950px] rounded-xl max-sm:w-[360px] relative mt-20"
      >
        <Link
          href="/configuration"
          className="absolute top-0 left-0 mt-4 ml-4 flex flex-row justify-start items-start"
        >
          <ArrowLeft /> Voltar
        </Link>
        <p className="text-xl mb-5 mt-11">Cadastrado do evento</p>
        <div className="mt-5">
          <label htmlFor="title">Título</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <CircleUserRound className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              name="title"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Título"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="price">Preço</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <CircleDollarSign className="w-5 h-5 text-zinc-500" />
            <input
              type="number"
              step="0.01"
              name="price"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Preço"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="qtdParcelamento">
            Quantidade de parcelas, sem juros
          </label>
          <div className="flex w-[320px] items-center gap-3 rounded-full   bg-zinc-800 px-5 py-3 ring-zinc-700">
            <Receipt className="w-5 h-5 text-zinc-500" />
            <input
              type="number"
              name="qtdParcelamento"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Quantidade de parcelas"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="department">Departamento</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <Layers className="w-5 h-5 text-zinc-500" />
            <input
              type="department"
              name="department"
              id="department"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Departamento"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="occupation">Quantidade de pessoas</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <Hash className="w-5 h-5 text-zinc-500" />
            <input
              type="number"
              name="occupation"
              id="occupation"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Ocupação"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="dateEvent">Data do evento</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <CalendarDays className="w-5 h-5 text-zinc-500" />
            <input
              type="date"
              name="dateEvent"
              id="dateEvent"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Dia do evento"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="timeEvent">Horario de inicio</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <Timer className="w-5 h-5 text-zinc-500" />
            <input
              type="time"
              name="timeEvent"
              id="timeEvent"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="timeStart"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="pathName">Imagem do evento</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <File className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              name="pathName"
              id="pathName"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Image do evento"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="description">Descrição</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <SquareUserIcon className="w-5 h-5 text-zinc-500" />
            <textarea
              name="description"
              id="description"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 max-w-96 max-h-40"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 flex h-12 w-[320px] items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
