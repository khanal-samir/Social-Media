export const getPublicUrl = (url) => {
  const urlArr = url.split("/");

  const fileNameWithExt = urlArr[urlArr.length - 1]; // last element
  const [publicId] = fileNameWithExt.split("."); // take first element
  return publicId;
};
