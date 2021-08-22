import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import VideoCall from '@material-ui/icons/VideoCall';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Folder from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';
import { showErrorToast } from '../../core/utils';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		border: '1px solid rgb(210,215,219)',
		borderRadius: 4
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function CourseContent({ lessons, onOpenVideoPress, userType, isMyCourse }) {
	const classes = useStyles();
	const [indexOpen, setIndexOpen] = React.useState(undefined);

	const handleClick = (index) => {
		if (indexOpen === index) {
			setIndexOpen(undefined);
			return;
		}
		setIndexOpen(index);
	};

	const onClickVideo = (item, index) => {
		console.log(userType, isMyCourse);
		if (userType === 3 || isMyCourse || index < 2) {
			onOpenVideoPress(item, index);
		} else {
			showErrorToast('You need enroll course to view lesson.');
		}
	};

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			className={classes.root}
		>
			{lessons.length === 0
				? <h5 style={{ marginLeft: 19 }}>{'Lesson is not available'}</h5>
				: lessons.map((item, index) => (
					<React.Fragment>
						<ListItem button onClick={() => handleClick(index)}>
							<ListItemIcon>
								<Folder />
							</ListItemIcon>
							<ListItemText primary={item.name} />
							{indexOpen === index ? <ExpandLess /> : <ExpandMore />}
						</ListItem>

						<Collapse in={indexOpen === index} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<VideoCall />
									</ListItemIcon>
									<ListItemText onClick={() => onClickVideo(item, index)} primary="Open video" />
								</ListItem>
							</List>
						</Collapse>
						<Divider />
					</React.Fragment>
				))}
		</List>
	);
}
