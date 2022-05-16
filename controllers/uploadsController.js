const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImageLocal = async (req, res, next) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded');
    }
    const proImage = req.files.image;

    if (!proImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Pls upload image')
    }

    if (proImage.size > 1024*1024) {
         throw new CustomError.BadRequestError('Pls upload image size smaller 1KB')
    }
    const imagePath = path.join(
        __dirname, 
        '../public/uploads/' + `${proImage.name}`
    );

    await proImage.mv(imagePath);
    return res.status(StatusCodes.OK).json({image: {src: `/uploads/${proImage.name}`}})
}

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'upload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadImage }