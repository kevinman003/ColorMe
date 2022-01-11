import { Container, Grid } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import '../styles/PictureView.css';
import ImageContainer from './ImageContainer';
import SelectedImage from './SelectedImage';
const PictureView = props => {
	const { imgs, height, width } = props;
	const [updatingImgs, setUpdatingImgs] = useState(false);
	const [drawImgs, setDrawImgs] = useState([]);
	const [scrollableImgWidth, setScrollableImgWidth] = useState(0);
	const [scrollableImgHeight, setScrollableImgHeight] = useState(0);
	const [selectedImgWidth, setSelectedImgWidth] = useState(0);
	const [selectedImgHeight, setSelectedImgHeight] = useState(0);
	const [selectedImg, setSelectedImg] = useState(null);
	const [imgsContainerHeight, setImgsContainerHeight] = useState(0);

	const imgWidthDiff = 20;
	const imgContainerPadding = 20;
	const imgsContainer = useRef(null);
	const selectedImgContainer = useRef(null);

	const styles = {};

	// When setScrollableImgHeight is determined
	useEffect(() => {
		setSelectedImgDimensions();
	}, [setScrollableImgHeight]);

	// When image changes
	useEffect(() => {
		addImages();
		setScrollableImg();
	}, [imgs, width, height]);

	const addImages = () => {
		imgs.forEach(img => {
			addImage(img);
		});
		setSelectedImg(imgs[Math.floor(imgs.length / 2)]);
	};

	const setScrollableImg = () => {
		let currImgWidth = imgsContainer.current
			? imgsContainer.current.offsetWidth -
			  imgWidthDiff -
			  imgContainerPadding * 2
			: 0;
		let currImgHeight =
			width === 0 ? 0 : computeHeight(height, width, currImgWidth);
		// MAYBE IN USE TODO Remove if nto
		// Height of 3 images + 4 padding containers
		let imgsContainerHeight = currImgHeight * 3 + imgContainerPadding * 4;
		setScrollableImgWidth(currImgWidth);
		setScrollableImgHeight(currImgHeight);
	};

	const setSelectedImgDimensions = () => {
		let currSelectedImgWidth =
			selectedImgContainer.current.offsetWidth - imgContainerPadding * 2;
		let computedSelectedImgHeight = computeHeight(
			height,
			width,
			currSelectedImgWidth
		);
		let currSelectedImgHeight =
			computedSelectedImgHeight > 700 ? computedSelectedImgHeight : 700;
		setSelectedImgWidth(currSelectedImgWidth);
		setSelectedImgHeight(currSelectedImgHeight);
		setImgsContainerHeight(currSelectedImgHeight);
	};

	const computeHeight = (height, width, currWidth) => {
		return (height / width) * currWidth;
	};

	const addImage = img => {
		const newImage = new Image();
		newImage.src = img;
		newImage.onload = () => {
			setDrawImgs([...drawImgs, newImage]);
		};
	};

	return (
		<Container>
			<Grid container>
				<Grid item xs={12} md={8}>
					<div ref={selectedImgContainer}>
						<SelectedImage
							selectedImg={selectedImg}
							height={selectedImgHeight}
							width={selectedImgWidth}
							padding={imgContainerPadding}
						></SelectedImage>
					</div>
				</Grid>
				<Grid item xs={12} md={4}>
					<div ref={imgsContainer} className='imgs-container'>
						{imgs.map((img, index) => {
							return (
								<ImageContainer
									img={img}
									width={scrollableImgWidth}
									height={scrollableImgHeight}
									index={index}
									imgContainerPadding={imgContainerPadding}
								></ImageContainer>
							);
						})}
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default PictureView;
