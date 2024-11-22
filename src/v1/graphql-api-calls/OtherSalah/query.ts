import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

// Queries
export const GET_SPECIAL_TIMES_BY_MASJID_ID = gql`
  query GetSpecialTimesByMasjidId(
    $masjidId: String
    $startDate: String!
    $endDate: String!
  ) {
    getSpecialTimesByMasjidId(
      masjidId: $masjidId
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      masjid
      lastEditor
      name
      startDate
      endDate
      azaanTime
      jamaatTime
      timings {
        startDate
        endDate
        azaanTime
        jamaatTime
      }
      createdAt
      updatedAt
    }
  }
`;

export const useGetSpecialTimesByMasjidId = (
  masjidId: string,
  startDate: string | null,
  endDate: string | null
) => {
  const { loading, error, data, refetch } = useQuery(
    GET_SPECIAL_TIMES_BY_MASJID_ID,
    {
      skip: !startDate || !endDate,
      fetchPolicy: "network-only",
      variables: { masjidId, startDate, endDate },
    }
  );

  return {
    loading,
    error,
    specialTimes: data?.getSpecialTimesByMasjidId || [],
    refetch,
  };
};
