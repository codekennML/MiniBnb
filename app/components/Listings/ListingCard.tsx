"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/types";
import useCountries from "@/app/hooks/useCountries";
import Button from "@ui/Button";
import FavoriteButton from "@ui/FavoriteButton";
import Skeleton from "react-loading-skeleton";
// import { 
//   SafeListing, 
//   SafeReservation, 
//   SafeUser 
// } from "@/app/types";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};


const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getSingleCountry } = useCountries();

  const location = getSingleCountry(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2">
        <div
          className="relative w-full overflow-hidden aspect-square rounded-xl"
        >
        
        {
          data.imageSrc ? 
          <Image
          fill
          className="object-cover w-full h-full transition group-hover:scale-110"
          src={data.imageSrc}
          alt="Listing"
          sizes="(min-width: 640px) 640px, 100vw"
        /> : <Skeleton height = "150px" width = "150px"  /> 
        }

       
          <div className="absolute top-3 right-3">
            <FavoriteButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="text-lg font-semibold text-bright">

        </div>
        {
          data?.title ?  
          <div className="text-sm font-semibold ">
          {data?.title}, {location?.label}
        </div> : 
        <Skeleton  width = "100px" height = "20px"/>
        }
      
{
  reservationDate || data.category ?  <div className="font-light text-[14px] text-neutral-500">
  {reservationDate || data.category}
</div>: 
  <Skeleton width =  "70px" height = "20px"  />
}

      {
        price ? 
        <div className="flex flex-row items-center gap-1">
        <div className="font-semibold ">
          $ {price}
        </div>
        {!reservation && (
          <div className="font-light">night</div>
        )}
      </div>
       : 
       <Skeleton height = "10px" width = "50px" />
      } 
     

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;
