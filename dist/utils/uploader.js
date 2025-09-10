"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleFilesDiffField = exports.multipleFilesSameField = exports.singleFile = exports.memoryUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const defaultDir = (0, path_1.join)(__dirname, "../../public");
const memoryUploader = () => {
    const storage = multer_1.default.memoryStorage();
    return (0, multer_1.default)({ storage });
};
exports.memoryUploader = memoryUploader;
const uploader = (filePrefix, folderName) => {
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            const destination = folderName
                ? (0, path_1.join)(defaultDir, folderName)
                : defaultDir;
            if (!fs_1.default.existsSync(destination)) {
                fs_1.default.mkdirSync(destination);
            }
            cb(null, destination);
        },
        filename: (_req, file, cb) => {
            // test.png -> PP980982348432.png
            // aryo.png -> PP980982342346.png
            // pwd.png -> PP980982348d45.png
            // jcwd.png -> PP980982348445.png
            const originalNameParts = file.originalname.split("."); // ['test', 'png']
            const fileExtension = originalNameParts[originalNameParts.length - 1];
            const newFilename = filePrefix + Date.now() + "." + fileExtension;
            cb(null, newFilename);
        },
    });
    return (0, multer_1.default)({ storage });
};
const singleFile = (filePrefix, folderName) => {
    return [
        uploader(filePrefix, folderName).single("file"),
        (req, _res, next) => {
            const { file } = req;
            if (file) {
                file.path = folderName + "/" + ((file === null || file === void 0 ? void 0 : file.filename) + "");
            }
            next();
        },
    ];
};
exports.singleFile = singleFile;
const multipleFilesSameField = (filePrefix, folderName, maxCount) => {
    return [
        uploader(filePrefix, folderName).array("files", maxCount),
        (req, _res, next) => {
            const { files } = req;
            if ((files === null || files === void 0 ? void 0 : files.length) && Array.isArray(files)) {
                const formattedFiles = files.map((file) => {
                    return Object.assign(Object.assign({}, file), { path: folderName + "/" + ((file === null || file === void 0 ? void 0 : file.filename) + "") });
                });
                req.files = formattedFiles;
            }
            next();
        },
    ];
};
exports.multipleFilesSameField = multipleFilesSameField;
const multipleFilesDiffField = (fields, filePrefix, folderName) => {
    return [
        uploader(filePrefix, folderName).fields(fields),
        (req, _res, next) => {
            const files = req.files;
            const newFiles = {};
            if (files) {
                Object.entries(files).forEach(([key, values]) => {
                    const formattedValues = values.map((value) => {
                        return Object.assign(Object.assign({}, value), { path: folderName + "/" + ((value === null || value === void 0 ? void 0 : value.filename) + "") });
                    });
                    if (!newFiles[key]) {
                        newFiles[key] = formattedValues;
                    }
                });
                req.files = newFiles;
            }
            next();
        },
    ];
};
exports.multipleFilesDiffField = multipleFilesDiffField;
