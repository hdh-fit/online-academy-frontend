import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
//import image from '../Courses/contemplative-reptile.jpeg';

import ReactPlayer from 'react-player';



const useStyles = makeStyles({
	root: {
		marginLeft: 10,
		maxHeight: 380,
		width: 600
	},
	media: {
		height: 300,
	},
});

export default function CourseDetailCard() {
	const classes = useStyles();

	return (
		<Card elevation={5} className={classes.root}>
			<CardActionArea>
				{/*<CardMedia
					className={classes.media}
					image={image}
					title="Contemplative Reptile"
				/>*/}
				<CardContent>
					{/*<video width="500" height="240" controls>
						<source src="https://dl.dropboxusercontent.com/sh/96mp97f9hxgg8gr/AAAyeXaa-koDco2A13FF6lsBa/Pexels%20Videos%201824697.mp4?dl=0" type="video/mp4" />

					</video>*/}

					<ReactPlayer
						height='100'
						width='100%'
						controls='true'
						url='https://dl.dropboxusercontent.com/sh/96mp97f9hxgg8gr/AAAyeXaa-koDco2A13FF6lsBa/Pexels%20Videos%201824697.mp4?dl=0'
					/>
				</CardContent>
			</CardActionArea>
			<CardActions style={{ justifyContent: 'center' }}>
				<Button variant={'contained'} size="medium" style={{ backgroundColor: 'rgb(28,29,31)', color: 'white', fontWeight: 'bold', width: 140 }}>
					Add to card
				</Button>
				<Button size="medium" variant={'contained'} style={{ width: 140, fontWeight: 'bold' }} color="inherit">
					Buy now
				</Button>
			</CardActions>
		</Card>
	);
}
