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
		image.onload = () => {
			console.log('drawing');
			ctx.filter = 'invert(1)';
			ctx.drawImage(image, 0, 0, 300, 300);
		};
	};

	const handleSetImgs = res => {
		setImgs(res.data.imgData);
		setImgHeight(res.data.height);
		setImgWidth(res.data.width);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Landing></Landing>
				<Upload setImgs={handleSetImgs} />
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
