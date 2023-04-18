import getCurrentUser from "@/lib/getCurrentUser";
import { getCurrentListing } from "@/lib/getSingleListing";
import Container from "@ui/Container";
import EmptyForm from "@ui/EmptyForm";
import ListingView from "./ListingView";
import getReservations from "@/lib/getReservations";

export const dynamic = "force-dynamic";
interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  const reservations = await getReservations(params);

  const listing = await getCurrentListing(params);

  if (!listing)
    return (
      <EmptyForm
        title="No Listings Found"
        subtitle="No matching listing found for your search"
        showReset={false}
      />
    );

  return (
    <Container>
      <ListingView
        currentUser={currentUser}
        listing={listing}
        reservations={reservations}
      />
    </Container>
  );
};

export default ListingPage;
