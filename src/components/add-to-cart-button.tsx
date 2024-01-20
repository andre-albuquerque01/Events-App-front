'use client'

import { useCart } from '@/contexts/cart-context'

export interface AddToCartButtonProps {
  eventId: number
}

export default function AddToCartButton({ eventId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddEventToCart() {
    addToCart(eventId)
  }

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={handleAddEventToCart}
    >
      Fazer reserva
    </button>
  )
}
