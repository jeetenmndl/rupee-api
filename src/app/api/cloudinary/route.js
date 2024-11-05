import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req, res) {
    try {
      const request = await req.json();
      const { file } = request;

      // Upload with transformations
      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: 'rupeeUserID',
        quality: 'auto:eco',
        format: 'jpg',
        crop: 'scale',   
      });

        return NextResponse.json({
            success: true,
            url: uploadResponse.secure_url
        }, {
            status: 200
        })

    } catch (error) {
      console.error('Cloudinary upload error:', error);
        return NextResponse.json({
            success: false,
            message: "failed to upload image"
        }, {
            status: 500
        })
    }
}
