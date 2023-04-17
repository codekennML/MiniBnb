import Image from "next/image"
import {useRouter} from "next/navigation"

const Logo = () => {
    const router =  useRouter() 
  return (
    
    <Image priority =  {true} onClick={ ()  => router.push("/") } src="/images/logo.png" height =  {100} width =  {100} alt =  "airbnb logo" className="hidden md:block cursor-pointer" />
  )
}

export default Logo