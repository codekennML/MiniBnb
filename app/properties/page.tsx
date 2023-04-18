import PropertiesClient from "./PropertiesClient";
import EmptyForm from "@ui/EmptyForm";
import Client from "@ui/Client";
import getCurrentUser from "@/lib/getCurrentUser";
import getAllListings from "@/lib/getAllListings";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyForm
        title="Unauthorized"
        subtitle="Please login"
        showReset={false}
      />
    );
  }

  const listings = await getAllListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <Client>
        <div className="pt-24">
          <EmptyForm
            title="No properties found"
            subtitle="Looks like you have no properties."
            showReset={false}
          />
        </div>
      </Client>
    );
  }

  return (
    <Client>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </Client>
  );
};

export default PropertiesPage;
