'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { SafeUser } from "@/types";
import Avatar from "../Navbar/Avatar";

import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";

const Map = dynamic(() => import('../Maps/Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {

    const  {getSingleCountry} =  useCountries()

  const coordinates = getSingleCountry(locationValue)?.latlng

  return ( 
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="flex flex-row items-center gap-2 text-xl font-semibold "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500"
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <div className="h-[40vh] rounded-lg">

                <Map center={coordinates} />
</div>
 
    </div>
   );
}
 
export default ListingInfo;