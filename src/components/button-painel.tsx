'use client'

import { SquarePen, Trash2 } from 'lucide-react'

interface typeProps {
  idEvents: number
}

async function deleteEvents(idEvents: number) {
  await fetch(`http://localhost:3000/api/events/delete/${idEvents}`)
}

export default function ButtonPainel({ idEvents }: typeProps) {
  const handleUpdate = () => {
    window.location.href = `/events/update/${idEvents}`
  }
  const handleDelete = async () => {
    if (confirm('Tem certeza que quer excluir?')) await deleteEvents(idEvents)
  }

  return (
    <div className="flex items-center justify-center gap-4 w-20">
      <button onClick={handleUpdate} title="Editar item">
        <SquarePen />
      </button>
      <button onClick={handleDelete} title="Excluir item">
        <Trash2 />
      </button>
    </div>
  )
}
