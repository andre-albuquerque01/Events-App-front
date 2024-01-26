'use client'
import { LogOut } from 'lucide-react'

async function postLogout() {
  try {
    const response = await fetch('http://localhost:3000/api/user/logout', {
      method: 'POST',
    })
    if (response.ok) console.log('sucess')
    else console.error('Error')
  } catch (error) {
    console.error('Error')
  }
}

export default function Logout() {
  async function handleLogout() {
    await postLogout()
  }
  return (
    <div>
      <button className="flex items-center gap-2" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
        <span className="text-md">Sair</span>
      </button>
    </div>
  )
}
