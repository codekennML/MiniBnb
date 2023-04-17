import prisma from "../app/libs/prisma"
import getCurrentUser from "./getCurrentUser"

interface IParams {
    listingId? : string 
}

export const getCurrentListing = async (params : IParams ) => {

    try {

    const { listingId } =  params;

    // if(!listingId){
    //     return null
    // }


    const listing =  await prisma.listing.findUnique({
        where : {
            id : listingId
        },
        include : {
            user : true
        }
    })

    if(!listing) return null

    return  {
        ...listing , 
        createdAt : listing.createdAt.toString(),
        user : {
            ...listing.user,
            updatedAt : listing.user.updatedAt.toString(),
            createdAt : listing.user.createdAt.toString(),
            emailVerified : listing.user.emailVerified?.toString() || null
        }
    }
  

}    catch(error : any ){
    throw new Error(error)
}

}