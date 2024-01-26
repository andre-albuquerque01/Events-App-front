'use client'
import { ArrowLeft, CircleUserRound, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

async function updatePassword(body: object) {
  const response = await fetch(
    `http://localhost:3000/api/user/recover/updatePassword`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
  if (response.ok) {
    alert('Sua senha foi alterada com sucesso!')
    window.location.replace('/login')
  }
}

export default function UpdatePassword() {
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

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    if (data.password === data.password_confirmation) {
      setError(validatePassword(data.password))
      await updatePassword(data)
      return ''
    }
    setError('Senha não combinam')
    return ''
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-zinc-700 flex flex-col items-center justify-center w-[400px] h-[480px] rounded-xl max-sm:w-[360px] relative">
        <form onSubmit={handleSearch}>
          <Link
            href="/user/recover/verifyToken"
            className="absolute top-0 left-0 mt-4 ml-4 flex flex-row justify-start items-start"
          >
            <ArrowLeft /> Voltar
          </Link>
          <p className="text-xl mb-7 mt-5">Alterar a senha</p>
          <div className="">
            <label htmlFor="password">Nova senha</label>
            <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
              <CircleUserRound className="w-5 h-5 text-zinc-500" />
              <input
                type="password"
                name="password"
                id="password"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                placeholder="Nova senha"
                required
              />
            </div>
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
          <div className="mt-5">
            <label htmlFor="password_confirmation">Confirmação da senha</label>
            <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
              <LockKeyhole className="w-5 h-5 text-zinc-500" />
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                placeholder="Repetir senha"
                required
              />
            </div>
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
          <button className="mt-8 flex h-12 w-[320px] items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
