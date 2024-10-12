import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";


export const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};
  

export const deleteFilesFromCloudinary = (public_ids) => {
    console.log('Deleting files from cloudinary');
}

export const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map(file =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          getBase64(file), // Assuming getBase64 converts the file to base64 string
          {
            resource_type: 'auto',
            public_id: uuid(), // Generate a unique public_id
          },
          (error, result) => {
            if (error) return reject(error);
            
            console.log(result.public_id); // Log the public_id from the result
            resolve(result);
          }
        );
      })
    );
  
    try {
      const results = await Promise.all(uploadPromises);
  
      return results.map(result => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
    } catch (err) {
      console.error('Error uploading files to Cloudinary:', err); // Proper error logging
      throw new Error('Failed to upload files to Cloudinary');
    }
  };