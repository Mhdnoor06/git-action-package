import { gql, useMutation } from "@apollo/client";

// Define the GraphQL mutation
const WIDGET_AUTH_MUTATION = gql`
  mutation widgetAuth($input: WidgetAuthPayload!) {
    widgetAuth(input: $input)
  }
`;

// Custom Hook
export const useWidgetAuth = () => {
  // Use Apollo's useMutation hook
  const [widgetAuthMutation, { data, loading, error }] =
    useMutation(WIDGET_AUTH_MUTATION);

  // Function to trigger the mutation
  const authenticateWidget = async (masjidId: string, assetType: string) => {
    try {
      const response = await widgetAuthMutation({
        variables: {
          input: {
            masjidId,
            assetType,
          },
        },
      });
      return response;
    } catch (err) {
      console.error("Error authenticating widget:", err);
      throw err;
    }
  };

  // Return data, loading state, and error
  return { authenticateWidget, data, loading, error };
};
