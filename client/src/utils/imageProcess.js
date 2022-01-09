const processImage = image => {
	const worker = new Worker('../canny-edge-detector/worker.js');
	console.log(typeof image);
	worker.postMessage({
		cmd: 'appData',
		data: {
			width: image.width,
			height: image.height,
			ut: 0,
			lt: 0,
		},
	});
	let fdas = worker.postMessage({
		cmd: 'imgData',
		data: image,
	});
	console.log(fdas);
	// console.log(image);
	// const originalImage = new MarvinImage();
	// const outputImage = new MarvinImage();
	// originalImage.load(image, detectEdge(originalImage, outputImage));
};

export { processImage };
