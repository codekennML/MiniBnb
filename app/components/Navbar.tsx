"use client" ;

import Container from "@ui/Container";
import Logo from "@ui/Logo";

import Link from "next/link"
import Search from "./Navbar/Search";
import UserMenu from "./Navbar/UserMenu";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";
import Categories from "./Navbar/Categories";

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, } ) => {
  return (
    <nav className='sticky top-0 z-10 py-4 bg-white '>
    
    <div className = " border-slate-600">
 <Container>
 <div 
          className="flex flex-row items-center justify-between gap-3 pb-4 border-b border-gray-200 md:gap-0"
        >
            <Logo />
         <Search />
         <UserMenu currentUser={ currentUser}/>
  
           </div>
 </Container>


    </div>
 <Categories />

       
    
    </nav>
  )
}

export default Navbar