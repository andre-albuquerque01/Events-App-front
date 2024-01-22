import {
  ArrowLeft,
  CircleUserRound,
  FileLock2,
  LockKeyhole,
  SquareUserIcon,
} from 'lucide-react'
import Link from 'next/link'

export default function InsertUser() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-zinc-700 flex flex-col items-center justify-center w-[420px] h-[680px] rounded-xl max-sm:w-[360px] relative">
        <Link
          href="/"
          className="absolute top-0 left-0 mt-4 ml-4 flex flex-row justify-start items-start"
        >
          <ArrowLeft /> Voltar
        </Link>
        <p className="text-xl mb-5 mt-11">Cadastrado do usuário</p>
        <div className="">
          <label htmlFor="nome">Nome</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <SquareUserIcon className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Nome"
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
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="E-mail"
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
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="CPF"
              min="11"
              max="11"
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
              id="password"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Senha"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="password">Repetir senha</label>
          <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <LockKeyhole className="w-5 h-5 text-zinc-500" />
            <input
              type="password"
              name="password_confirmation"
              id="password"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Confimação da senha"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="mr-36">
            <input
              type="checkbox"
              id="term"
              placeholder="Confimação da senha"
              required
            />
            <label htmlFor="term" className="ml-2">
              <Link href="/">Termo de aceitação</Link>
            </label>
          </div>
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
