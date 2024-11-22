const domainArray = [
  "portal.connectmazjid.com",
  "main-admin-portal.connectmazjid.com",
];
const getAPIRootDomain = (prodAPI: string, defaultAPI: string) => {
  const hostname = window.location.hostname;
  if (domainArray.includes(hostname)) {
    return prodAPI;
  }
  return defaultAPI;
};

export const getGraphQlAPIRootDomain = () => {
  const prodAPI = import.meta.env.VITE_GRAPHQL_BASE_URL;
  return getAPIRootDomain(
    prodAPI,
    "https://graphql.staging.connectmazjid.com/graphql"
  );
};

export const getRestAPIRootDomain = () => {
  const prodAPI = import.meta.env.VITE_REST_BASE_URL;
  return getAPIRootDomain(prodAPI, "https://rest.staging.connectmazjid.com/v1");
};
export const getFileUploadAPIRootDomain = () => {
  const prodAPI = import.meta.env.VITE_REST_BASE_URL + "/image/upload";
  return getAPIRootDomain(
    prodAPI,
    "https://rest.staging.connectmazjid.com/v1/image/upload"
  );
};

const getKey = (prodAPI: string, defaultAPI: string) => {
  const hostname = window.location.hostname;

  if (domainArray.includes(hostname)) {
    return prodAPI;
  }
  return defaultAPI;
};

export const getHcaptchaKey = () => {
  const prodAPI = import.meta.env.VITE_HCAPCHA_URL;
  return getKey(prodAPI, "2bb89b90-4bb4-40a0-8ae6-5d82143c90b0");
};
