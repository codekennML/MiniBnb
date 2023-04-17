
import { IListingParams, getAllListings } from "@/lib/getAllListings"
import getCurrentUser from "@/lib/getCurrentUser"
import ListingCard from "./components/Listings/ListingCard"
import Container from "@ui/Container"
import { SafeListing } from "@/types"
import Client from "@ui/Client"
import EmptyForm from "@ui/EmptyForm"


interface HomeProps {
  searchParams :IListingParams
}

const  Home = async({ searchParams } : HomeProps) =>  {


  const currentUser =  await getCurrentUser()
  const listings  =    await getAllListings(searchParams)

  if (listings.length === 0) {
    return (
      <Client>
        <div className =  "w-full h-full flex items-center justify-center">

        </div>
        <EmptyForm title = "No matches found" subtitle = "Try broadening your search " showReset />
      </Client>
    );
  }


  return (

    <main className ="mx-auto ">
 
  

<div 
          className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
        >
          
          {listings.map((listing: SafeListing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
    </main>
 
  )
}

export default Home