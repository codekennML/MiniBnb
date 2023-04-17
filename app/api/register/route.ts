import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "../../libs/prisma"



export async function POST(req:Request){
    const body =  await req.json()

    const { email, password, name  } =  body 

    const hashedPassword =  await bcrypt.hash(password, 10)

    const user =  await prisma?.user.create({
        data : {
            name , email , hashedPassword
        }
    })

    return NextResponse.json(user)

}