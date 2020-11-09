# ImageMod

ImageMod is a lightweight package to compress and convert the image to jpeg/png format

## Features

-   support for image
-   support for conversion of image to jpeg/png format
-   support for image compression

## Installation

```bash
npm install image-mod --save
```

## Usage

use `image-mod` after the image is being uploaded from any file upload middlewares like `multer` or `express-fileupload`. `image-mod` replaces the uploaded image with modified image and returns its absolute path

### Example

```javascript
const ImageMod = require('image-mod');
//...
const options = {
    file: req.file, //required
    imageType: 'jpeg', //optional
    imageQuality: 50, //optional
};
//...
ImageMod(options).then((filePath) => {
    //filePath is the absolute path of the modified image
});
```

#### working example using express and multer

```javascript
const express = require('express');
const multer = require('multer');
const ImageMod = require('image-mod');
const path = require('path');
const app = express();

const upload = multer({ dest: path.join(__dirname, '/uploads') });

app.post('/upload', upload.single('picture'), async (req, res) => {
    const options = {
        file: req.file,
        imageType: 'png',
        imageQuality: 50,
    };
    const filePath = await ImageMod(options);
    return res.status(200).json({ success: true, filePath });
});

const PORT = 5000;
app.listen(5000, () => {
    console.log('server is running on port ' + PORT);
});
```

### Option

| key          | type   | requirement | default | values          |
| ------------ | ------ | ----------- | ------- | --------------- |
| file         | File   | required    | `null`  |                 |
| imageType    | String | optional    | `jpeg`  | `jpeg` or `png` |
| imageQuality | Number | optional    | `50`    | `1-100`         |

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
