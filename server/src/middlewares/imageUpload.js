import multer from "multer";
import path from "path";
import { allowedFile, defaultUserImagePath, defaultEmployeeImagePath, fileSize } from "../secret.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let imgpath;
        console.log(req?.body.type);
        if (req?.body.type == 'user') imgpath = defaultUserImagePath;
        else imgpath = defaultEmployeeImagePath;
        cb(null, imgpath); 
    },   
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    },
});
// console.log(req.file.destination);

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);
    if (!allowedFile.includes(extname.substring(1))) {
        return cb(new Error("File type is not allowed!"), false);
    } 
    return cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: fileSize },
    fileFilter,
});

export { upload };
