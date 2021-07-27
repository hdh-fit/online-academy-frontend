import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';

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

export default function CourseContent() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			className={classes.root}
		>
			<ListItem button>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary="Course Introdution" />
			</ListItem>
			<Divider style={{ backgroundColor: 'gray' }} />
			<ListItem button>
				<ListItemIcon>
					<DraftsIcon />
				</ListItemIcon>
				<ListItemText primary="Install and Setup" />
			</ListItem>
			<Divider style={{ backgroundColor: 'gray' }} />

			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Input and Output in Python" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Module and Functions in Python" />
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}
