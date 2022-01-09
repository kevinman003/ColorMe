const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const cannyEdgeDetector = require('canny-edge-detector');
const { Image } = require('image-js');
const { v4: uuidv4 } = require('uuid');

const upload = multer();
const app = express();
app.use(cors());
const PORT = 5000;

// fs.readFile('./pic.png', 'utf8', (err, data) => {
// 	if (err) {
// 		console.log(error);
// 	}
// 	console.log('data', data);
// });

// execute().catch(console.error);

// async function execute() {
// 	let image = await Image.load('pic.png');
// 	let grey = image
// 		.grey() // convert the image to greyscale.
// 		.resize({ width: 200 }) // resize the image, forcing a width of 200 pixels. The height is computed automatically to preserve the aspect ratio.
// 		.rotate(30); // rotate the image clockwise by 30 degrees.
// 	return grey.save('pic.png');
// }

app.post('/upload', upload.single('file'), (req, res) => {
	let edge;
	fs.readFile(req.file.path, (err, data) => {
		if (err) throw err;
		let imgs = [];
		Image.load(data).then(img => {
			const grey = img.grey();
			for (let i = 1; i <= 10; i++) {
				const options = { lowThreshold: i * 10, highThreshold: i * 10 };
				edge = cannyEdgeDetector(grey, options);
				// console.log('edge', edge);
				edge = edge.invert();
				const picPath = uuidv4() + req.file.detectedFileExtension;
				edge.save(picPath).then(() => {
					fs.readFile(picPath, (err, data) => {
						if (err) throw err;
						let base64Img = data.toString('base64');
						let imgData = `data:image/png;base64,${base64Img}`;
						fs.rmSync(picPath);
						imgs.push(imgData);
						if (imgs.length === 10) {
							res.json({
								imgData: imgs,
								width: edge.width,
								height: edge.height,
							});
						}
					});
				});
			}
		});
	});
});
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
