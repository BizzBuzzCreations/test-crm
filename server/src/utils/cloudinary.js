import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return "Could not upload file";
        // Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        // File has been uploaded successfully
        console.log("File uploaded successfully: ", response.url);

        // Remove temp file after successful upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // console.error(error);
        fs.unlinkSync(localFilePath); // Cleanup on failure: remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// Delete file from Cloudinary
const deleteFromCloudinary = async (fileUrl) => {
    try {
        const publicId = fileUrl.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        return false;
    }
};


export { uploadOnCloudinary, deleteFromCloudinary }