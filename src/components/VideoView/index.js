import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoView({ open, onClose, video, lessonNumber }) {
	const classes = useStyles();

	const handleClose = () => {
		onClose();
	};

	return (
		<div>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							{`Lesson ${lessonNumber}:  ${video?.name}`}
						</Typography>
						<Button
							startIcon={<CloseIcon />}
							autoFocus color="inherit"
							onClick={handleClose}>
							{'Close'}
						</Button>
					</Toolbar>
				</AppBar>
				<ReactPlayer
					height='90%'
					width='100%'
					controls='true'
					url={video?.link}
				/>
			</Dialog>
		</div>
	);
}
