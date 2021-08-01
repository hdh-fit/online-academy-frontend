import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ isOpen, onClose }) {
	return (
		<div>
			<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Đăng nhập</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						id="name"
						label="Email"
						type="email"
						fullWidth
					/>
					<TextField
						style={{ marginTop: 20}}
						id="passworl"
						label="Password"
						type="password"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Cancel
					</Button>
					<Button onClick={onClose} color="primary">
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
