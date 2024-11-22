import { AuthTokens } from "../../redux/Types";
import { getFileUploadAPIRootDomain } from "../ApiSetter/GraphQlApiSetter";

export const uploadImage = async (file: File) => {
  const type = typeof file;
  if (!file) return "";
  else if (file && type === "string") return file;
  else if (file && type !== "string" && file.type.startsWith("image/")) {
    const authTokensString = localStorage.getItem("authTokens");
    const token: AuthTokens | null = authTokensString
      ? JSON.parse(authTokensString)
      : null;
    const url = getFileUploadAPIRootDomain();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
       // console.log("Image uploaded successfully:", data);
        return data;
      } else {
        console.error("Image upload failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  } else return "";
};
