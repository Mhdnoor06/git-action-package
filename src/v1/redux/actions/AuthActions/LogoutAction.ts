export const authLogout = () => async () => {
  try {
    sessionStorage.removeItem("failedLogin");
    localStorage.removeItem("authTokens");
    localStorage.removeItem("admin");
    window.location.reload();
  } catch (error: any) {
    console.log(error);
  }
};
