'use client'

import api from '@/data/api'

export interface AddToCartButtonProps {
  eventId: number
}

async function postHasEvent(body: object) {
  await api('/hasEvent/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export default function AddToCartButton({ eventId }: AddToCartButtonProps) {
  const handleInsert = async () => {
    if (confirm('Tem certeza que quer participar do evento?'))
      await postHasEvent({ idEvents: eventId })
  }
  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={handleInsert}
    >
      Participar do evento
    </button>
  )
}
