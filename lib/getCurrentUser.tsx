import { getServerSession } from "next-auth";
import  { authOptions } from "../pages/api/auth/[...nextauth]"
import prisma from "../app/libs/prisma"



export async function getCurrentSession() {
    
    const session =  await getServerSession(authOptions)

    return session
}

export default async function  getCurrentUser() {

    try{ 

    

    const session =  await getCurrentSession()

    if(!session?.user?.email) {
        return null
    }

    const currentUser = await prisma.user.findUnique({

        where : {
            email : session.user.email as string
        }
    })

        if(!currentUser){
            return null
        }

        return {
            ...currentUser, 
            createdAt : currentUser.createdAt.toISOString(),
            updatedAt : currentUser.updatedAt.toISOString(),
            emailVerified : currentUser?.emailVerified?.toISOString() || null
     
        }

    }
        catch(err) {
        console.log(err)
    }

    }

    