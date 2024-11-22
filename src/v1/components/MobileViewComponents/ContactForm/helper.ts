// Generate thumbnail from video file
export const generateVideoThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const url = URL.createObjectURL(file);
    video.src = url;

    video.addEventListener("loadeddata", () => {
      // Capture a frame from the video at the 1-second mark
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL("image/png");
      resolve(thumbnail);
    });

    video.addEventListener("error", () => {
      resolve("path/to/your/default/image.png"); // Use a default image if thumbnail generation fails
    });
  });
};
