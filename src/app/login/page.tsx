import { ArrowLeft, CircleUserRound, LockKeyhole } from 'lucide-react'
import Link from 'next/link'

export default function LogIn() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-zinc-700 flex flex-col items-center justify-center w-[400px] h-[480px] rounded-xl max-sm:w-[360px] relative">
        <form>
          <Link
            href="/"
            className="absolute top-0 left-0 mt-4 ml-4 flex flex-row justify-start items-start"
          >
            <ArrowLeft /> Voltar
          </Link>
          <p className="text-xl mb-7 mt-5">Log In</p>
          <div className="">
            <label htmlFor="">E-mail</label>
            <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
              <CircleUserRound className="w-5 h-5 text-zinc-500" />
              <input
                type="email"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                required
              />
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="password">Senha</label>
            <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
              <LockKeyhole className="w-5 h-5 text-zinc-500" />
              <input
                type="email"
                id="password"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                required
              />
            </div>
          </div>
          <Link href="/user/recover" className="text-sm">
            Esqueceu senha?
          </Link>
          <button
            type="button"
            className="mt-8 flex h-12 w-[320px] items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
          >
            Entrar
          </button>
        </form>
        <div className="h-0.5 w-72 bg-zinc-600 mt-10"></div>
        <Link href="/user/insert">Não tem conta?</Link>
      </div>
    </div>
  )
}
