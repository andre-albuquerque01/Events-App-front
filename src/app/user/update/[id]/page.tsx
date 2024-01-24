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

interface UserProps {
  params: {
    id: number
  }
}

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
  if (response.ok) console.log('sucess')
  else console.error('Erro')
}

export default function UpdateUser({ params }: UserProps) {
  const [data, setData] = useState<User[]>([])
  const [error, setError] = useState('')

  const hasNumber = /\d/
  const hasUpperCase = /[A-Z]/
  const hasLowerCase = /[a-z]/
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_=+]/

  function validatePassword(password: any) {
    if (!hasNumber.test(password))
      return 'Senha precisa ter pelo menos um número.'
    if (!hasUpperCase.test(password))
      return 'Senha precisa ter pelo menos uma letra maiúscula.'
    if (!hasLowerCase.test(password))
      return 'Senha precisa ter pelo menos uma letra minúscula.'
    if (!hasSymbol.test(password))
      return 'Senha precisa ter pelo menos um símbolo.'
    return ''
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/user/update/${params.id}`,
        {
          cache: 'no-store',
        },
      )
      const reqJson = await response.json()
      setData(reqJson.data.data)
    }

    fetchData()
  }, [params.id])

  async function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    if (data.password === data.password_confirmation) {
      setError(validatePassword(data.password))
      await putUser(data)
      return ''
    }
    setError('Senhas não correspondem')
    return ''
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
              value={data.name}
              required
            />
          </div>
        </div>
        <input type="hidden" name="id" className="hidden" value={data.idUser} />
        <div className="mt-5">
          <label htmlFor="">E-mail</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <CircleUserRound className="w-5 h-5 text-zinc-500" />
            <input
              type="email"
              name="email"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="E-mail"
              value={data.email}
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
              min="11"
              max="11"
              value={data.cpf}
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
          {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>
        <div className="mt-5">
          <label htmlFor="password_confirmation">Repetir senha</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <LockKeyhole className="w-5 h-5 text-zinc-500" />
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Confimação da senha"
              required
            />
          </div>
          {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>
        <button
          type="button"
          className="mt-8 flex h-12 w-[320px] items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
