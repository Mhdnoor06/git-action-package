import { gql } from "@apollo/client";

export const SEND_SUPPORT_REQUEST = gql`
  mutation CreateService($input: ServiceInput!) {
    createService(input: $input) {
      serviceName
      description
      emailAddress
      contactNumber
      image
      registrationRequired
      serviceType
      details {
        cost
        availabilityTiming
        timingOptions
      }
      attributes {
        attributeName
        attributeValues
      }
    }
  }
`;
