"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/types";
import Heading from "../modal/Heading";
import FavoriteButton from "@ui/FavoriteButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHeader: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getSingleCountry } = useCountries();

  const location = getSingleCountry(locationValue);

  return (
    <article className="pt-12 pb-4">
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          relative
          h-[60vh]
          w-full 
          overflow-hidden
          rounded-xl
          mt-4
        "
      >
        <Image
          src={imageSrc}
          fill
          className="rounded-xl w-full object-cover"
          sizes="(min-width: 640px) 640px, 100vw"
          alt="Image"
        />
        <div className="absolute right-5 top-5">
          <FavoriteButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </article>
  );
};

export default ListingHeader;
