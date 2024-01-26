'use client'
import {
  ArrowLeft,
  CircleUserRound,
  FileLock2,
  LockKeyhole,
  SquareUserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

interface User {
  idUser: number
  name: string
  email: string
  cpf: string
}

async function putUser(body: object) {
  const response = await fetch('http://localhost:3000/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (response.ok) alert('Alteração feita com sucesso!')
  else console.error('Erro')
}

export default function UpdateUser() {
  const [data, setData] = useState<User | null>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'http://localhost:3000/api/user/update/get',
        {
          cache: 'no-store',
          method: 'GET',
        },
      )

      const reqJson = await response.json()
      setData(reqJson.data.data)
    }

    fetchData()
  }, [])

  async function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    await putUser(data)
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleForm}
        className="bg-zinc-700 flex flex-col items-center justify-center w-[420px] h-[680px] rounded-xl max-sm:w-[360px] relative"
      >
        <Link
          href="/configuration"
          className="absolute top-0 left-0 mt-4 ml-4 flex flex-row justify-start items-start"
        >
          <ArrowLeft /> Voltar
        </Link>
        <p className="text-xl mb-7 mt-5">Cadastrado do usuário</p>
        <div className="">
          <label htmlFor="nome">Nome</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <SquareUserIcon className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              name="name"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Nome"
              defaultValue={data?.name ?? ''}
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="">E-mail</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <CircleUserRound className="w-5 h-5 text-zinc-500" />
            <input
              type="email"
              name="email"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="E-mail"
              defaultValue={data?.email ?? ''}
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="">CPF</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <FileLock2 className="w-5 h-5 text-zinc-500" />
            <input
              type="number"
              name="cpf"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="CPF"
              defaultValue={data?.cpf ?? ''}
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="password">Senha</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <LockKeyhole className="w-5 h-5 text-zinc-500" />
            <input
              type="password"
              name="password"
              id="password"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Senha"
              required
            />
          </div>
        </div>
        <button className="mt-8 flex h-12 w-[320px] items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
          Salvar
        </button>
      </form>
    </div>
  )
}
