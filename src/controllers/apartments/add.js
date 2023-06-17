const cloudinary = require("cloudinary").v2;

const { Apartment } = require("../../models");
const { deleteTempFile } = require("../../helpers");

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY } = process.env;
// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_SECRET_KEY,
});
const add = async (req, res, next) => {
  try {
    const { coverImage, images } = req.files;

    const { _id: owner, name: user, phone, email, userRating } = req.user;

    const coverImageResp = await cloudinary.uploader.upload(
      coverImage[0].path,
      {
        transformation: [
          {
            width: 480,
            height: 480,
            gravity: "face",
            crop: "fill",
          },
        ],
      }
    );

    await deleteTempFile(coverImage[0].path);

    const imageUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        transformation: [
          {
            width: 480,
            height: 480,
            gravity: "face",
            crop: "fill",
          },
        ],
      });
      imageUrls.push(result.secure_url);

      deleteTempFile(image.path);
    }

    const result = await Apartment.create({
      ...req.body,
      images: imageUrls,
      coverImage: coverImageResp.secure_url,
      user: {
        user,
        phone,
        email,
        userRating,
      },
      owner,
    });

    res.status(201).json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
