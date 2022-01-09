import React, { useEffect, useState } from 'react';
import { endpoint } from './services/BackendService';
import axios from 'axios';
import { processImage } from './utils/imageProcess';
import Landing from './components/Landing';
import Upload from './components/Upload';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PictureView from './components/PictureView';

const theme = createTheme({
	typography: {
		fontFamily: 'Nunito',
	},
	palette: {
		primary: {
			light: '#b65edb',
			main: '#61008B',
			dark: '#34004a',
			contrastText: '#fff',
		},
	},
});
const App = () => {
	const [file, setFile] = useState(null);
	const [imgs, setImgs] = useState([]);
	const [imgHeight, setImgHeight] = useState(0);
	const [imgWidth, setImgWidth] = useState(0);

	const createImageDataArr = imgData => {
		let result = new Uint8ClampedArray(Object.keys(imgData).length);
		for (let i in imgData) {
			result[i] = imgData[i];
		}
		console.log();
		console.log('result', result);
		return result;
	};

	const addImage = (imgData, width, height, index) => {
		// const image = new ImageData(imgData, width, height);
		const canvas = document.querySelectorAll('.canvas')[index];
		const ctx = canvas.getContext('2d');
		ctx.canvas.width = width;
		ctx.canvas.height = height;
		const image = new Image();
		image.src = imgData;
		console.log('fdsa', image.src);
		image.onload = () => {
			console.log('drawing');
			ctx.filter = 'invert(1)';
			ctx.drawImage(image, 0, 0, 300, 300);
		};
	};

	// const sendVid = e => {
	// 	e.preventDefault();
	// 	const data = new FormData();
	// 	data.append('file', file);
	// 	console.log('fdsa', file);
	// 	axios.post(`${endpoint}/upload`, data).then(res => {
	// 		console.log(res.data);
	// 		setImgs(res.data.imgData);
	// 		res.data.imgData.forEach((img, index) => {
	// 			addImage(img, res.data.width, res.data.height, index);
	// 		});
	// 	});
	// };

	const handleSetImgs = res => {
		setImgs(res.data.imgData);
		setImgHeight(res.data.height);
		setImgWidth(res.data.width);
		res.data.imgData.forEach((img, index) => {
			// addImage(img, res.data.width, res.data.height, index);
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Landing></Landing>
				<Upload setImgs={handleSetImgs} />
				{/* {imgs.map(img => (
					<canvas className='canvas'> </canvas>
				))} */}
				{/* <form action='#'>
					<label htmlFor='title'>Title</label>
					<input
						type='file'
						id='file'
						name='file'
						onChange={e => {
							setFile(e.target.files[0]);
						}}
					/>
					<button onClick={sendVid}>Send</button>

				</form> */}
				<PictureView
					imgs={imgs}
					width={imgWidth}
					height={imgHeight}
				></PictureView>
			</div>
		</ThemeProvider>
	);
};

export default App;
