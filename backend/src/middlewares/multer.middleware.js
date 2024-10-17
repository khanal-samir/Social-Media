import multer from "multer";

const storage = multer.diskStorage({
  //memory storage can also be used
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // saving in temp
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep the same name
  },
});

export const upload = multer({
  storage,
});
