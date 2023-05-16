import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar'
import Layout from '@/components/Layout'
import { data } from 'autoprefixer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession();
  return <Layout>
    <div className='flex justify-between text-blue-900 m-5 items-center'>
      <h2>Hello, <span className=' font-extrabold'>{session?.user?.name}</span></h2>
      <div>
        <img alt='image' src={session?.user?.image ? session?.user?.image : 'https://www.sony.co.uk/presscentre/assets/resized/2021/05/contact-dummy_landscape_964x656.jpg' } className='w-9 h-9 rounded-full' />
      </div>
    </div>
  </Layout>
}
