import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Star, StarOutlineOutlined } from '@material-ui/icons';

export default function ReviewDialog({ onClose, open, onSubmit }) {
	const handleClose = () => {
		onClose();
	};
	const FillStar = (size = 50) => <Star style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;
	const OutlinedStart = (size = 50) => <StarOutlineOutlined style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;

	const onSubmitReview = () => {
		onSubmit({ rate, comment });
	};
	const [rate, setRate] = React.useState(1);
	const [comment, setComment] = React.useState('');

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add review</DialogTitle>
				<DialogContentText style={{ width: 500, paddingLeft: 15, display: 'flex' }}>
					{[1, 2, 3, 4, 5].map(item => (
						<div
							key={item}
							style={{ cursor: 'pointer' }}
							onClick={() => setRate(item)}
						>
							{rate >= item ? FillStar() : OutlinedStart()}
						</div>
					))}
				</DialogContentText>

				<DialogContent>
					<TextField
						multiline
						autoFocus
						margin="dense"
						label="Your comment"
						fullWidth
						onChange={(e) => setComment(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={onSubmitReview} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
