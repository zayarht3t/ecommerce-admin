import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession()
  if(!session) {
    return (
      <div className='h-screen w-screen bg-blue-900'>
        <div className='mx-auto flex items-center'>
          <button onClick={()=>signIn('google')} className='px-2 py-1 bg-white text-blue-900 rounded outline-none'>Login with Google</button>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen flex' style={{backgroundColor: '#051E34'}}>
      <Navbar/>
      <div className='bg-white flex-grow mt-2 mr-2 rounded-lg mb-2 '>
        <span >{children}</span>
      </div>
      
    </div>
  )
}
