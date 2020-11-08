const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const compressAndSave = async (obj) => {
    try {
        let { file, imageType, imageQuality } = obj;
        if (!file) {
            throw new Error('file not recieved');
        }
        if (!file.originalname || !file.path) {
            throw new Error('invalid file type');
        }
        if (!imageType) {
            imageType = 'jpeg';
        }
        if (imageType && imageType != 'jpeg' && imageType != 'png') {
            throw new Error('imageType must be jpeg or png');
        }
        if (!imageQuality) {
            imageQuality = 50;
        }
        if (imageQuality && typeof imageQuality != 'number') {
            throw new Error('imageQuality must be a number');
        }
        if (
            !file.originalname.endsWith('.png') &&
            !file.originalname.endsWith('.jpeg') &&
            !file.originalname.endsWith('.jpg')
        ) {
            throw new Error('invalid file type received, expected png/jpeg file');
        }

        const isLinux = file.path.includes('/');
        const isWindows = file.path.includes('\\');
        let dirPath = '';

        if (isLinux) {
            dirPath = file.path.split('/');
            dirPath.splice(dirPath.length - 1, 1);
            dirPath = dirPath.join('/');
        }
        if (isWindows) {
            dirPath = file.path.split('\\');
            dirPath.splice(dirPath.length - 1, 1);
            dirPath = dirPath.join('\\');
        }
        if (!isLinux && !isWindows) {
            throw new Error('system os not identified');
        }

        let filePath = path.join(dirPath, uuid() + '_' + file.originalname);
        if (imageType === 'png') {
            await sharp(file.path).resize().jpeg({ quality: imageQuality }).toFile(filePath);
        } else {
            await sharp(file.path).resize().jpeg({ quality: imageQuality }).toFile(filePath);
        }
        fs.unlinkSync(file.path);
        return filePath;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = compressAndSave;
