import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // file system from nodejs
import { getPublicUrl } from "./publicUrl.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export const uploadOnCloudinary = async (localFilePath, type) => {
  try {
    if (!localFilePath) return;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: type || "auto",
    });
    console.log("uploaded", response.url);
    fs.unlinkSync(localFilePath); // delete from server
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return;
  }
};

export const deleteFromCloudinary = async (fileUrl, type) => {
  try {
    if (!fileUrl) return;
    const publicId = getPublicUrl(fileUrl);
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: type || "auto",
    });
    console.log("Deleted", response);
    return response;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
