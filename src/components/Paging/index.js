import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2),
		},
	},
}));

export default function BasicPagination({ page, onChange }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Pagination
				variant="outlined" shape="rounded"
				onChange={(event, page) => onChange(page)}
				count={10}
				color="primary" />
		</div>
	);
}
