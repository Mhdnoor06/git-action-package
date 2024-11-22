const domainArray = [
  "portal.connectmazjid.com",
  "main-admin-portal.connectmazjid.com",
];
const getUrlRootDomain = (prodUrl: string, defaultURL: string) => {
  const hostname = window.location.hostname;
  if (domainArray.includes(hostname)) {
    return prodUrl;
  }
  return defaultURL;
};

export const getWidgetUrlRootDomain = () => {
  const prodUrl = import.meta.env.VITE_WIDGET_BASE_URL;
  return getUrlRootDomain(prodUrl, "https://widgets-connectmasjid.netlify.app");
};
