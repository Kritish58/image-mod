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
