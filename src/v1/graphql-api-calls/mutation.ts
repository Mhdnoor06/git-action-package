import { gql } from "@apollo/client";

export const CREATE_SERVICE = gql`
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

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: String!) {
    deleteService(id: $id)
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: String!, $input: ServiceInput!) {
    updateService(id: $id, input: $input) {
      id
      serviceName
      active
      description
      emailAddress
      image
      contactNumber
      registrationRequired
      serviceType
      details {
        cost
        availabilityTiming
        startTime
        endTime
        consultationAvailability
        timePerSession
      }
      attributes {
        attributeName
        attributeValues
      }
    }
  }
`;
export const CREATE_PROGRAM = gql`
  mutation AddProgram($input: ProgramInput!) {
    AddProgram(input: $input) {
      programName
      description
      masjidId
      isPaid
      cost
      capacity
      metaData {
        startDate
        endDate
        recurrenceType
        recurrenceInterval
      }
      programPhotos
      isRegistrationRequired
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation DeleteProgram($id: String!) {
    DeleteProgram(id: $id) {
      description
    }
  }
`;
export const ADD_RSVP = gql`
  mutation createRsvp($id: String!, $type: String!, $response: String!) {
    rsvp(id: $id, type: $type, response: $response)
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation UpdateProgram($id: String!, $input: ProgramInput!) {
    UpdateProgram(id: $id, input: $input) {
      _id
      isPaid
      description
      ageRange {
        minimumAge
        maximumAge
      }
    }
  }
`;

export const CREATE_BOARD_MEMBER = gql`
  mutation AddBoardMember($masjidId: String!, $input: BoardMemberInput!) {
    addBoardMember(masjidId: $masjidId, input: $input) {
      name
      position
      email
      image
    }
  }
`;

export const DELETE_BOARD_MEMBER = gql`
  mutation DeleteBoardMember($masjidId: String!, $id: String!) {
    deleteBoardMember(masjidId: $masjidId, id: $id) {
      _id
    }
  }
`;

export const UPDATE_BOARD_MEMBER = gql`
  mutation UpdateBoardMember(
    $masjidId: String!
    $id: String!
    $input: BoardMemberInput!
  ) {
    updateBoardMember(masjidId: $masjidId, id: $id, input: $input) {
      _id
    }
  }
`;

export const CHECK_IN_PROGRAM_TICKET = gql`
  mutation CheckIn($bookingId: String!, $noOfPersons: Int!) {
    checkInProgram(bookingId: $bookingId, noOfPersons: $noOfPersons)
  }
`;
