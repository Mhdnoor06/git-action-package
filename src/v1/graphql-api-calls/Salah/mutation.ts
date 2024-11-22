// mutations.ts
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

// Define the GraphQL mutations
const CREATE_OR_UPDATE_TIMINGS = gql`
  mutation CreateOrUpdateTimings(
    $masjidId: String!
    $timings: [MasjidTimingInput!]!
  ) {
    createOrUpdateTimings(masjidId: $masjidId, timings: $timings) {
      _id
      masjidId
      date
      prayerType
      prayerMethod
      timings {
        _id
        namazName
        type
        azaanTime
        jamaatTime
        offset {
          iqamah
          azaan
        }
      }
    }
  }
`;

const DELETE_TIMINGS = gql`
  mutation DeleteTimings(
    $masjidId: String!
    $startDate: String!
    $endDate: String!
  ) {
    deleteTimings(masjidId: $masjidId, startDate: $startDate, endDate: $endDate)
  }
`;

// Create custom hooks for the mutations
export const useCreateOrUpdateTimings = () => {
  const [createOrUpdateTimings, { loading, error }] = useMutation(
    CREATE_OR_UPDATE_TIMINGS
  );

  const createOrUpdate = async (masjidId: string, timings: any) => {
    try {
      const { data } = await createOrUpdateTimings({
        variables: { masjidId, timings },
      });
      return data.createOrUpdateTimings;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { createOrUpdate, loading, error };
};

export const useDeleteTimings = () => {
  const [deleteTimings, { loading, error }] = useMutation(DELETE_TIMINGS);

  const removeTimings = async (
    masjidId: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      const { data } = await deleteTimings({
        variables: { masjidId, startDate, endDate },
      });
      return data.deleteTimings;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { removeTimings, loading, error };
};
