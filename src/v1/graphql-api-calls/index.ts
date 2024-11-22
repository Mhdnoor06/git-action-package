import { gql } from "@apollo/client";

//Get Masjid Details
export const getMasjid = () => {
  const query = `query GetMasjids($q: String, $page: Int, $limit: Int) {
  searchMasjids(q: $q, page: $page, limit: $limit) {
    _id
    masjidName
    subscribers
    followers

  }
}`;

  return gql`
    ${query}
  `;
};

//Get Masjid Details
export const getMasjidById = () => {
  const query = `query GetMasjidById($id: String!) {
    getMasjidById(id: $id) {
      _id
      masjidName
      subscribers
      followers
      assignedUser{
        _id
        name
      }
      location {
        coordinates
      }
    }
  }
`;

  return gql`
    ${query}
  `;
};

// export const GET_MASJID_BY_ID = gql`
//   query GetMasjidById($id: String!) {
//     getMasjidById(id: $id) {
//       _id
//       masjidName
//       subscribers
//       followers
//     }
//   }
// `;

// Define your queries
// export const getProducts = (masjidId: any) => {
//   const query = `query {
//     payment {
//       getProducts(masjidId: "${masjidId}") {
//         id
//         name
//         description
//         active
//         price
//       }
//     }
//   }`;

//   return gql`
//     ${query}
//   `;
// };
export const GET_PRODUCTS = gql`
  query GetProducts($masjidId: String!, $type: String!) {
    getProducts(masjidId: $masjidId, type: $type) {
      id
      name
      description
      active
      prices
      images
      createdAt
    }
  }
`;

// export const GET_MASJIDS = gql`
//   query {
//     getMasjids {
//       _id
//       masjidName
//       subscribers
//       followers
//     }
//   }
// `;
// export const createProductAPI = (product: any) => {
//   const query = `mutation {
//     payment {
//       createProduct(
//         product: {
//           name: "${product.name}"
//           description: "${product.description}"
//           active: ${product.active}
//           price: ${product.price}
//         }
//       ) {
//         id
//         name
//         description
//         active
//         price
//       }
//     }
//   }`;

//   return gql`
//     ${query}
//   `;
// };
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      active
      prices
      images
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductInput!, $id: String!) {
    updateProduct(input: $input, id: $id) {
      name
      description
      active
      prices
    }
  }
`;
