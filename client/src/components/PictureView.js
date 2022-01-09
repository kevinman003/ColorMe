import { Container, Grid } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import '../styles/PictureView.css';

const PictureView = props => {
	const { imgs, height, width } = props;
	const [updatingImgs, setUpdatingImgs] = useState(false);
	const [drawImgs, setDrawImgs] = useState([]);
	const [imgWidth, setImgWidth] = useState(0);
	const [imgHeight, setImgHeight] = useState(0);

	const imgsContainer = useRef(null);
	// const addImage = (imgData, width, height, index) => {
	// 	// const image = new ImageData(imgData, width, height);
	// 	const canvas = document.querySelectorAll('.canvas')[index];
	// 	console.log('canvas', canvas);
	// 	const ctx = canvas.getContext('2d');
	// 	ctx.canvas.width = width;
	// 	ctx.canvas.height = height;
	// 	const image = new Image();
	// 	image.src = imgData;

	// 	image.onload = () => {
	// 		console.log('drawing');
	// 		// ctx.filter = 'invert(1)';
	// 		ctx.drawImage(image, 0, 0, 300, 300);
	// 	};
	// };

	const addImage = img => {
		const newImage = new Image();
		newImage.src = img;
		newImage.onload = () => {
			setDrawImgs([...drawImgs, newImage]);
		};
	};
	useEffect(() => {
		// if (imgs.length) addImage(imgs[0], width, height, 0);
		imgs.forEach(img => {
			addImage(img);
		});
		setImgWidth(imgsContainer.current.width);
		setImgHeight((height / width) * imgsContainer.current.width);
		console.log('fsda', imgsContainer.current.innerWidth);
		console.log(
			'imgsContainer',
			imgsContainer.current.width
				? imgsContainer.current.width
				: 'no imgContainer'
		);
	}, [imgs]);

	return (
		// <div>
		// 	{imgs.map(img => (
		// 		<canvas className='canvas'> </canvas>
		// 	))}
		// </div>
		<Container>
			<Grid container>
				<Grid item xs={12} md={9}>
					CANVAS
					{imgs.length > 0 && <canvas className='canvas'> </canvas>}
				</Grid>
				<Grid item xs={12} md={3}>
					<div ref={imgsContainer} className='imgs-container'>
						{imgs.map(img => {
							return (
								<img src={img} width={imgWidth} height={imgHeight} alt='' />
							);
						})}
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default PictureView;
