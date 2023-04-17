import { NextResponse } from "next/server"
import prisma from "../../libs/prisma"
import getCurrentUser from "@/lib/getCurrentUser"

export async function POST (request : Request){
    const currentUser =  await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()

    const {
        title, 
        description, bathroomCount,
        imageSrc,
        roomCount,
        location,
        guestCount,
        category, 
        price 

    } =  body 

  const hasValues =    Object.keys(body).every(Boolean)

  if(!hasValues){
    return NextResponse.error()
  }

  const listing = await prisma.listing.create({
    data : {
        title, 
        description, bathroomCount,
        imageSrc,
        roomCount,
        locationValue : location.value,
        guestCount,
        category,
        price : parseInt(price, 10),
        userId : currentUser.id

    }
  })

  return NextResponse.json(listing)

}