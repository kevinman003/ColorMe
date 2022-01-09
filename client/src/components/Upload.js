import { Button, Container, Grid, Typography, Paper, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoint } from '../services/BackendService';

const Upload = props => {
	const { setImgs } = props;
	const [fileNames, setFileNames] = useState('');
	const addImage = () => {};

	const handleUploadImage = e => {
		let names = [];
		sendImages(e.target.files);
		[...e.target.files].forEach(file => {
			names.push(file.name);
		});
		setFileNames(names.join(', '));
	};
	const sendImages = imgs => {
		const data = new FormData();
		// TODO support multiple upload
		data.append('file', imgs[0]);
		axios.post(`${endpoint}/upload`, data).then(res => {
			setImgs(res);
			res.data.imgData.forEach((img, index) => {
				addImage(img, res.data.width, res.data.height, index);
			});
		});
	};
	return (
		<Container sx={{ p: 5 }} direction='row' justify='center' align='center'>
			<Grid container spacing={5}>
				<Grid item xs={12} md={2}>
					<input
						accept='image/*'
						style={{ display: 'none' }}
						id='raised-button-file'
						type='file'
						onChange={handleUploadImage}
					/>
					<label htmlFor='raised-button-file'>
						<Button variant='contained' component='span' sx={{ width: '100%' }}>
							Upload
						</Button>
					</label>
				</Grid>
				<Grid item xs={12} md={10}>
					<Paper elevation={3}>
						<Typography sx={{ height: '20px', p: 1 }}>{fileNames}</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Upload;
