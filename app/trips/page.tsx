


import getReservations from "@/lib/getReservations";
import getCurrentUser from "@/lib/getCurrentUser"
import EmptyForm  from "@ui/EmptyForm";
import TripsClient from "./TripsClient";


const TripsPage = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (

        <EmptyForm
          title="Unauthorized"
          subtitle="Please login"
          showReset = {true}
        />
    
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
<div className =  "flex h-full w-full  pt-24 ">
        <EmptyForm
          title="No trips found"
          subtitle="You havent reserved any trips."
          showReset = {false}
        />
</div>
    );
  }

  return (

      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
 
  );
}
 
export default TripsPage;
