export const getPublicUrl = (url) => {
  const urlArr = url.split("/");
  console.log("array", urlArr);
  const fileNameWithExt = urlArr[urlArr.length - 1]; // last element
  const [publicId] = fileNameWithExt.split("."); // take first element
  console.log(publicId);
  return publicId;
};
