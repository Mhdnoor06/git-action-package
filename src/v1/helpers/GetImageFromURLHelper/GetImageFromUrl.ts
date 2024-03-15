const getJpegFromUrl = async (url, setSelectedImage) => {
  const fetchUrl = url;
  const fileName = "myFile.jpeg";
  fetch(fetchUrl).then(async (response) => {
    const contentType = response.headers.get("content-type") ?? "";
    const blob = await response.blob();
    const file = new File(
      [blob],
      fileName,
      {
        type:contentType,
      },
      // { contentType }
    );
    setSelectedImage(file);
    // setOpen(!Open);
  });
};

export default getJpegFromUrl;
