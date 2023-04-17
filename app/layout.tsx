import './globals.css'
import Navbar from './components/Navbar'
import { Inter } from "next/font/google"
import RegisterModal from './components/modal/RegisterModal'
import LoginModal from './components/modal/LoginModal'
import ToastProvider from "../app/providers/ToastProvider"
import getCurrentUser from '@/lib/getCurrentUser'
import RentModal from './components/modal/RentModal'
import Container from '@ui/Container'
import SearchModal from './components/modal/SearchModal'
export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font =  Inter({ subsets : ["latin"]})


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser =  await getCurrentUser() 
  
  return (
    <html lang="en">
      <body className={`${font.className} dark:bg-slate-800 bg-white font` }>
        <Container>
        <ToastProvider />
       <RegisterModal />
        <SearchModal />
       <LoginModal />
       <RentModal />
      <Navbar currentUser = {currentUser} />
      
      <div className="pb-20 ">
          {children}
        </div>
        </Container>
        </body>
    </html>
  )
}
