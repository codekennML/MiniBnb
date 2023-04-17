

import {BiSearch} from "react-icons/bi"
import useSearchModal from "@/app/hooks/useSearchModal"
import { useSearchParams } from "next/navigation";
import { useMemo } from "react"
import useCountries from "@/app/hooks/useCountries";
import { differenceInDays } from "date-fns";


const Search = () => {


  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getSingleCountry } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getSingleCountry(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getSingleCountry]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);


  return (
    <div
    onClick={searchModal.onOpen}
    className="
      border-[1px] 
      w-full 
      md:w-auto 
      py-2 
      rounded-full 
      shadow-sm 
      hover:shadow-md 
      transition 
      cursor-pointer
    "
  >
    <div 
      className="flex flex-row items-center justify-between "
    >
      <div 
        className="px-6 text-sm font-semibold "
      >
        {/* {locationLabel}
         */}
        {locationLabel}
      </div>
      <div 
        className="
          hidden 
          sm:block 
          text-sm 
          font-semibold 
          px-6 
          border-x-[1px] 
          flex-1 
          text-center
     
        "
      >
        {/* {durationLabel}
         */}
    {durationLabel}
      </div>
      <div 
        className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm "
      >
        <div className="hidden text-sm font-semibold sm:block ">
            
            {guestLabel} 

            {/* Add Guests */}
            
            </div>
        <div 
          className="p-2 text-white rounded-full bg-brand"
        >
          <BiSearch size={18} />
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Search