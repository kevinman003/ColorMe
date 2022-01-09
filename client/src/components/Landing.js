import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import LandingBackground from '../img/landing.png';
import { Typography, Grid, Box } from '@mui/material';

const useStyles = makeStyles(theme => ({
	container: {
		backgroundImage: `url(${LandingBackground})`,
		height: '500px',
		backgroundPosition: '50% 70%',
		backgroundSize: 'cover',
		color: '#fff',
	},
	heading: {
		fontSize: '64px',
	},
	text: {
		fontFamily: 'Nunito',
	},
}));
const Landing = () => {
	const classes = useStyles();
	return (
		<div>
			<Box>
				<Grid sx={{ p: 10 }} className={classes.container}>
					<Grid item>
						<Typography variant='h1' className={classes.text}>
							Create coloring pages from pictures
						</Typography>
					</Grid>
					<Grid item sx={{ mt: 2 }}>
						<Typography className={classes.text}>
							Transform your own images into a coloring page that you can print,
							download, and share.
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default Landing;
