import Link from 'next/link'
import React from 'react'
import { CircleUser, Search, ShoppingBag } from 'lucide-react'

export default function header() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/" className="text-2xl font-extrabold text-white">
            Events Ibe
          </Link>
          <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-800 px-5 py-3 ring-zinc-700">
            <Search className="w-5 h-5 text-zinc-500" />
            <input
              placeholder="Buscar eventos..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm">Cart (0)</span>
          </div>
          <div className="w-px h-4 bg-zinc-500"></div>
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <span className="text-sm">Conta</span>
            <CircleUser className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}
