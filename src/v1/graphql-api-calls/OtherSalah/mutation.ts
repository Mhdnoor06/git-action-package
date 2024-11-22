import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

// Mutations
export const CREATE_SPECIAL_TIMES = gql`
  mutation CreateSpecialTimes($input: SpecialTimesInput!) {
    createSpecialTimes(input: $input) {
      _id
      masjid
      name
      timings {
        startDate
        endDate
        azaanTime
        jamaatTime
      }
    }
  }
`;

export const useCreateSpecialTimes = () => {
  const [createSpecialTimes, { loading, error, data }] =
    useMutation(CREATE_SPECIAL_TIMES);

  const createTimes = async (input: any) => {
    try {
      const response = await createSpecialTimes({
        variables: { input },
      });
      return response.data?.createSpecialTimes;
    } catch (err) {
      console.error(err);
    }
  };

  return { createTimes, isLoading: loading, error, data };
};

export const UPDATE_SPECIAL_TIMES = gql`
  mutation UpdateSpecialTimes($_id: String!, $input: SpecialTimesInput!) {
    updateSpecialTimes(_id: $_id, input: $input) {
      _id
      masjid
      name
      timings {
        startDate
        endDate
        azaanTime
        jamaatTime
      }
    }
  }
`;

export const useUpdateSpecialTimes = () => {
  const [updateSpecialTimes, { loading, error, data }] =
    useMutation(UPDATE_SPECIAL_TIMES);

  const updateTimes = async (_id: string, input: any) => {
    try {
      const response = await updateSpecialTimes({
        variables: { _id, input },
      });
      return response.data?.updateSpecialTimes;
    } catch (err) {
      console.error(err);
    }
  };

  return { updateTimes, loading, error, data };
};

export const DELETE_SPECIAL_TIMES = gql`
  mutation DeleteSpecialTimes($_id: String!) {
    deleteSpecialTimes(_id: $_id)
  }
`;

export const useDeleteSpecialTimes = () => {
  const [deleteSpecialTimes, { loading, error }] =
    useMutation(DELETE_SPECIAL_TIMES);

  const deleteTimes = async (_id: string) => {
    try {
      const response = await deleteSpecialTimes({
        variables: { _id },
      });
      return response.data?.deleteSpecialTimes;
    } catch (err) {
      console.error(err);
    }
  };

  return { deleteTimes, isDeleting: loading, error };
};
