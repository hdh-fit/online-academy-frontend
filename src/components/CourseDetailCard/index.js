import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
//import image from '../Courses/contemplative-reptile.jpeg';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles({
	root: {
		marginBottom: 12
	},
	media: {
		height: 300,
	},
});

export default function CourseDetailCard({ videoSrc, onBuyCourse, isMyCourse, onAddWatchList, isInWatchList, isMyUploadCourse, idCourse }) {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Card style={{marginLeft:-8}} elevation={0} className={classes.root}>
			<CardActionArea>
				{/*<CardMedia
					className={classes.media}
					image={image}
					title="Contemplative Reptile"
				/>*/}

			</CardActionArea>
			<CardActions >
				{!isMyUploadCourse
					? (
						<React.Fragment>
							<Button
								variant={'contained'}
								size="medium"
								style={{ fontWeight: 'bold', width: 150 }}
								onClick={onAddWatchList}
								color={isInWatchList ? 'primary' : 'secondary'}
							>
								{!isInWatchList ? '(+) Watch List' : '(-) Watch List'}
							</Button>
							<Button
								size="medium"
								variant={'contained'}
								style={{ width: 150, fontWeight: 'bold' }}
								color={isMyCourse ? 'primary' : 'secondary'}
								onClick={isMyCourse ? null : onBuyCourse}
							>
								{isMyCourse ? 'Enrolled' : 'Enroll'}
							</Button>
						</React.Fragment>
					)
					: (
						<Button
							variant={'contained'}
							size="medium"
							style={{ fontWeight: 'bold', width: 150 }}
							onClick={() => history.push(`/add-course?courseEdit=${idCourse}`)}
							color={'primary'}
						>
							{'Edit course'}
						</Button>
					)
				}

			</CardActions>
		</Card >
	);
}
