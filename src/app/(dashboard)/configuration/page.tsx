import { FolderInput, LogOut, SquarePen } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default function Configuration() {
  const cookiesList = cookies()
  const hasCookie = cookiesList.get('r')
  return (
    <div className="flex flex-col gap-5 mt-5">
      <Link href="/user/update" className="flex items-center gap-2">
        <SquarePen className="h-5 w-5" />
        <span className="text-md">Editar o perfil</span>
      </Link>
      {hasCookie?.value === 'a' && (
        <Link href="/events/insert" className="flex items-center gap-2">
          <FolderInput className="h-5 w-5" />
          <span className="text-md">Cadastro evento</span>
        </Link>
      )}
      <Link href="" className="flex items-center gap-2">
        <LogOut className="h-5 w-5" />
        <span className="text-md">Sair</span>
      </Link>
    </div>
  )
}
