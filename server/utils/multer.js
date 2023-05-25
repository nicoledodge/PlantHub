const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

async function getImageString(path) {
    try {
      const data = await sharp(path)
        .resize({ width: 500, height: 500 })
        .toBuffer();
      await sharp(data).toFile(path);
      const imageString = data.toString("base64");
      return imageString;
    } catch (err) {
      console.error(err);
    }
  }

// Set up the file upload destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Change the 'uploads' directory as needed
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      const fileName = `currentupload${extension}`;
      cb(null, fileName);
      cb(null, fileName);
    },
  });
  
  // Filter function to validate file type
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  };

module.exports = {storage,fileFilter,getImageString}