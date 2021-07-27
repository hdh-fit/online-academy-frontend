import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../Courses/contemplative-reptile.jpeg';

const useStyles = makeStyles({
	root: {
		marginLeft: 10,
		maxHeight: 552,
		width:360
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
				<CardMedia
					className={classes.media}
					image={image}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography style={{ fontWeight: 'bold' }} gutterBottom variant="h4" component="h2">
						$13.99
					</Typography>
					<span style={{ fontWeight: 'bold' }}>
						This course includes:
					</span>
					<ul>
						<li>
							62.5 hours on-demand video
						</li>
						<li>
							14 articles
						</li>
						<li>
							16 downloadable resources
						</li>
					</ul>
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
