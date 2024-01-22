import Link from 'next/link'
import React from 'react'
import { CircleUser } from 'lucide-react'
import CartWidget from './cart-widget'
import SearchForm from './search-form'

export default function header() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/" className="text-2xl font-extrabold text-white">
            Events Ibe
          </Link>
          <SearchForm />
        </div>

        <div className="flex items-center gap-4">
          <CartWidget />
          <div className="w-px h-4 bg-zinc-500"></div>
          <Link
            href="/configuration"
            className="flex items-center gap-2 hover:underline"
          >
            <span className="text-sm">Conta</span>
            <CircleUser className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}
