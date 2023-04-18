import getCurrentUser from "@/lib/getCurrentUser";
import FavoriteClient from "./FavouriteClient";
import Client from "@ui/Client";
import EmptyForm from "@ui/EmptyForm";
import getFavoriteListings from "@/lib/getFavouriteListings";

export const dynamic = "force-dynamic";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <Client>
        <div className="h-full w-full pt-24">
          <EmptyForm
            title="No favorites found"
            subtitle="Looks like you have no favorite listings."
            showReset={false}
          />
        </div>
      </Client>
    );
  }

  return (
    <Client>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </Client>
  );
};

export default ListingPage;
