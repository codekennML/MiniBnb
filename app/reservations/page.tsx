import getReservations from "@/lib/getReservations";
import EmptyForm from "@ui/EmptyForm";
import Client from "@ui/Client";
import getCurrentUser from "@/lib/getCurrentUser";
import TripsClient from "../trips/TripsClient";

export const dynamic = "force-dynamic";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Client>
        <EmptyForm
          title="Unauthorized"
          subtitle="Please login"
          showReset={false}
        />
      </Client>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Client>
        <div className="pt-24">
          <EmptyForm
            title="No reservations found"
            subtitle="Looks like you have no reservations on your properties."
            showReset={false}
          />
        </div>
      </Client>
    );
  }

  return (
    <Client>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </Client>
  );
};

export default ReservationsPage;
