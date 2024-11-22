import { gql, useQuery } from "@apollo/client";

// const GET_EVENT = gql`
//   query GetEvent($id: String!) {
//     event(id: $id) {
//       _id
//       eventName
//       masjid
//       masjidDetails {
//         location {
//           type
//           coordinates
//         }
//       }
//       description
//       eventProfilePhoto
//       date
//       timings {
//         startTime
//         endTime
//       }
//       location {
//         type
//         coordinates
//       }
//       metaData {
//         startDate
//         endDate
//         recurrenceId
//         recurrenceType
//         recurrenceInterval
//       }
//       address
//       capacity
//       availableSeats
//       category
//       cost
//       isCancelled
//       guests {
//         _id
//         guestName
//         guestDescription
//         guestProfilePhoto
//         arivalTime
//         departureTime
//         createdAt
//         updatedAt
//       }
//       eventPhotos {
//         _id
//         url
//       }
//       isRegistrationRequired
//       stripeProductId
//       updatedAt
//       createdAt
//     }
//   }
// `;

const GET_EVENT = gql`
  query GetEvent($id: String!) {
    event(id: $id) {
      _id
      eventName
      description
      eventProfilePhoto
      date
      timings {
        startTime
        endTime
      }
      location {
        type
        coordinates
      }
      metaData {
        startDate
        endDate
        recurrenceType
      }
      address
      capacity
      availableSeats
      category
      cost
      isCancelled
      guests {
        _id
        guestName
        guestDescription
        guestProfilePhoto
        arivalTime
        departureTime
      }
      eventPhotos {
        _id
        url
      }
      isRegistrationRequired
      stripeProductId
      updatedAt
      createdAt
    }
  }
`;

export const useGetEvent = (id: string) => {
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id },
    fetchPolicy: "network-only",
  });
  return { event: data, loading, error };
};

//Get Masjid Details
export const GET_TICKETS = gql`
  query Tickets($parentId: String!) {
    tickets(parentId: $parentId) {
      _id
      parentId
      name
      email
      phone
      seats
      status
      paymentId
      bookingId
      createdAt
      updatedAt
      checkInSeats
    }
  }
`;
