const domainArray = [
  "portal.connectmazjid.com",
  "main-admin-portal.connectmazjid.com",
];
const getEnvStripePublishableKey = (prodKey: string, defaultKey: string) => {
  const hostname = window.location.hostname;
  if (domainArray.includes(hostname)) {
    return prodKey;
  }
  return defaultKey;
};

export const getStripePublishableKey = () => {
  const prodKEY = import.meta.env.STRIPE_PUBLISHABLE_KEY;
  return getEnvStripePublishableKey(
    prodKEY,
    "pk_test_51Pfqtz2Kun23kgVEIT0sYuHsaXJzZGH7JlGcOl3BB0OM3qRj84MIh4Ohw17oXwu3KT2gzkhklC0NsACm4PbgDPuW00rFiOr34h"
  );
};
