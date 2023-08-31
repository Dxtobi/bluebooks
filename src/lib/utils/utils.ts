import { v2 as cloudinary } from 'cloudinary';

import type {  UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { CLOUDINARY_KEY_API, CLOUDINARY_KEY_SECR } from '$env/static/private';
import toStream from 'buffer-to-stream';


cloudinary.config({
  cloud_name: 'jaofiles',
  api_key: CLOUDINARY_KEY_API, // Store in .env.local
  api_secret: CLOUDINARY_KEY_SECR, // Store in .env.local
  secure: true
});

export const serializeNonPOJOs = (/** @type {any} */ obj: unknown) => {
    const f = JSON.stringify(obj);
    
    return JSON.parse(f)
     // return structuredClone(obj)
  }
  
  
  
  export function searchArray(array: string[], searchString: string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === searchString) {
        return true;
      }
    }
    return false;
}
  


/**
 * 
 * Uploads an image to Cloudinary from a File object.
 * 
 * 
 * 
 * @returns {} A Promise resolving to the Cloudinary API response or an error.
 */

export async function uploadImageToCloudinary(foodImage: { arrayBuffer: () => WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer> | PromiseLike<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>; }):Promise<UploadApiErrorResponse | UploadApiResponse> {
  const buffer = Buffer.from(await foodImage.arrayBuffer());
 // const result = await uploadImageToCloudinary(buffer);
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      // @ts-ignore
      resolve(result);
    });

    const readableStream = toStream(buffer);
    console.log(readableStream)
    readableStream.pipe(upload);
  });
}

export const cloudinaryDecorator = function (target: { addImage: (foodImage: { arrayBuffer: () => WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer> | PromiseLike<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>; }) => Promise<UploadApiErrorResponse | UploadApiResponse>; }) {
  target.addImage = uploadImageToCloudinary
}